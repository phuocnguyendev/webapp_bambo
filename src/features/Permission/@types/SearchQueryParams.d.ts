type SearchPermissionParams = {
  searchText: string | null;
};

type SearchQueryPermissionParams = SearchPermissionParams & {
  page: number | null;
  pageSize: number | null;
};
