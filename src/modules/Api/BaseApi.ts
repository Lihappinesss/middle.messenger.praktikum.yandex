import HTTPTransport from '.';

const defaultHeaders = {
  'Content-type': 'application/json; charset=UTF-8',
};

export default abstract class BaseAPI {
  private _http: HTTPTransport;

  private _headers: Record<string, string>;

  protected constructor(endpoint: string) {
    this._http = new HTTPTransport(endpoint);
    this._headers = defaultHeaders;
  }

  private handleOptions(newOptions?: Record<any, any>) {
    const options = newOptions || {};
    options.headers = newOptions?.headers || this._headers;
    return options;
  }

  private handleResponse(res: XMLHttpRequest) {
    if (res.response === 'OK') {
      return { ok: true };
    }

    const {
      response,
    } = res;

    return response;
  }

  get(endpoint: `/${string}`, options?: {}) {
    return this._http.get(this._http.getFullUrl() + endpoint, this.handleOptions(options))
      .then(this.handleResponse);
  }

  post(endpoint: `/${string}`, options?: {}) {
    return this._http.post(this._http.getFullUrl() + endpoint, this.handleOptions(options))
      .then(this.handleResponse);
  }

  put(endpoint: `/${string}`, options?: {}) {
    return this._http.put(this._http.getFullUrl() + endpoint, this.handleOptions(options))
      .then(this.handleResponse);
  }

  delete(endpoint: `/${string}`, options?: {}) {
    return this._http.delete(this._http.getFullUrl() + endpoint, this.handleOptions(options))
      .then(this.handleResponse);
  }
}
