import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  NoDataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowLoading,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  type Cell,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  type TableState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React, { type JSX } from "react";
import { When } from "react-if";
import { Select } from "./ui/select";
import { isBoolean } from "lodash";
import { useTranslation } from "react-i18next";

const paginationSize = 7;

const sizeOptions = [10, 20, 50, 100].map((opt) => ({
  label: opt,
  value: opt,
}));

const SortingIcons = {
  asc: <ArrowUpNarrowWide size={16} />,
  desc: <ArrowDownWideNarrow size={16} />,
};

export type ColumnDefCustom<T> = ColumnDef<T> & {
  renderHeader?: () => JSX.Element;
};

// ✨ Props mới theo PageModel
interface PaginationTableProps<T> {
  columns: ColumnDefCustom<T>[];
  pageModel: PageModelResponse<T>;
  isLoading: boolean;

  currentPage?: number; // trang hiện tại (bắt đầu từ 1)
  pageSize?: number; // số bản ghi/trang

  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  onRowClick?: (row: Row<T>) => void;
  onCellClick?: (cell: Cell<T, unknown>) => void;

  tableState?: Partial<TableState> | undefined;
  onSortingChange?: (sorting: SortingState) => void;

  tableClassName?: string;
  tableHeaderClassName?: string;
  tableRowClassName?: (row: Row<T>) => string;
  id?: string;
}

const PaginationTable = <T,>({
  columns,
  pageModel,
  isLoading,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  onCellClick,
  tableState,
  onSortingChange,
  tableClassName,
  tableHeaderClassName,
  tableRowClassName,
  id = "paginationTable",
}: PaginationTableProps<T>) => {
  const data = pageModel?.ListModel || pageModel || [];
  const total = pageModel?.Count ?? 0;
  const totalPage = Math.max(1, Math.ceil(total / (pageSize || 1)));

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    rowCount: total,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: tableState,
  });
  return (
    <div className="flex flex-col space-y-4 w-full">
      <Table className={tableClassName} id={id}>
        <TableHeader
          className={cn(
            "bg-green-700 text-white rounded-t-lg",
            tableHeaderClassName
          )}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const size = header.column.getSize();
                const sortingIcon =
                  SortingIcons[
                    header.column.getIsSorted() as keyof typeof SortingIcons
                  ];

                const className = cn(
                  "flex items-center gap-1",
                  canSort && "cursor-pointer select-none",
                  { "text-wrap": size < 150 }
                );

                const sortIcon = canSort ? (
                  <ArrowDownUp
                    size={16}
                    className="invisible group-hover:visible"
                  />
                ) : null;

                const columnDef = header.column.columnDef as ColumnDefCustom<T>;

                return (
                  <TableHead
                    key={header.id}
                    style={{ width: size !== 150 ? size : "auto" }}
                    className="group"
                  >
                    {header.isPlaceholder ? null : columnDef?.renderHeader ? (
                      columnDef.renderHeader()
                    ) : (
                      <div
                        className={className}
                        onClick={() => {
                          if (canSort) {
                            const currentSorting = header.column.getIsSorted();
                            const isDesc =
                              (isBoolean(currentSorting) &&
                                currentSorting === false) ||
                              currentSorting === "asc"
                                ? true
                                : false;
                            onSortingChange?.([
                              { id: header.column.id, desc: isDesc },
                            ]);
                          }
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="inline-flex">
                          {canSort && (sortingIcon ?? sortIcon)}
                        </span>
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          <When condition={isLoading}>
            <TableRowLoading colSpan={columns.length} />
          </When>

          <When condition={!isLoading && !data?.length}>
            <NoDataTable colSpan={columns.length} />
          </When>

          <When condition={!isLoading && data?.length}>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                className={cn("group relative", tableRowClassName?.(row))}
                key={row.id}
                onClick={() => onRowClick?.(row)}
              >
                {row.getVisibleCells().map((cell) => {
                  const size = cell.column.getSize();
                  return (
                    <TableCell
                      key={cell.id}
                      style={{ width: size !== 150 ? size : "auto" }}
                      className={cn("break-words whitespace-normal")}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCellClick?.(cell);
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </When>
        </TableBody>
      </Table>

      <When
        condition={
          typeof currentPage === "number" && typeof pageSize === "number"
        }
      >
        <PaginationControl
          currentPage={currentPage!}
          pageSize={pageSize!}
          total={total}
          totalPage={totalPage}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </When>
    </div>
  );
};

interface PaginationControlProps {
  currentPage: number;
  pageSize: number;
  total: number;
  totalPage: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange?: (page: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  pageSize,
  total,
  totalPage,
  onPageSizeChange,
  onPageChange,
}) => {
  const { t } = useTranslation();

  // range bản ghi đang hiển thị
  const startIndex = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, total);

  // range số trang hiển thị
  const startPage = Math.max(1, currentPage - Math.floor(paginationSize / 2));
  const endPage = Math.min(totalPage, startPage + paginationSize - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex flex-wrap justify-between gap-3">
      <div className="flex items-center space-x-3">
        <Select
          className={cn("w-24", { hidden: !total })}
          placeholder="Page Size"
          value={{ label: pageSize, value: pageSize }}
          onChange={({ value }: any) => onPageSizeChange?.(value as number)}
          options={sizeOptions}
        />
        <p>
          <span className="ml-2 text-sm text-muted-foreground">
            {`Hiển thị ${startIndex} đến ${endIndex} của ${total} kết quả`}
          </span>
        </p>
      </div>

      <div className={cn({ hidden: !total })}>
        <Pagination>
          <PaginationContent>
            <When condition={startPage > 1}>
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange?.(1)}>
                  <ChevronsLeft />
                </PaginationLink>
              </PaginationItem>
            </When>

            <When condition={currentPage > 1}>
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange?.(currentPage - 1)}>
                  <ChevronLeft />
                </PaginationLink>
              </PaginationItem>
            </When>

            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange?.(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <When condition={currentPage < totalPage}>
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange?.(currentPage + 1)}>
                  <ChevronRight />
                </PaginationLink>
              </PaginationItem>
            </When>

            <When condition={endPage < totalPage}>
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange?.(totalPage)}>
                  <ChevronsRight />
                </PaginationLink>
              </PaginationItem>
            </When>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export { PaginationTable };
