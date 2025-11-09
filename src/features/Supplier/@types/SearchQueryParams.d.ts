type SearchSupplierParams = {
  searchText: string | null;
};

type SearchSupplierQueryParams = Partial<SearchSupplierParams> & {
  page: number | null;
  pageSize: number | null;
};
