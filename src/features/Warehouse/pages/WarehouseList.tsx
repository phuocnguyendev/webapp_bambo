import Title from "@/components/ui/title";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalDelete from "../../../components/ModalDelete";
import { toast } from "react-toastify";
import ModalBulkUpdateWarehouse from "../components/ModalBulkUpdateWarehouse";
import { PaginationTable } from "@/components/PaginationTable";

import useQueryConfig from "../hooks/useQueryConfig";
import { useQueryClient } from "@tanstack/react-query";
import ModalCreateUpdate from "../components/ModalCreateUpdate";
import SearchForm from "../components/SearchForm";
import getWarehouseColumns from "../config/warehouseColumns";
import { useDeleteWarehouse, useWarehouseList } from "../hooks/useWarehouse";
const WarehouseList = () => {
  const [modalOpen, setModalOpen] = useState<
    "create" | "delete" | "update" | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<WarehouseResponse | null>(
    null
  );
  const { queryParams, setQueryParams } = useQueryConfig();
  const queryClient = useQueryClient();
  const currentPage = queryParams.page ?? 1;
  const pageSize = queryParams.pageSize ?? 10;
  const { data, isLoading } = useWarehouseList();
  const { mutateAsync: deleteMutation } = useDeleteWarehouse();
  const handleEdit = (item: WarehouseResponse) => {
    setSelectedItem(item);
    setModalOpen("create");
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setModalOpen("create");
  };

  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDelete = (item: WarehouseResponse) => {
    setSelectedItem(item);
    setModalOpen("delete");
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem?.Id) return;
    setLoadingDelete(true);
    try {
      await deleteMutation(selectedItem.Id);
      queryClient.setQueryData(
        ["warehouse-list", queryParams],
        (oldData?: PageModelResponse<WarehouseResponse>) => {
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
      toast.success("Xóa kho hàng thành công");
    } finally {
      setLoadingDelete(false);
    }
  };

  const [tableInstance, setTableInstance] = useState<any>(null);
  const columns = getWarehouseColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <Title title="Quản lý kho hàng" />
      </div>
      <SearchForm />
      <div className="my-3 flex gap-2">
        <Button
          variant="default"
          onClick={handleCreate}
          icon={<CirclePlus size={16} />}
        >
          Thêm mới
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            const selectedRows =
              tableInstance?.getSelectedRowModel?.().rows || [];
            if (selectedRows.length === 0) {
              toast.info("Chọn ít nhất một kho hàng để cập nhật");
              return;
            }
            setSelectedItem(null);
            setModalOpen("update");
          }}
        >
          Cập nhật nhiều kho hàng
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
        onTableInstance={setTableInstance}
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
        title="Bạn có muốn xóa kho hàng này?"
      />
      <ModalBulkUpdateWarehouse
        open={modalOpen === "update"}
        onOpenChange={(open) => {
          setModalOpen(open ? "update" : null);
        }}
        selectedWarehouses={
          modalOpen === "update"
            ? (tableInstance?.getSelectedRowModel?.().rows || []).map(
                (row: any) => row.original
              )
            : []
        }
        onBulkUpdate={(items) => {
          toast.success(`Đã cập nhật ${items.length} kho hàng!`);
          setModalOpen(null);
        }}
      />
    </div>
  );
};
export default WarehouseList;
