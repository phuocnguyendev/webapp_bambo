type SearchWarehouseParams = {
  searchText: string | null;
  status: number | null;
};

type SearchWarehouseQueryParams = SearchWarehouseParams & {
  page: number | null;
  pageSize: number | null;
};
