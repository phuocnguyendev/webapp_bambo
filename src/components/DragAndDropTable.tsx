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
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
} from "@tanstack/react-table";
import { Move } from "lucide-react";
import { type CSSProperties, useMemo } from "react";
import { When } from "react-if";

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    <button {...attributes} {...listeners}>
      <Move />
    </button>
  );
};

const DraggableRow = <T,>({ row, rowId }: { row: Row<T>; rowId: string }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: rowId,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

interface DragAndDropTableProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  getRowId: (row: T, index?: number) => string;
  onRowSelectionChange?: (selectedRow: T) => void;
}

const DragAndDropTable = <T,>({
  data,
  setData,
  columns,
  isLoading = false,
  getRowId,
}: DragAndDropTableProps<T>) => {
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data.map(getRowId),
    [data, getRowId]
  );

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => getRowId(row),
    enableColumnResizing: false,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    enableMultiRowSelection: false,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      const newData = arrayMove(data, oldIndex, newIndex);
      setData(newData);
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <When condition={isLoading}>
            <TableRowLoading colSpan={columns.length} />
          </When>

          <When condition={!isLoading && !dataIds?.length}>
            <NoDataTable colSpan={columns.length} />
          </When>

          <When condition={!isLoading && dataIds?.length}>
            <SortableContext items={dataIds}>
              {table.getRowModel().rows.map((row: Row<T>) => (
                <DraggableRow
                  key={row.id}
                  row={row}
                  rowId={getRowId(row.original)}
                />
              ))}
            </SortableContext>
          </When>
        </TableBody>
      </Table>
    </DndContext>
  );
};

export { DragAndDropTable, RowDragHandleCell };
