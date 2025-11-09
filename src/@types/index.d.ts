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
  error: string;
  message: string;
  statusCode: number;
};

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};
type Option = {
  label: string;
  value: string | number;
};
