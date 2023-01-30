import Block from '../../modules/Block';

import template from './template';

import styles from './index.module.sass';

class Navigation extends Block {
  constructor() {
    super('nav', {
      className: styles.nav,
    });
  }

  render(): DocumentFragment {
    return this.compile(
      template,
    );
  }
}

export default Navigation;
