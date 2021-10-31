interface ICustomError extends Error {
  code: string;
  status?: number;
}

export default ICustomError;
