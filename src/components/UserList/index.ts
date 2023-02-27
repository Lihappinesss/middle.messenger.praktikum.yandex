import Block, { TProps } from '../../modules/Block';

import connect from '../../hoc/connect';

import styles from './index.module.sass';

class UserListComponent extends Block {
  constructor(tag: string, props: TProps) {
    super(tag, {
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const { target } = e;
          const item = (target as HTMLElement).closest('li') as HTMLLIElement;
          if (item) {
            const id = item.dataset.userid;
            this.props.onClick(id);
          }
        },
      },
      className: styles.list,
    });
  }

  render(): DocumentFragment {
    return this.compile(
      `
        {{#each searchUsers}}
          <li data-userid={{id}} class=${styles.item}>
            <div class=${styles.login}>{{login}}</div>
          </li>
        {{/each}}
      `,
    );
  }
}

const withStore = connect((state) => ({
  searchUsers: state.searchUsers,
}));

const UserList = withStore(UserListComponent);

export default UserList;
