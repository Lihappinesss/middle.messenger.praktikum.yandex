import Block, { TProps } from '../../modules/Block';

import Button from '../Button';

import styles from './index.module.sass';

class UserAffect extends Block {
  constructor(tag: string, props: TProps) {
    const ButtonAddUser = new Button({
      text: 'Добавить пользователя',
      attr: {
        type: 'button',
      },
      type: 'ghost',
      onClick: () => this.props.addUser(),
    });

    const ButtonDeleteUser = new Button({
      text: 'Удалить пользователей',
      attr: {
        type: 'button',
      },
      type: 'ghost',
      onClick: () => this.props.deleteUser(),
    });

    const ButtonDeleteChat = new Button({
      text: 'Удалить чат',
      attr: {
        type: 'button',
      },
      type: 'ghost',
      onClick: () => this.props.deleteChat(),
    });

    super(tag, {
      ...props,
      ButtonAddUser,
      ButtonDeleteUser,
      ButtonDeleteChat,
      className: styles.wrapper,
    });
  }

  render(): DocumentFragment {
    return (
      this.compile(
        `
          <li class=${styles.list}>{{{ButtonAddUser}}}</li>
          <li class=${styles.list}>{{{ButtonDeleteUser}}}</li>
          <li class=${styles.list}>{{{ButtonDeleteChat}}}</li>
        `,
      )
    );
  }
}

export default UserAffect;
