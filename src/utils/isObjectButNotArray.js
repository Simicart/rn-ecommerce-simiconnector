export const isObjectButNotArray = (x: any): boolean => {
  return x instanceof Object && !(x instanceof Array);
};
