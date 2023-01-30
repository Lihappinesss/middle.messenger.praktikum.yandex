import Block from '../../modules/Block';

import Error from '../../components/Error';

class NotFound extends Block {
  constructor(props: Record<string, any> = {}) {
    const error = new Error({
      err: '404',
      text: 'Не туда попали',
    });

    super('div', {
      ...props,
      error,
    });
  }

  render() {
    return (
      this.compile(
        `
          {{{error}}}
        `,
      )
    );
  }
}

export default NotFound;
