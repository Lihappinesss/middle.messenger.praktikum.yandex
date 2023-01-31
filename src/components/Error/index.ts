import Block from '../../modules/Block';

import { TError } from './types';

import styles from './index.module.sass';

class Error extends Block {
  constructor(props: TError) {
    super('div', {
      ...props,
      className: styles.wrapper,
    });
  }

  render(): DocumentFragment {
    return this.compile(
      `
        <h1 class=${styles.error}>{{err}}</h1>
        <div class=${styles.text}>{{text}}</div>
        <a class=${styles.link} href='/chat'>Назад к чатам</a>
      `,
      this.props,
    );
  }
}

export default Error;
