import Block, { TProps } from '../../modules/Block';

import Error from '../../components/Error';

class NotFound extends Block {
  constructor(tag: string, props: TProps) {
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
