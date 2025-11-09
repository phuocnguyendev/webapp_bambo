import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "@/constants/path";

import { toast } from "react-toastify";
import {
  PaginationTable,
  type ColumnDefCustom,
} from "@/components/PaginationTable";
import {
  useDownloadTemplateExcel,
  useExportInvalidProduct,
  useImportExcel,
  useInsertManyProduct,
} from "../hooks/useProduct";
import { RemoveIcon } from "@/assets/svg";
import Title from "@/components/ui/title";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const AddProductByExcelPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [listProductExcel, setListProductExcel] = useState<ProductRow[]>([]);
  const [totalSuccess, setTotalSuccess] = useState<number>();
  const [totalFail, setTotalFail] = useState<number>();
  const [cellError, setCellError] = useState<Record<string, string[]>>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: ImportExcel } = useImportExcel();
  const { mutateAsync: ExportInvalidProduct } = useExportInvalidProduct();
  const { mutateAsync: InsertManyProduct } = useInsertManyProduct();
  const [errorPayload, setErrorPayload] = useState<InvalidProduct | null>(null);
  const [previewData, setPreviewData] = useState<string[][] | null>(null);
  const { mutate: DownloadTemplateExcel } = useDownloadTemplateExcel();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleAccessFileInputRef = async () => {
    setLoading(true);
    fileInputRef.current?.click();
    setLoading(false);
  };
  const onPageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const response = await ImportExcel(file);
      const item = response?.Item.Data ?? [];
      console.log("xxxxxxxxxxxxxx", item);

      if (item.length === 0) {
        toast.warn("Không có sản phẩm nào được nhận diện");
        setStep(1);
        return;
      }

      setPreviewData(item);
      setStep(2);
    } catch (error) {
      const errorMessage = (error as any)?.response?.data;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(previewData) && previewData.length > 0) {
      const cleanedData: any[] = previewData.map((row, idx) => ({
        id: `row-${idx}`,
        STT: idx,
        0: row[0] || "",
        1: row[1] || "",
        2: row[2] || "",
        3: row[3] || "",
        4: row[4] || "",
        5: Number(row[5]) || 0,
        6: row[6] === "TRUE" || row[6] === "true",
        7: row[7] || "",
        8: row[8] || "",
        9: row[9] || "",
        10: row[10] || "",
        11: Number(row[11]) || 0,
        12: Number(row[12]) || 0,
        13: Number(row[13]) || 0,
        14: Number(row[14]) || 0,
        15: row[15] || "",
        16: row[16] || "",
        17: row[17] || "",
        18: row[18] || "",
        19: row[19] || "",
      }));

      setListProductExcel(cleanedData);
      setStep(2);
    } else {
      setStep(1);
    }
  }, [previewData]);

  const DownloadMauImport = () => {
    DownloadTemplateExcel();
  };

  const handleOnFileChange = async (e: FileChangeEvent): Promise<void> => {
    setLoading(true);
    await handleFileUpload(e);
    setLoading(false);
  };

  const handleDeleteRow = (index: number) => {
    const result = listProductExcel.filter((_, i) => i !== index);
    setListProductExcel(result);
    console.log("Row deleted at index:", index);
  };

  const handleBack = () => {
    if (step === 3) {
      if (totalFail! > 0) {
        setStep(1);
      } else {
        navigate(path.ProductManagement);
      }
      return;
    }

    if (step === 2) {
      setStep(1);
      setListProductExcel([]);
    } else {
      navigate(path.ProductManagement);
    }
  };

  const handleSubmit = async () => {
    if (!listProductExcel.length) return;

    setLoading(true);

    const cleanedData = listProductExcel.map((row) => [
      row[0] || "",
      row[1] || "",
      row[2] || "",
    ]);

    const resp = await InsertManyProduct({
      cleanedData: cleanedData as unknown as Product[],
    });

    const invalidRows = resp?.Item?.InvalidProduct || [];

    const errorList: Record<
      string,
      { ErrorMessage: string; ErrorCells: number[] }
    > = {};

    const errorMap = new Map();
    invalidRows.forEach((error: any) => {
      errorMap.set(error.RowIndex, error);
    });

    const updatedRows = listProductExcel.map((row, index) => {
      const error = errorMap.get(index);
      if (error) {
        const ErrorCells = (error.ErrorCells || []).map((i: any) =>
          parseInt(i)
        );
        errorList[index.toString()] = {
          ErrorMessage: error.ErrorMessage,
          ErrorCells,
        };

        return { ...row, ErrorMessage: error.ErrorMessage };
      }
      return row;
    });
    setListProductExcel(updatedRows);

    const formattedErrors: Record<string, string[]> = {};
    Object.entries(errorList).forEach(([rowIndex, value]) => {
      formattedErrors[rowIndex] = value.ErrorCells.map((i) => i.toString());
    });
    setCellError(formattedErrors);

    const total = listProductExcel.length;
    const failCount = Object.keys(errorList).length;
    const successCount = total - failCount;

    setTotalFail(failCount);
    setTotalSuccess(successCount);

    setErrorPayload(
      invalidRows.map((item: any) => ({
        RowIndex: item.RowIndex,
        ErrorMessage: item.ErrorMessage,
        ErrorCells: item.ErrorCells,
        CellValues: item.CellValues,
      }))
    );

    setStep(3);
    setLoading(false);
  };

  const saveByteArray = async () => {
    if (errorPayload) {
      await ExportInvalidProduct(errorPayload);
    }
  };

  const dynamicCols: ColumnDefCustom<ProductRow>[] = [];

  const headerLabels: Record<string, string> = {
    "0": "Mã sản phẩm",
    "1": "SKU",
    "2": "Tên sản phẩm",
    "3": "Chất liệu",
    "4": "Mô tả kỹ thuật",
    "5": "Đơn vị tính",
    "6": "Giá vốn",
    "7": "Kích hoạt",
    "8": "Ghi chú",
    "9": "Mã vạch(Barcode)",
    "10": "Mã HS",
    "11": "Xuất xứ",
    "12": "Khối lượng (kg)",
    "13": "Dài (cm)",
    "14": "Rộng (cm)",
    "15": "Cao (cm)",
    "16": "Ảnh chính (URL)",
  };

  dynamicCols.push({
    id: "stt",
    header: "STT",
    cell: ({ row }) => (
      <div style={{ position: "sticky", left: 0 }} className="bg-white z-20">
        {(page - 1) * pageSize + row.index + 1}
      </div>
    ),
    size: 70,
  });

  const leftStickyOffsets = [70, 220];
  ["0", "1"].forEach((key, idx) =>
    dynamicCols.push({
      id: `col_${key}`,
      header: headerLabels[key] || (idx === 0 ? "Khối" : "Lớp"),
      accessorFn: (row: any) => (row as any)[key],
      cell: ({ getValue, row }) => {
        const original = row.original;
        const hasError =
          step === 3 &&
          original.STT !== undefined &&
          cellError[original.STT.toString()]?.includes(key);
        return (
          <div
            style={{ position: "sticky", left: leftStickyOffsets[idx] }}
            className={`bg-white z-10 ${
              idx === 0 ? "text-left" : "text-center"
            } ${hasError ? "min-h-38 errorBackGround py-2" : ""}`}
          >
            {getValue() as string}
          </div>
        );
      },
      size: 150,
    })
  );

  for (let i = 2; i <= 19; i++) {
    const key = String(i);
    dynamicCols.push({
      id: `col_${key}`,
      header: headerLabels[key] || `Cột ${i}`,
      accessorFn: (row: any) => (row as any)[key],
      cell: ({ getValue, row }) => {
        const original = row.original;
        const hasError =
          step === 3 &&
          original.STT !== undefined &&
          cellError[original.STT.toString()]?.includes(key);
        return (
          <span
            className={
              hasError ? "min-h-38 errorBackGround py-2 block" : "block"
            }
          >
            {getValue() as string}
          </span>
        );
      },
      size: 150,
    });
  }

  dynamicCols.push({
    id: "actions",
    header: step === 2 ? "Hành động" : "Nội dung lỗi",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <div style={{ position: "sticky", right: 0 }} className="bg-white z-20">
          {step === 2 && (
            <button
              className="mx-2"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteRow(row.index);
              }}
            >
              <RemoveIcon />
            </button>
          )}
          {step === 3 && (
            <div className="whitespace-pre-line text-left text-danger-20">
              {original.ErrorMessage}
            </div>
          )}
        </div>
      );
    },
    size: 150,
  });

  const columns = dynamicCols;

  const filteredRows =
    step === 3 && totalFail! > 0
      ? listProductExcel.filter((_, index) => cellError[index.toString()])
      : listProductExcel;

  return (
    <div ref={ref}>
      <Title title="Thêm mới sản phẩm từ file excel" />

      <div className="my-10">
        <ProgressBar activeStep={step} type="excel" />
      </div>

      {step === 1 && (
        <div className="rounded-md bg-[#C6DEFF] py-4">
          <div className="flex items-center justify-center gap-1">
            <Button
              variant="default"
              style={{
                backgroundColor: "#FF7065",
              }}
              className="w-[112px] bg-danger-50 hover:bg-danger-50/30 "
              onClick={() => {
                DownloadMauImport();
              }}
            >
              Tải file mẫu
            </Button>

            <input
              type="file"
              accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              className="hidden"
              ref={fileInputRef}
              onChange={handleOnFileChange}
              onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                (e.target as HTMLInputElement).value = "";
              }}
            />

            <Button
              variant="default"
              className="ml-2"
              onClick={handleAccessFileInputRef}
            >
              Chọn tệp
            </Button>
          </div>

          <div className="mt-3 inline-flex w-full items-center justify-center gap-x-1">
            <svg
              width={19}
              height={18}
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 17.4375C14.1599 17.4375 17.9375 13.6599 17.9375 9C17.9375 4.3401 14.1599 0.5625 9.5 0.5625C4.8401 0.5625 1.0625 4.3401 1.0625 9C1.0625 13.6599 4.8401 17.4375 9.5 17.4375Z"
                fill="#FF7D00"
              />
              <path
                d="M8.81234 10.7144C8.80203 10.6507 8.79688 10.5893 8.79688 10.5302C8.79688 10.4711 8.79688 10.4093 8.79688 10.3446C8.78923 10.0334 8.84621 9.72411 8.96422 9.43613C9.06724 9.19311 9.20979 8.96883 9.38609 8.77238C9.55494 8.58898 9.7436 8.42486 9.94859 8.28301C10.1473 8.14332 10.3348 8.0027 10.5111 7.86113C10.6684 7.73501 10.81 7.59055 10.933 7.43082C11.0466 7.27729 11.1055 7.09016 11.1003 6.89926C11.1033 6.76764 11.0732 6.63738 11.0128 6.52042C10.9523 6.40347 10.8635 6.30356 10.7544 6.22988C10.5228 6.06301 10.1642 5.97957 9.67859 5.97957C9.44734 5.97692 9.21728 6.01305 8.99797 6.08645C8.79923 6.15444 8.60717 6.24058 8.42422 6.34379C8.26131 6.43528 8.1057 6.53918 7.95875 6.65457C7.82281 6.76238 7.70328 6.85191 7.60016 6.92316L6.82812 5.92332C7.02181 5.71406 7.24048 5.52939 7.47922 5.37348C7.72119 5.2149 7.97956 5.08289 8.24984 4.97973C8.5209 4.87611 8.80102 4.79796 9.08656 4.74629C9.36497 4.69559 9.64733 4.66971 9.93031 4.66895C10.7984 4.66895 11.4734 4.85035 11.9553 5.21316C12.1865 5.37932 12.3733 5.59971 12.4993 5.85497C12.6253 6.11022 12.6867 6.39253 12.6781 6.67707C12.6896 7.02306 12.6262 7.36746 12.4925 7.68676C12.3812 7.93968 12.2249 8.1703 12.0312 8.36738C11.8411 8.55135 11.6334 8.71621 11.4111 8.85957C11.1978 8.99866 10.9943 9.1523 10.8022 9.31941C10.6157 9.48048 10.4561 9.67039 10.3297 9.88191C10.193 10.1344 10.127 10.4191 10.1384 10.706L8.81234 10.7144ZM8.57328 12.4118C8.56716 12.2888 8.58746 12.1659 8.63282 12.0514C8.67818 11.9369 8.74755 11.8334 8.83625 11.748C9.02661 11.5792 9.27538 11.4914 9.52953 11.5033C9.79127 11.4888 10.0484 11.5766 10.2467 11.748C10.3353 11.8335 10.4047 11.9369 10.45 12.0514C10.4954 12.1659 10.5157 12.2888 10.5097 12.4118C10.515 12.5351 10.4943 12.6581 10.449 12.773C10.4037 12.8878 10.3348 12.9918 10.2467 13.0783C10.0501 13.2533 9.79228 13.3433 9.52953 13.3286C9.40319 13.3345 9.27692 13.3155 9.15796 13.2725C9.039 13.2296 8.92968 13.1636 8.83625 13.0783C8.74846 12.9917 8.67981 12.8876 8.63476 12.7728C8.5897 12.658 8.56924 12.535 8.57469 12.4118H8.57328Z"
                fill="white"
              />
            </svg>

            <p className="text-xs text-neutral-40">
              Hãy chọn file Excel để tải lên (định dạng đuôi file: xls, xlsm,
              xlsx)
            </p>
          </div>
        </div>
      )}

      {step > 1 && (
        <div>
          {step === 2 && (
            <>
              <p>
                {!listProductExcel?.length && (
                  <div>
                    <p className="mb-3 w-full border-primary-20 font-bold uppercase text-primary-20">
                      Không có sản phẩm nào được nhận diện. Hãy chọn file khác!
                    </p>

                    <input
                      type="file"
                      accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleOnFileChange}
                    />

                    <Button
                      variant="default"
                      onClick={handleAccessFileInputRef}
                    >
                      Chọn tệp
                    </Button>
                  </div>
                )}
              </p>

              {!!listProductExcel?.length && (
                <h3 className="text-xl font-bold text-primary-20">
                  DANH SÁCH SẢN PHẨM ĐÃ NHẬN DIỆN
                </h3>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <p className="mb-3 font-bold text-success-20">
                Lưu thành công:{" "}
                <span className="font-normal">
                  {" " + totalSuccess} sản phẩm
                </span>
              </p>
              {!!totalFail && (
                <p className="font-bold text-danger-30">
                  Lưu thất bại:{" "}
                  <span className="font-normal">
                    {" " + totalFail} sản phẩm
                  </span>
                  <div className="mt-3 flex items-center gap-x-1">
                    <i className="text-sm font-normal text-neutral-40">
                      Bạn có thể tải file lỗi về máy để chỉnh sửa trực tiếp. Bấm
                      vào đây để tải
                    </i>

                    <button
                      className="none ml-2 flex items-center font-normal"
                      style={{ display: "inline-block" }}
                      onClick={() => {
                        saveByteArray();
                      }}
                    >
                      <svg
                        width={14}
                        height={17}
                        viewBox="0 0 14 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 inline"
                      >
                        <path
                          d="M14 6H10V0H4V6H0L7 13L14 6ZM0 15V17H14V15H0Z"
                          fill="#E02B1D"
                        />
                      </svg>
                      Tải file lỗi
                    </button>
                  </div>
                </p>
              )}

              {!!totalFail && (
                <h3 className="mt-3 font-bold uppercase text-primary-20">
                  Danh sách sản phẩm bị lỗi
                </h3>
              )}
            </>
          )}

          <div className="my-2">
            {((step === 2 && !!filteredRows?.length) ||
              (step === 3 && totalFail! > 0)) && (
              <div className="overflow-x-auto">
                <PaginationTable
                  columns={columns}
                  pageModel={filteredRows}
                  isLoading={loading}
                  currentPage={page}
                  pageSize={pageSize}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(s) => onPageSizeChange(s)}
                  tableClassName="min-w-800"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-2 flex items-center justify-end">
        {step < 3 && (
          <Button variant="default" onClick={handleBack}>
            Quay về
          </Button>
        )}

        {!!listProductExcel?.length && (
          <>
            {step === 2 && (
              <Button variant="default" className="ml-2" onClick={handleSubmit}>
                Tiếp tục
              </Button>
            )}
          </>
        )}

        {step === 3 && (
          <Button variant="default" className="ml-2" onClick={handleBack}>
            Hoàn tất
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddProductByExcelPage;
