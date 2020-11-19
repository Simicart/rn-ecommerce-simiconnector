export const isObjectTruthy = (o: {}): boolean => {
  return o ? Object.keys(o).length !== 0 : false;
};
