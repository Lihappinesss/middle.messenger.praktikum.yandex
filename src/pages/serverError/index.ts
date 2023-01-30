import Block from '../../modules/Block';

import Error from '../../components/Error';

class ServerError extends Block {
  constructor(props: Record<string, any> = {}) {
    const error = new Error({
      err: '500',
      text: 'Мы уже фиксим',
    });

    super('div', {
      ...props,
      error,
    });
  }

  render(): DocumentFragment {
    return (
      this.compile(
        `
          {{{error}}}
        `,
      )
    );
  }
}

export default ServerError;
