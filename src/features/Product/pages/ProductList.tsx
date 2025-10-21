import ErrorFallback from "@/components/ErrorFallback";
import { PaginationTable } from "@/components/PaginationTable";
import Title from "@/components/ui/title";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";

import useQueryConfig from "../hooks/useQueryConfig";
import { Button } from "@/components/ui/button";
import ModalDelete from "../../../components/ModalDelete";
import { useDeleteProduct, useProductList } from "../hooks/useProduct";
import getProductColumns from "../config/productColumns";
import SearchForm from "../components/SearchForm";
import { path } from "@/constants/path";

const ProductList = () => {
  const { data, isLoading, isError } = useProductList();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState<"delete" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { mutateAsync: deleteMutation } = useDeleteProduct();
  const navigate = useNavigate();

  if (isError) return <ErrorFallback />;

  const { queryParams, setQueryParams } = useQueryConfig();
  const currentPage = queryParams.page ?? 1;
  const pageSize = queryParams.pageSize ?? 10;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = (item: ProductListResponse) => {
    setSelectedId(item.Id);
    setModalOpen("delete");
  };

  const handleEdit = (item: ProductListResponse) => {
    navigate(`${path.ProductManagement}/${item.Id}`);
  };

  const handleAddNew = () => {
    navigate(path.ProductAdd);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    setLoadingDelete(true);
    try {
      await deleteMutation(selectedId);
      queryClient.setQueryData(
        ["account-list", queryParams],
        (oldData?: PageModelResponse<ProductListResponse>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ListModel: oldData.ListModel.filter(
              (item) => item.Id !== selectedId
            ),
            Count: oldData.Count > 0 ? oldData.Count - 1 : 0,
          };
        }
      );
      setModalOpen(null);
      setSelectedId(null);
    } finally {
      setLoadingDelete(false);
    }
  };

  const columns = getProductColumns(currentPage, pageSize, {
    onDelete: handleDelete,
    onEdit: handleEdit,
  });
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <Title title="Quản lý sản phẩm" />
      </div>
      <SearchForm />
      <div className="mb-2">
        <Button
          variant="default"
          icon={<CirclePlus size={16} />}
          onClick={handleAddNew}
        >
          Thêm mới
        </Button>
      </div>

      <PaginationTable
        columns={columns}
        pageModel={data!}
        isLoading={isLoading}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(p) => setQueryParams({ ...queryParams, page: p })}
        onPageSizeChange={(s) =>
          setQueryParams({ ...queryParams, pageSize: s, page: 1 })
        }
        tableHeaderClassName="bg-green-700 text-white rounded-t-lg"
      />

      <ModalDelete
        open={modalOpen === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setModalOpen(null);
            setSelectedId(null);
          }
        }}
        onOk={handleConfirmDelete}
        loading={loadingDelete}
        title="Bạn có chắc chắn muốn xóa sản phẩm này?"
      />
    </div>
  );
};
export default ProductList;
