/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
  type Row,
  type Cell,
} from "@tanstack/react-table";
import "./data-table.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowLoading,
  NoDataTable,
} from "@/components/ui/table";
import {
  ArrowDownUp,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { When } from "react-if";
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading: boolean;
  onRowClick?: (row: Row<TData>) => void;
  onCellClick?: (cell: Cell<TData, any>) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  tableHeaderClassName?: string;
  tableClassName?: string;
  tableCellClasName?: string;
  tableRowClassName?: string;
  showNoDataMessage?: boolean;
  showData?: boolean;
  wrapText?: boolean;
}

const SortingIcons = {
  asc: <ArrowUpNarrowWide size={16} />,
  desc: <ArrowDownWideNarrow size={16} />,
};

const DataTable = <TData,>({
  columns,
  data,
  sorting,
  onRowClick,
  onCellClick,
  isLoading,
  onSortingChange,
  tableHeaderClassName,
  tableClassName,
  tableCellClasName,
  tableRowClassName,
  showNoDataMessage = true,
  showData = true,
}: DataTableProps<TData>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: false,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    state: {
      sorting,
    },
    enableSorting: true,
  });

  return (
    <div className="w-full" id="data-table">
      <Table className={tableClassName}>
        <TableHeader className={tableHeaderClassName}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const size = header.column.getSize();
                const sortingIcon =
                  SortingIcons[
                    header.column.getIsSorted() as keyof typeof SortingIcons
                  ];

                const headerClassName = cn(
                  "flex items-center gap-1 -ml-1",
                  canSort && "cursor-pointer select-none"
                );

                const sortIcon = canSort ? (
                  <ArrowDownUp
                    size={16}
                    className="invisible group-hover:visible"
                  />
                ) : null;

                return (
                  <TableHead
                    key={header.id}
                    style={{ width: size !== 150 ? size : "auto" }}
                    className="group whitespace-normal break-words max-w-xs space-x-1"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={headerClassName}
                        onClick={() => {
                          if (canSort && onSortingChange) {
                            const currentSorting = header.column.getIsSorted();
                            const isDesc =
                              currentSorting === "asc" || !currentSorting;

                            onSortingChange([
                              {
                                id: header.column.id,
                                desc: isDesc,
                              },
                            ]);
                          }
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {sortingIcon ?? sortIcon}
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

          <When condition={!isLoading && !data?.length && showNoDataMessage}>
            <NoDataTable colSpan={columns.length} />
          </When>

          <When condition={!isLoading && data?.length && showData}>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={tableRowClassName}
              >
                {row.getVisibleCells().map((cell) => {
                  const size = cell.column.getSize();
                  return (
                    <TableCell
                      key={cell.id}
                      style={{ width: size !== 150 ? size : "auto" }}
                      onClick={() => onCellClick?.(cell)}
                      className={tableCellClasName}
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
    </div>
  );
};
export { DataTable };
