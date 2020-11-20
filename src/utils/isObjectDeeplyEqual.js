export const isDeeplyEqual = (a, b): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};
