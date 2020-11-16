export const isObjectTruthy = (o: {}) =>
  o ? Object.keys(o).length !== 0 : false;
