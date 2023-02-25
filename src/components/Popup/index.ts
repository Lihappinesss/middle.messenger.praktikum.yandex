import Block, { TProps } from '../../modules/Block';

import Input from '../Input';
import UserList from '../UserList';
import Button from '../Button';

import close from '../../images/close.svg';

import styles from './index.module.sass';

class Popup extends Block {
  constructor(tag: string, props: TProps) {
    const SearchUser = new Input({
      type: 'text',
      placeholder: 'Поиск',
      name: 'search',
      onInput: (value) => this.props.onInput(value),
    });

    const UserListPopup = new UserList('ul', {
      ...props,
    });

    const Close = new Button({
      icon: close,
      attr: {
        type: 'button',
      },
      type: 'ghost',
      onClick: () => {
        this.props.closeSearch();
      },
    });

    super(tag, {
      ...props,
      SearchUser,
      UserListPopup,
      className: styles.popup,
      Close,
    });
  }

  render(): DocumentFragment {
    return (
      this.compile(
        `
          <div class=${styles.close}>{{{Close}}}</div>
          {{{SearchUser}}}

          {{{UserListPopup}}}
        `,
      )
    );
  }
}

export default Popup;
