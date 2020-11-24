export const defaultSubmitHandler = (x: { [string]: ?string }) => {
  console.log(JSON.stringify(x, null, 2));
};
