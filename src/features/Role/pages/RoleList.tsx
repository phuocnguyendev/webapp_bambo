import ErrorFallback from "@/components/ErrorFallback";
import Title from "@/components/ui/title";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalDelete from "../../../components/ModalDelete";
import { useDeleteRole, useRoleList } from "../hooks/useRole";
import { DataTable } from "@/components/ui/data-table";
import getRoleColumns from "../config/roleConfig";
import ModalCreateUpdate from "../components/ModalCreateUpdate";
export default function RoleList() {
  const { data, isLoading, isError } = useRoleList();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState<"role" | "delete" | null>(null);
  const [selectedItem, setSelectedItem] = useState<RoleUpdate | null>(null);

  const { mutateAsync: deleteMutation } = useDeleteRole();

  if (isError) return <ErrorFallback />;

  const handleEdit = (item: RoleUpdate) => {
    setSelectedItem(item);
    setModalOpen("role");
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setModalOpen("role");
  };

  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDelete = (item: RoleUpdate) => {
    setSelectedItem(item);
    setModalOpen("delete");
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem?.Id) return;
    setLoadingDelete(true);
    try {
      await deleteMutation(selectedItem.Id);
      queryClient.setQueryData(
        ["permissionList"],
        (oldData?: ResponseApi<RoleUpdate>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
          };
        }
      );
      setModalOpen(null);
      setSelectedItem(null);
    } finally {
      setLoadingDelete(false);
    }
  };

  const columns = getRoleColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <Title title="Quản lý phân quyền" />
      </div>
      <div className="my-2">
        <Button
          variant="default"
          onClick={handleCreate}
          icon={<CirclePlus size={16} />}
        >
          Thêm mới
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={Array.isArray(data) ? data : []}
        isLoading={isLoading}
        tableHeaderClassName="bg-green-700 text-white rounded-t-lg"
      />

      <ModalCreateUpdate
        open={modalOpen === "role"}
        onOpenChange={(open) => {
          setModalOpen(open ? "role" : null);
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
        title="Bạn có muốn xóa phân quyền này?"
      />
    </div>
  );
}
