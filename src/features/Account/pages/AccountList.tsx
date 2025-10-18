import ErrorFallback from "@/components/ErrorFallback";
import { PaginationTable } from "@/components/PaginationTable";
import Title from "@/components/ui/title";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CreateUpdateAccountModal from "../components/ModalCreateUpdate";
import { CirclePlus } from "lucide-react";
import { getAccountColumns } from "../config/accountConfig";
import {
  useAccountList,
  useDeleteAccount,
  useGetDetailAccount,
} from "../hooks/useAccount";
import useQueryConfig from "../hooks/useQueryConfig";
import { Button } from "@/components/ui/button";
import ModalDelete from "../../../components/ModalDelete";
import SearchForm from "../components/SearchForm";

export default function AccountList() {
  const { data, isLoading, isError } = useAccountList();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState<"account" | "delete" | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: detailData } = useGetDetailAccount(selectedId ?? "");

  const { mutateAsync: deleteMutation } = useDeleteAccount();

  if (isError) return <ErrorFallback />;
  const pageModel = data ?? { ListModel: [], Count: 0 };

  const { queryParams, setQueryParams } = useQueryConfig();

  const currentPage = queryParams.page ?? 1;
  const pageSize = queryParams.pageSize ?? 10;

  const handleEdit = (item: AccountListResponse) => {
    setSelectedId(item.Id);
    setModalOpen("account");
  };

  const handleCreate = () => {
    setSelectedId(null);
    setModalOpen("account");
  };

  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDelete = (item: AccountListResponse) => {
    setSelectedId(item.Id);
    setModalOpen("delete");
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    setLoadingDelete(true);
    try {
      await deleteMutation(selectedId);
      queryClient.setQueryData(
        ["accountList", queryParams],
        (oldData?: PageModelResponse<AccountListResponse>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ListModel: oldData.ListModel.filter(
              (item) => item.Id !== selectedId
            ),
            Count: oldData.Count > 0 ? oldData.Count - 1 : 0,
          };
        }
      );
      setModalOpen(null);
      setSelectedId(null);
    } finally {
      setLoadingDelete(false);
    }
  };

  const columns = getAccountColumns(currentPage, pageSize, {
    onEdit: handleEdit,
    onDelete: handleDelete,
  });
  return (
    <div className="px-4">
      <div className="flex items-center justify-between pb-2">
        <Title title="Quản lý tài khoản" />
      </div>
      <SearchForm />
      <div className="mb-2">
        <Button
          variant="default"
          onClick={handleCreate}
          icon={<CirclePlus size={16} />}
        >
          Thêm mới
        </Button>
      </div>

      <PaginationTable
        columns={columns}
        pageModel={pageModel}
        isLoading={isLoading}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(p) => setQueryParams({ ...queryParams, page: p })}
        onPageSizeChange={(s) =>
          setQueryParams({ ...queryParams, pageSize: s, page: 1 })
        }
        tableHeaderClassName="bg-green-700 text-white rounded-t-lg"
      />

      <CreateUpdateAccountModal
        open={modalOpen === "account"}
        data={detailData}
        onOpenChange={(open) => {
          setModalOpen(open ? "account" : null);
          if (!open) setSelectedId(null);
        }}
      />
      <ModalDelete
        open={modalOpen === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setModalOpen(null);
            setSelectedId(null);
          }
        }}
        onOk={handleConfirmDelete}
        loading={loadingDelete}
        title="Bạn có chắc chắn muốn xóa tài khoản này?"
      />
    </div>
  );
}
