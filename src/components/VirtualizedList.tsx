import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";
import { type ElementType, memo, type ReactNode, useRef } from "react";

type Props<T> = {
  dataSource: T[];
  as?: ElementType | string;
  className?: string;
  renderItem: (
    virtualItem: import("@tanstack/react-virtual").VirtualItem,
    virtualizer: Virtualizer<HTMLDivElement, Element>
  ) => ReactNode;
};

const VirtualizedList = <T,>({
  dataSource,
  as,
  className,
  renderItem,
}: Props<T>) => {
  const listElRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer<HTMLDivElement, Element>({
    count: dataSource?.length || 0,
    getScrollElement: () => listElRef.current,
    estimateSize: () => 63,
  });

  const items = virtualizer.getVirtualItems();
  const ElementTag = as || "div";

  return (
    <ElementTag ref={listElRef} className={className}>
      <div
        className="w-full relative"
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        <div
          className="grid grid-cols-1 divide-y absolute top-0 left-0 w-full"
          style={{
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((item) => renderItem(item, virtualizer))}
        </div>
      </div>
    </ElementTag>
  );
};

export default memo(VirtualizedList) as typeof VirtualizedList;
