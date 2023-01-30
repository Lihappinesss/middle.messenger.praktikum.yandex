type TData = Record<string, string | number>;

// eslint-disable-next-line no-shadow
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type TOptions = {
  method?: METHODS
  headers?: Record<string, string>
  timeout?: number
  data?: unknown
};

function queryStringify(data: TData) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
  public get = (url: string, options = {}) => this.request(
    url,
    { ...options, method: METHODS.GET },
  );

  public post = (url: string, options = {}) => this.request(
    url,
    { ...options, method: METHODS.POST },
  );

  public put = (url: string, options = {}) => this.request(
    url,
    { ...options, method: METHODS.PUT },
  );

  public patch = (url: string, options = {}) => this.request(
    url,
    { ...options, method: METHODS.PATCH },
  );

  public delete = (url: string, options = {}) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
  );

  request = (url: string, options: TOptions) => {
    const {
      method = METHODS.GET,
      headers = {},
      data,
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data as TData)}`
          : url,
      );

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        if (xhr.status >= 300) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
