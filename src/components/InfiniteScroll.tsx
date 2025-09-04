import type { CSSProperties, ReactNode } from "react";
import { When } from "react-if";
import RCInfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "./ui/spin";

interface InfiniteScrollProps {
  children: ReactNode;
  className?: string;
  scrollableTarget?: ReactNode;
  inverse?: boolean;
  pullDownToRefresh?: boolean;
  dataLength: number;
  style?: CSSProperties;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  height?: string | number;
  hasShowEndMessage?: boolean;
}

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const {
    children,
    hasShowEndMessage = false,
    pullDownToRefresh = false,
  } = props;

  const EndMessage = () => {
    return (
      <When
        condition={
          !props.isFetchingNextPage && !props.hasNextPage && hasShowEndMessage
        }
      >
        <p className="text-center my-3">
          <b>Yay! You have seen it all</b>
        </p>
      </When>
    );
  };

  if (props.isLoading) {
    return (
      <div className="my-3">
        <Spin />
      </div>
    );
  }

  return (
    <RCInfiniteScroll
      dataLength={props.dataLength}
      next={props.fetchNextPage}
      hasMore={props.hasNextPage}
      loader={props.isFetchingNextPage && <Spin />}
      endMessage={<EndMessage />}
      scrollableTarget={props.scrollableTarget}
      inverse={props.inverse}
      pullDownToRefresh={pullDownToRefresh}
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <p className="text-center my-3">&#8595; Pull down to refresh</p>
      }
      releaseToRefreshContent={
        <p className="text-center my-3">&#8593; Release to refresh</p>
      }
      style={{
        overflow: props?.scrollableTarget ? "hidden" : "auto",
        ...props.style,
      }}
      className={props?.className}
      height={props.height}
    >
      {children}
    </RCInfiniteScroll>
  );
};

export default InfiniteScroll;
