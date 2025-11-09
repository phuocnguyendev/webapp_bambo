import Title from "@/components/ui/title";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalDelete from "../../../components/ModalDelete";
import { toast } from "react-toastify";
import { PaginationTable } from "@/components/PaginationTable";
import useQueryConfig from "../hooks/useQueryConfig";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteSupplier, useSupplierList } from "../hooks/useSupplier";
import getSupplierColumns from "../config/SupplierConfig";
import ModalCreateUpdate from "../components/ModalCreateUpdate";
import SearchForm from "../components/SearchForm";
const SupplierList = () => {
  const [modalOpen, setModalOpen] = useState<"create" | "delete" | null>(null);
  const [selectedItem, setSelectedItem] = useState<SupplierResponse | null>(
    null
  );
  const { queryParams, setQueryParams } = useQueryConfig();
  const queryClient = useQueryClient();
  const currentPage = queryParams.page ?? 1;
  const pageSize = queryParams.pageSize ?? 10;
  const { data, isLoading } = useSupplierList();
  const { mutateAsync: deleteMutation } = useDeleteSupplier();
  const handleEdit = (item: SupplierResponse) => {
    setSelectedItem(item);
    setModalOpen("create");
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setModalOpen("create");
  };

  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDelete = (item: SupplierResponse) => {
    setSelectedItem(item);
    setModalOpen("delete");
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem?.Id) return;
    setLoadingDelete(true);
    try {
      await deleteMutation(selectedItem.Id);
      queryClient.setQueryData(
        ["supplier-list", queryParams],
        (oldData?: PageModelResponse<SupplierResponse>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ListModel: oldData.ListModel.filter(
              (item) => item.Id !== selectedItem.Id
            ),
            Count: oldData.Count > 0 ? oldData.Count - 1 : 0,
          };
        }
      );
      setModalOpen(null);
      setSelectedItem(null);
      toast.success("Xóa nhà cung cấp thành công");
    } finally {
      setLoadingDelete(false);
    }
  };

  const columns = getSupplierColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <Title title="Quản lý nhà cung cấp" />
      </div>
      <SearchForm />
      <div className="my-3">
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
        pageModel={data!}
        isLoading={isLoading}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(p) => setQueryParams({ ...queryParams, page: p })}
        onPageSizeChange={(s) =>
          setQueryParams({ ...queryParams, pageSize: s, page: 1 })
        }
        tableHeaderClassName="bg-green-700 text-white rounded-t-lg"
      />

      <ModalCreateUpdate
        open={modalOpen === "create"}
        onOpenChange={(open) => {
          setModalOpen(open ? "create" : null);
          if (!open) setSelectedItem(null);
        }}
        data={selectedItem!}
      />

      <ModalDelete
        open={modalOpen === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setModalOpen(null);
            setSelectedItem(null);
          }
        }}
        onOk={handleConfirmDelete}
        loading={loadingDelete}
        title="Bạn có muốn xóa nhà cung cấp này?"
      />
    </div>
  );
};

export default SupplierList;
