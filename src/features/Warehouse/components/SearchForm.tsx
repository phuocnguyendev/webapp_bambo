import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useQueryConfig from "../hooks/useQueryConfig";
import { PAGE_DEFAULT, STATUS_WAREHOUSE_OPTIONS } from "@/constants/common";
import { Button } from "@/components/ui/button";
import RenderField from "@/components/RenderField";
import { Form } from "@/components/ui/form";

const DEFAULT_VALUES: Partial<SearchWarehouseParams> = {
  searchText: "",
  status: null,
};

const SearchForm = ({ onRefresh }: { onRefresh?: () => void }) => {
  const methods = useForm<SearchWarehouseParams>({
    defaultValues: DEFAULT_VALUES as SearchWarehouseParams,
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
    const defaultValues: Partial<SearchWarehouseQueryParams> = {
      ...DEFAULT_VALUES,
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      searchText: (queryParams.searchText as string) || "",
      status: queryParams.status || null,
    };
    reset(defaultValues as SearchWarehouseParams);
  }, [queryParams, reset]);

  return (
    <Form {...methods}>
      <form
        className="my-3 grid grid-cols-12 flex-wrap gap-2 bg-white/80 border border-primary-200 rounded-xl shadow-sm px-4 py-4"
        onSubmit={onSubmit}
      >
        <RenderField
          placeholder="Tìm kiếm nhà cung cấp theo tên, mã..."
          name="searchText"
          control={control}
          type="text"
          className="col-span-9 md:col-span-4 lg:col-span-3"
        />
        <RenderField
          placeholder="Chọn trạng thái"
          name="status"
          control={control}
          type="text"
          className="col-span-9 md:col-span-4 lg:col-span-3"
          options={STATUS_WAREHOUSE_OPTIONS}
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
