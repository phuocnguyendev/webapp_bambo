import type { ColumnDefCustom } from "@/components/PaginationTable";
import type { Row } from "@tanstack/react-table";
import { Eye, Edit, Trash, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { TooltipSimple } from "@/components/ui/tooltip";

export function getAccountColumns(
  currentPage: number,
  pageSize: number,
  handlers?: {
    onEdit?: (item: AccountListResponse) => void;
    onDelete?: (item: AccountListResponse) => void;
  }
): ColumnDefCustom<AccountListResponse>[] {
  return [
    {
      id: "stt",
      header: "STT",
      cell: ({ row }: { row: Row<AccountListResponse> }) => (
        <div>{(currentPage - 1) * pageSize + row.index + 1}</div>
      ),
      size: 50,
    },
    {
      id: "name",
      header: "Tên",
      accessorKey: "Name",
      size: 220,
      enableSorting: false,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "Email",
      size: 260,
      enableSorting: false,
    },
    {
      id: "phone",
      header: "Điện thoại",
      accessorKey: "Phone",
      size: 160,
      enableSorting: false,
    },
    {
      id: "status",
      header: "Trạng thái",
      cell: ({ row }: { row: Row<AccountListResponse> }) =>
        row.original.Status ? (
          <span className="text-green-600 font-medium">Đang hoạt động</span>
        ) : (
          <span className="text-red-600 font-medium">Ngừng hoạt động</span>
        ),
      size: 120,
    },
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }: { row: Row<AccountListResponse> }) => {
        const item = row.original;

        const handleEdit = () =>
          handlers?.onEdit ? handlers.onEdit(item) : console.log("Edit", item);
        const handleDelete = () =>
          handlers?.onDelete
            ? handlers.onDelete(item)
            : console.log("Delete", item);

        return (
          <div className="flex items-center gap-2 relative">
            <TooltipSimple title="Cập nhật">
              <Button
                variant="outline"
                size="icon"
                onClick={handleEdit}
                className="h-9 w-9 p-0 rounded-md border border-input bg-background hover:bg-muted hover:text-foreground"
                icon={<Edit size={16} />}
              />
            </TooltipSimple>
            <div className="relative">
              <DropdownMenu>
                <TooltipSimple title="Tùy chọn">
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Tùy chọn"
                      className="h-9 w-9 p-0 rounded-md border border-input bg-background hover:bg-muted"
                      icon={<EllipsisVertical size={18} />}
                    />
                  </DropdownMenuTrigger>
                </TooltipSimple>

                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    <Trash size={14} />
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
}

export default getAccountColumns;
