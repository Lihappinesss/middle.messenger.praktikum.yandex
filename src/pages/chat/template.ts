import Handlebars from 'handlebars';
import { TProps } from '../../modules/Block';
import { User } from '../../store/types';
import getDate from '../../utils/getDate';

import styles from './index.module.sass';

Handlebars.registerHelper('getDate', (date) => {
  return getDate(date);
});

const template = (props: TProps) => {
  Handlebars.registerHelper('getLogin', (id: number) => {
    const messageUser = props.chatUsers.find((user: User) => user.id === id);
    return messageUser.login;
  });

  Handlebars.registerHelper('checkId', (value) => {
    return value === props.user.id;
  });

  Handlebars.registerHelper('showUserAffect', () => {
    if (props.showUserAffect) {
      return true;
    }
    return false;
  });

  Handlebars.registerHelper('showSearchUser', () => {
    if (props.showSearchUser) {
      return true;
    }
    return false;
  });

  const content = (
    `
      <div>{{getLogin user_id}}</div>
      <div class=${styles.messageTime}>{{getDate time}}</div>
      {{content}}
    `
  );

  return `
    <div class=${styles.wrapper}>
      <div class=${styles.sidebar}>
        <div class=${styles.top}>
          {{{GoProfileBtn}}}

          {{{SearchChat}}}

          <div class=${styles.chats}>
            {{{ChatsCard}}}
          </div>
        </div>

        <div>
          <div class=${styles.newChat}>{{{NewChatInput}}}</div>
          {{{CreateNewChatBtn}}}
        </div>
      </div>

      <div class=${styles.chat}>
        <div class=${styles.shapka}>
          <div class=${styles.companion}>
            <div class=${styles.users}>
              {{#each chatUsers}}
                {{login}}
              {{/each}}
            </div>
          </div>
          {{{MoreBtn}}}
        </div>

        <div class=${styles.history}>
          {{#if (showUserAffect) }}
            {{{UserAffectList}}}
          {{/if}}

          {{#if (showSearchUser) }}
            {{{PopupChat}}}
          {{/if}}

          {{#each messages}}
            {{#if (checkId user_id)}}
              <div class=${styles.owner}>
                <div class=${styles.message}>
                  ${content}
                </div>
              </div>
            {{else}}
              <div class=${styles.message}>
                ${content}
              </div>
            {{/if}}
          {{/each}}
        </div>

        <div class=${styles.send}>
        {{{Send}}}
        </div>
      </div>
    </div>
    `;
};

export default template;
