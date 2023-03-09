import Handlebars from 'handlebars';

import Block, { TProps } from '../../modules/Block';

import getDate from '../../utils/getDate';
import connect from '../../hoc/connect';

import defaultAvatar from '../../images/avatar.jpg';

import styles from './index.module.sass';

Handlebars.registerHelper('getDate', (date) => {
  return getDate(date);
});

class ChatsCard extends Block {
  constructor(tag: string, props: TProps) {
    super(tag, {
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const { target } = e;
          const item = (target as HTMLElement).closest('li') as HTMLLIElement;
          if (item) {
            const id = item.dataset.chatid;
            this.props.onClick(id);
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    Handlebars.registerHelper('getImage', (avatar: string) => {
      const chatAvatar = avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${avatar}`
        : defaultAvatar;
      return chatAvatar;
    });

    return this.compile(
      `
        {{#each chats}}
          <li data-chatid={{id}}>
            <div class=${styles.contact}>
              <img class=${styles.avatar} src={{getImage avatar}}>
              <div class=${styles.userInfo}>
                <div class=${styles.title}>{{title}}</div>
                <div class=${styles.lastMessage}>{{last_message.content}}</div>
              </div>
              <div class=${styles.messageInfo}>
                <div class=${styles.time}>{{getDate last_message.time}}</div>
                <div class=${styles.unread}>{{unread_count}}</div>
              </div>
            </div>
          </li>
        {{/each}}
      `,
    );
  }
}

const withChats = connect((state) => ({ chats: state.chats }));

const Chats = withChats(ChatsCard);

export default Chats;
