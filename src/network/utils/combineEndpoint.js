export const combineEndpoint = (endPoint = '', resourceId = '') => {
  if (!endPoint) {
    return '/';
  }
  const result =
    (/^http.*$/.test(endPoint) ? '' : '/') +
    endPoint +
    (endPoint[endPoint.length - 1] === '/' ? '' : '/') +
    resourceId;
  console.info(`request with ${result}`);
  return result;
};
