// * Input của memoize là 1 function
const memoize = <GenericFunction extends (...args: any[]) => any>(
  func: GenericFunction
) => {
  // * Sử dụng Map để có thể result lại result của memo

  const resultMap = new Map<string, ReturnType<GenericFunction>>();

  return (...args: Parameters<GenericFunction>) => {
    const key = JSON.stringify(args);

    if (resultMap.has(key)) {
      // * TH có key nằm trong map thì result kết quả không cần tính lại giá trị mới
      return resultMap.get(key);
    }
    // * TH chưa có key nằm trong map thì result kết quả thì tính lại giá trị mới

    const result = func(...args);
    // * set kết quả mớu vào resultMap
    resultMap.set(key, result);

    return result;
  };
};

export default memoize;
