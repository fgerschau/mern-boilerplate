export function asyncHandler<T extends any[], U>(
  func: (...args: T) => PromiseLike<U>,
): (...args: T) => Promise<U> {
  return async (...args) => {
    try {
      return await func(...args);
    } catch (e) {
      // eslint-disable-next-line
    console.error(e)
    }
  };
}

export function validEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
