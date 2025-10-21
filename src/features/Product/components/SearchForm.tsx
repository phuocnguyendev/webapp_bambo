import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useQueryConfig from "../hooks/useQueryConfig";
import { PAGE_DEFAULT } from "@/constants/common";
import { Button } from "@/components/ui/button";
import RenderField from "@/components/RenderField";
import { Form } from "@/components/ui/form";

const DEFAULT_VALUES: Partial<SearchProductParams> = {
  searchText: "",
};

const SearchForm = ({ onRefresh }: { onRefresh?: () => void }) => {
  const methods = useForm<SearchProductParams>({
    defaultValues: DEFAULT_VALUES as SearchProductParams,
  });
  const { handleSubmit, control, reset } = methods;
  const { queryParams, setQueryParams } = useQueryConfig();

  const onSubmit = handleSubmit((data) => {
    setQueryParams({ ...data, page: 1 });
  });

  const handleResetField = () => {
    reset(DEFAULT_VALUES);
    onRefresh?.();
    setQueryParams((prev) => ({
      ...prev,
      page: PAGE_DEFAULT,
      pageSize: null,
      searchText: "",
    }));
  };

  useEffect(() => {
    const defaultValues: Partial<SearchQueryAccountParams> = {
      ...DEFAULT_VALUES,
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      searchText: (queryParams.searchText as string) || "",
    };
    reset(defaultValues as SearchProductParams);
  }, [queryParams, reset]);

  return (
    <Form {...methods}>
      <form
        className="my-3 grid grid-cols-12 flex-wrap gap-2 bg-white/80 border border-primary-200 rounded-xl shadow-sm px-4 py-4"
        onSubmit={onSubmit}
      >
        <RenderField
          placeholder="Tên sản phẩm, mã sản phẩm"
          name="searchText"
          control={control}
          type="text"
          className="col-span-9 md:col-span-4 lg:col-span-3"
        />
        <div className="col-span-3 flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="font-semibold hover:bg-secondary/80 transition-colors"
            onClick={handleResetField}
          >
            Làm mới
          </Button>
          <Button
            type="submit"
            variant="default"
            className="font-bold hover:bg-green-800 transition-colors"
          >
            Tìm kiếm
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
