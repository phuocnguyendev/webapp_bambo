type SearchProductParams = {
  searchText: string | null;
};

type SearchQueryProductParams = SearchProductParams & {
  page: number | null;
  pageSize: number | null;
};
