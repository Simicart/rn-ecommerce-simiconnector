const paddy = (num: number, padLength: number, padChar?: string): string => {
  const pad_char = typeof padChar !== 'undefined' ? padChar[0] : '0';
  const pad = new Array(1 + padLength).join(pad_char);
  return (pad + num).slice(-pad.length);
};

export const dateToString = (date: Date): string => {
  return (
    paddy(date.getMonth() + 1, 2) +
    '/' +
    paddy(date.getDate(), 2) +
    '/' +
    date.getFullYear()
  );
};
