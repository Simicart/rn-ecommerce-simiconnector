//8---> 'a75TossC'
export const makeRandomString = (length?: number): string => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  const charactersLength = characters.length;
  const stringLength = length ?? 5;
  for (let i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
