type SearchAccountParams = {
  searchText: string | null;
};

type SearchQueryAccountParams = SearchAccountParams & {
  page: number | null;
  pageSize: number | null;
};
