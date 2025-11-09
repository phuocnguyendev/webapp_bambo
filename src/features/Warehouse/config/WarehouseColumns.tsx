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

import { Checkbox } from "@/components/ui/checkbox";
const getWarehouseColumns = (handlers?: {
  onEdit?: (item: WarehouseResponse) => void;
  onDelete?: (item: WarehouseResponse) => void;
  onSelectRow?: (id: string, checked: boolean) => void;
}): ColumnDefCustom<WarehouseResponse>[] => {
  return [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={table?.getIsAllRowsSelected?.() ?? false}
          showMinus={table?.getIsSomeRowsSelected?.() ?? false}
          onCheckedChange={table?.getToggleAllRowsSelectedHandler?.()}
        />
      ),
      cell: ({ row }: { row: Row<WarehouseResponse> }) =>
        row ? (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={row.getToggleSelectedHandler()}
          />
        ) : (
          <Checkbox disabled />
        ),
      size: 40,
      enableSorting: false,
    },
    {
      id: "Stt",
      header: "STT",
      cell: ({ row }: { row: Row<WarehouseResponse> }) => (
        <div>{row.index + 1}</div>
      ),
      size: 50,
    },
    {
      id: "Name",
      header: "Kho hàng",
      accessorKey: "Name",
      size: 220,
      enableSorting: false,
      cell: ({ row }: { row: Row<WarehouseResponse> }) => {
        const nameRaw = row.getValue("Name");
        const name = typeof nameRaw === "string" ? nameRaw : undefined;
        return <div className="block w-full truncate">{name ?? "-"}</div>;
      },
    },
    {
      id: "Code",
      header: "Mã số thuế",
      accessorKey: "Code",
      size: 260,
      enableSorting: false,
    },
    {
      id: "Address",
      header: "Địa chỉ",
      accessorKey: "Address",
      size: 260,
      enableSorting: false,
      cell: ({ row }: { row: Row<WarehouseResponse> }) => {
        const addressRaw = row.getValue("Address");
        const address = typeof addressRaw === "string" ? addressRaw : undefined;
        return <div className="block w-full truncate">{address ?? "-"}</div>;
      },
    },
    {
      id: "Branch",
      header: "Chi nhánh",
      accessorKey: "Branch",
      size: 260,
      enableSorting: false,
      cell: ({ row }: { row: Row<WarehouseResponse> }) => {
        const branchRaw = row.getValue("Branch");
        const branch = typeof branchRaw === "string" ? branchRaw : undefined;
        return <div className="block w-full truncate">{branch ?? "-"}</div>;
      },
    },
    {
      id: "Actions",
      header: "Hành động",
      cell: ({ row }: { row: Row<WarehouseResponse> }) => {
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

export default getWarehouseColumns;
