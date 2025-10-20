import type { ColumnDefCustom } from "@/components/PaginationTable";
import type { Row } from "@tanstack/react-table";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { TooltipSimple } from "@/components/ui/tooltip";

const getRoleColumns = (handlers?: {
  onEdit?: (item: RoleUpdate) => void;
  onDelete?: (item: RoleUpdate) => void;
}): ColumnDefCustom<RoleUpdate>[] => {
  return [
    {
      id: "Stt",
      header: "STT",
      cell: ({ row }: { row: Row<RoleUpdate> }) => <div>{row.index + 1}</div>,
      size: 50,
    },
    {
      id: "Name",
      header: "Tên nhóm quyền",
      accessorKey: "Name",
      size: 220,
      enableSorting: false,
    },
    {
      id: "Code",
      header: "Mã nhóm quyền",
      accessorKey: "Code",
      size: 260,
      enableSorting: false,
    },

    {
      id: "Actions",
      header: "Hành động",
      cell: ({ row }: { row: Row<RoleUpdate> }) => {
        const item = row.original;

        const handleEdit = () => handlers?.onEdit?.(item);
        const handleDelete = () => handlers?.onDelete?.(item);
        return (
          <div className="flex items-center relative">
            <TooltipSimple title="Cập nhật">
              <Button
                variant="custom"
                size="icon"
                onClick={handleEdit}
                icon={<Edit size={16} />}
              />
            </TooltipSimple>
            <div className="relative">
              <DropdownMenu>
                <TooltipSimple title="Tùy chọn">
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="custom"
                      size="icon"
                      aria-label="Tùy chọn"
                      icon={<EllipsisVertical size={18} />}
                    />
                  </DropdownMenuTrigger>
                </TooltipSimple>

                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      handleDelete();
                    }}
                    className="text-red-600"
                  >
                    <Trash2 size={14} />
                    <span className="ml-2">Xóa</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      },
      size: 180,
    },
  ];
};

export default getRoleColumns;
