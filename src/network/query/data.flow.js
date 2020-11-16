type request = {
  endPoint: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  baseURL?: string,
  resourceId?: string,
  initialGetParams?: {},
  initialBodyParams?: {},
  headers?: {},
  timeout?: number,
  skip?: boolean,
  token?: string,
};

export type { request };
