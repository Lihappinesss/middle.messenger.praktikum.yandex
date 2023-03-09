import HTTPTransport from '.';

describe('Http testing', () => {  
  const http = new HTTPTransport('/user');

  it('check http', () => {
    expect(http).toBeTruthy();
  });
});
