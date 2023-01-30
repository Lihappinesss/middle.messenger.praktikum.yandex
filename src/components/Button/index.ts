import Block from '../../modules/Block';

import { Ibutton } from './types';

import styles from './index.module.sass';

class Button extends Block {
  constructor(props: Ibutton) {
    super('button', {
      ...props,
      className: styles.btn,
      events: {
        click: props.onClick,
        blur: props.onBlur,
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(
      '{{text}}',
      this.props,
    );
  }
}

export default Button;
