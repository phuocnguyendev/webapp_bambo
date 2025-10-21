import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

const useQueryConfig = () => {
  const [queryParams, setQueryParams] = useQueryStates({
    page: parseAsInteger,
    pageSize: parseAsInteger,
    searchText: parseAsString,
  });

  return {
    queryParams,
    setQueryParams,
  };
};

export default useQueryConfig;
