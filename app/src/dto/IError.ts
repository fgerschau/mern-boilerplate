interface IError {
  message: string;
  fields?: {
    [field: string]: boolean;
  };
}

export default IError;
