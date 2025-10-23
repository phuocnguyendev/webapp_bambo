import type { ColumnDefCustom } from "@/components/PaginationTable";
import type { Row } from "@tanstack/react-table";
import { Edit, EllipsisVertical, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { TooltipSimple } from "@/components/ui/tooltip";

const getSupplierColumns = (handlers?: {
  onEdit?: (item: SupplierResponse) => void;
  onDelete?: (item: SupplierResponse) => void;
}): ColumnDefCustom<SupplierResponse>[] => {
  return [
    {
      id: "Stt",
      header: "STT",
      cell: ({ row }: { row: Row<SupplierResponse> }) => (
        <div>{row.index + 1}</div>
      ),
      size: 50,
    },
    {
      id: "Name",
      header: "Nhà cung cấp",
      accessorKey: "Name",
      size: 220,
      enableSorting: false,
      cell: ({ row }: { row: Row<SupplierResponse> }) => {
        const addressRaw = row.getValue("Name");
        const name = typeof addressRaw === "string" ? addressRaw : undefined;
        return <div className="block w-full truncate">{name ?? "-"}</div>;
      },
    },
    {
      id: "TaxCode",
      header: "Mã số thuế",
      accessorKey: "TaxCode",
      size: 260,
      enableSorting: false,
    },
    {
      id: "Phone",
      header: "Số điện thoại",
      accessorKey: "Phone",
      size: 260,
      enableSorting: false,
    },
    {
      id: "Email",
      header: "Email",
      accessorKey: "Email",
      size: 260,
      enableSorting: false,
    },
    {
      id: "Address",
      header: "Địa chỉ",
      accessorKey: "Address",
      size: 260,
      enableSorting: false,
      cell: ({ row }: { row: Row<SupplierResponse> }) => {
        const addressRaw = row.getValue("Address");
        const address = typeof addressRaw === "string" ? addressRaw : undefined;
        return <div className="block w-full truncate">{address ?? "-"}</div>;
      },
    },
    {
      id: "Rating",
      header: "Đánh giá",
      accessorKey: "Rating",
      size: 260,
      enableSorting: false,
      cell: ({ row }: { row: Row<SupplierResponse> }) => {
        const raw = row.getValue("Rating");
        const rating = typeof raw === "number" ? raw : Number(raw ?? 0);
        const maxStars = 5;
        const filled = Math.max(0, Math.min(maxStars, Math.round(rating)));

        return (
          <div className="flex items-center">
            {Array.from({ length: maxStars }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < filled
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-xs text-gray-500">
              {Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}
            </span>
          </div>
        );
      },
    },
    {
      id: "LeadTime",
      header: "Thời gian giao hàng",
      accessorKey: "LeadTime",
      size: 260,
      enableSorting: false,
      cell: ({ row }: { row: Row<SupplierResponse> }) => {
        const leadTime = row.getValue("LeadTime");
        return <div>{leadTime ? `${leadTime} ngày` : "-"}</div>;
      },
    },
    {
      id: "Actions",
      header: "Hành động",
      cell: ({ row }: { row: Row<SupplierResponse> }) => {
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

export default getSupplierColumns;
