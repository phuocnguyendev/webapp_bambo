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
import { formatToVND } from "@/utils/utils";

const getProductColumns = (
  currentPage: number,
  pageSize: number,
  handlers?: {
    onEdit?: (item: ProductListResponse) => void;
    onDelete?: (item: ProductListResponse) => void;
  }
): ColumnDefCustom<ProductListResponse>[] => {
  return [
    {
      id: "Stt",
      header: "STT",
      cell: ({ row }: { row: Row<ProductListResponse> }) => (
        <div>{(currentPage - 1) * pageSize + row.index + 1}</div>
      ),
      size: 50,
    },
    {
      id: "Name",
      header: "Tên sản phẩm",
      accessorKey: "Name",
      size: 220,
      enableSorting: false,
    },
    {
      id: "Code",
      header: "Mã sản phẩm",
      accessorKey: "Code",
      size: 130,
      enableSorting: false,
    },
    {
      id: "Material",
      header: "Chất liệu",
      accessorKey: "Material",
      size: 160,
      enableSorting: false,
    },
    {
      id: "BaseCost",
      header: "Giá gốc",
      accessorKey: "BaseCost",
      size: 160,
      enableSorting: false,
      cell: ({ row }: { row: Row<ProductListResponse> }) =>
        formatToVND(row.original.BaseCost),
    },
    {
      id: "CountryOfOrigin",
      header: "Xuất xứ",
      accessorKey: "CountryOfOrigin",
      size: 160,
      enableSorting: false,
    },
    {
      id: "Note",
      header: "Ghi chú",
      accessorKey: "Note",
      size: 160,
      enableSorting: false,
    },
    {
      id: "Status",
      header: "Trạng thái",
      cell: ({ row }: { row: Row<ProductListResponse> }) =>
        row.original.Status ? (
          <span className="text-green-600 font-medium">Đang hoạt động</span>
        ) : (
          <span className="text-red-600 font-medium">Ngừng hoạt động</span>
        ),
      size: 120,
    },
    {
      id: "Actions",
      header: "Hành động",
      cell: ({ row }: { row: Row<ProductListResponse> }) => {
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
                    onClick={handleDelete}
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

export default getProductColumns;
