export const resolveNetworkStatus = (_status: string | number): string => {
  const status = _status.toString();

  switch (status) {
    case '200':
      return 'OK 🔥';
    case '304':
      return 'Nothing Changed 🔥';
    default:
      return '?';
  }
};
