import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RenderField from "@/components/RenderField";
import { useProductUpdate, useGetDetailProduct } from "../hooks/useProduct";
import { STATUS_ACTIVE } from "@/constants/common";

const defaultValues = {
  Code: "",
  Sku: "",
  Name: "",
  Material: "",
  SpecText: "",
  Uom: "",
  BaseCost: 0,
  Barcode: "",
  HSCode: "",
  CountryOfOrigin: "",
  WeightKg: 0,
  LengthCm: 0,
  WidthCm: 0,
  HeightCm: 0,
  Version: 1,
  ImageUrl: "",
  Status: "true",
  Note: "",
};

interface ProductDetailPageProps {
  mode?: "create" | "update";
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  mode = "update",
}) => {
  const { id } = useParams();
  const methods = useForm({ defaultValues });
  const { control, handleSubmit, setValue, reset } = methods;
  const { mutateAsync: updateProduct, status: updateStatus } =
    useProductUpdate();
  const { data: detailData } = useGetDetailProduct(id || "");

  useEffect(() => {
    if (mode === "update" && detailData) {
      Object.entries(detailData).forEach(([key, value]) => {
        if (key === "Status") {
          setValue("Status", value ? "true" : "false");
        } else {
          setValue(key as any, value);
        }
      });
    } else if (mode === "create") {
      reset(defaultValues);
    }
  }, [mode, detailData, setValue, reset]);

  const onSubmit = async (values: any) => {
    if (mode === "create") {
      await updateProduct(values);
      reset();
    } else {
      await updateProduct({ ...values, Id: id });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4 py-4">
        {/* --- THÔNG TIN SẢN PHẨM --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="col-span-1 flex flex-col items-center">
            <div className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden">
              {mode === "update" && detailData?.ImageUrls ? (
                <img
                  src={detailData.ImageUrls[0]}
                  alt="Ảnh đại diện"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-sm text-center">
                  Chọn ảnh đại diện
                </span>
              )}
            </div>
            <RenderField
              control={control}
              name="ImageUrl"
              label="Ảnh đại diện (URL)"
            />
          </div>

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <RenderField control={control} name="Code" label="Mã sản phẩm" />
            <RenderField control={control} name="Sku" label="SKU" />
            <RenderField control={control} name="Name" label="Tên sản phẩm" />
            <RenderField control={control} name="Material" label="Chất liệu" />
            <RenderField
              control={control}
              name="SpecText"
              label="Thông số kỹ thuật"
            />
            <RenderField control={control} name="Uom" label="Đơn vị tính" />
            <RenderField
              control={control}
              name="BaseCost"
              label="Giá gốc (₫)"
              type="number"
            />
            <RenderField control={control} name="Barcode" label="Barcode" />
            <RenderField control={control} name="HSCode" label="HSCode" />
            <RenderField
              control={control}
              name="CountryOfOrigin"
              label="Xuất xứ"
            />
          </div>
        </div>

        {/* --- KỸ THUẬT & KÍCH THƯỚC --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
            <RenderField
              control={control}
              name="WeightKg"
              label="Khối lượng (kg)"
              type="number"
            />
            <RenderField
              control={control}
              name="LengthCm"
              label="Dài (cm)"
              type="number"
            />
            <RenderField
              control={control}
              name="WidthCm"
              label="Rộng (cm)"
              type="number"
            />
            <RenderField
              control={control}
              name="HeightCm"
              label="Cao (cm)"
              type="number"
            />
          </div>
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <RenderField
              control={control}
              name="Version"
              label="Version"
              type="number"
            />
            <RenderField control={control} name="Note" label="Ghi chú" />
            <RenderField
              control={control}
              name="Status"
              label="Trạng thái"
              options={STATUS_ACTIVE}
            />
          </div>
        </div>

        {/* --- NÚT HÀNH ĐỘNG --- */}
        <div className="bg-white py-4 flex justify-end gap-3 border-t mt-4">
          <Button type="button" variant="secondary">
            Quay về
          </Button>
          <Button type="submit" disabled={updateStatus === "pending"}>
            {mode === "create" ? "Lưu & Thêm mới" : "Lưu thay đổi"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductDetailPage;
