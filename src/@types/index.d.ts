type ResponseApi<T = {}> = {
  Item: T;
  ErrorDetail: {};
  Message: string;
};

type PageModelResponse<T> = {
  ListModel: T[];
  Count: number;
};

type ErrorResponse = {
  errorMessage: string;
  code: string;
};

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};
type Option = {
  label: string;
  value: string | number;
};
