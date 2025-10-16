import ErrorFallback from "@/components/ErrorFallback";
import { PaginationTable } from "@/components/PaginationTable";
import Title from "@/components/ui/title";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CreateUpdateAccountModal from "../components/ModalCreateUpdate";
import { getAccountColumns } from "../config/accountConfig";
import {
  useAccountList,
  useDeleteAccount,
  useGetDetailAccount,
} from "../hooks/useAccount";
import useQueryConfig from "../hooks/useQueryConfig";

export default function AccountList() {
  const { data, isLoading, isError } = useAccountList();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: detailData } = useGetDetailAccount(selectedId ?? "");

  const deleteMutation = useDeleteAccount();

  if (isError) return <ErrorFallback />;
  const pageModel = data ?? { ListModel: [], Count: 0 };

  const { queryParams, setQueryParams } = useQueryConfig();

  const currentPage = queryParams.page ?? 1;
  const pageSize = queryParams.pageSize ?? 10;

  const handleEdit = (item: AccountListResponse) => {
    setSelectedId(item.Id);
    setModalOpen(true);
  };

  const handleDelete = async (item: any) => {
    if (!window.confirm("Bạn có chắc muốn xóa tài khoản này không?")) return;
    deleteMutation.mutate(item.Id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["accountList"] });
      },
    });
  };

  const columns = (getAccountColumns as any)(currentPage, pageSize, {
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <Title title="Quản lý tài khoản" />
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
        tableHeaderClassName="bg-green-700 text-white"
      />

      <CreateUpdateAccountModal
        open={modalOpen}
        defaultValues={detailData}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setSelectedId(null);
        }}
      />
    </div>
  );
}
