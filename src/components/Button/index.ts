import Block from '../../modules/Block';

import { Ibutton } from './types';

import styles from './index.module.sass';

class Button extends Block {
  constructor(props: Ibutton) {
    super('button', {
      ...props,
      className: props.type ? styles.ghost : styles.btn,
      events: {
        click: props.onClick,
        blur: props.onBlur,
      },
    });
  }

  render(): DocumentFragment {
    const content = this.props.icon
    ? `<img src=${this.props.icon} />`
    : '{{text}}';

    return this.compile(
      content,
      this.props,
    );
  }
}

export default Button;
