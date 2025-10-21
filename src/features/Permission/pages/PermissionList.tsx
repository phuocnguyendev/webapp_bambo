import ErrorFallback from "@/components/ErrorFallback";
import Title from "@/components/ui/title";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalDelete from "../../../components/ModalDelete";
import getPermissionColumns from "../config/permissionColumns";
import ModalCreateUpdate from "../components/ModalCreateUpdate";
import { toast } from "react-toastify";
import { useDeletePermission, usePermissionList } from "../hooks/usePermission";
import { PaginationTable } from "@/components/PaginationTable";
import useQueryConfig from "../hooks/useQueryConfig";
import { useQueryClient } from "@tanstack/react-query";
const PermissionList = () => {
  const { data, isLoading, isError } = usePermissionList();
  const [modalOpen, setModalOpen] = useState<"create" | "delete" | null>(null);
  const [selectedItem, setSelectedItem] = useState<PermissionUpdate | null>(
    null
  );
  const { mutateAsync: deleteMutation } = useDeletePermission();
  const { queryParams, setQueryParams } = useQueryConfig();
  const queryClient = useQueryClient();
  const currentPage = queryParams.page ?? 1;
  const pageSize = queryParams.pageSize ?? 10;
  if (isError) return <ErrorFallback />;

  const handleEdit = (item: PermissionUpdate) => {
    setSelectedItem(item);
    setModalOpen("create");
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setModalOpen("create");
  };

  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDelete = (item: PermissionUpdate) => {
    setSelectedItem(item);
    setModalOpen("delete");
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem?.Id) return;
    setLoadingDelete(true);
    try {
      await deleteMutation(selectedItem.Id);
      queryClient.invalidateQueries({ queryKey: ["permission-list"] });
      setModalOpen(null);
      setSelectedItem(null);
      toast.success("Xóa nhóm quyền thành công");
    } finally {
      setLoadingDelete(false);
    }
  };

  const columns = getPermissionColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <Title title="Quản lý nhóm quyền" />
      </div>
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
        title="Bạn có muốn xóa nhóm quyền này?"
      />
    </div>
  );
};

export default PermissionList;
