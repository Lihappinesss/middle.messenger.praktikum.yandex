import Block from '../../modules/Block';

import Error from '../../components/Error';

class NotFound extends Block {
  constructor(tag, props: Record<string, any> = {}) {
    const ErrorPage = new Error({
      err: '404',
      text: 'Не туда попали',
    });

    super('div', {
      ...props,
      ErrorPage,
    });
  }

  render() {
    return (
      this.compile(
        `
          {{{ErrorPage}}}
        `,
      )
    );
  }
}

export default NotFound;
