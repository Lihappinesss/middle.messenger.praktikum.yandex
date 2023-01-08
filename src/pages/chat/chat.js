import Handlebars from 'handlebars';

import getDate from '../../utils/getDate';

import clip from '../../images/clip.svg'
import arrow from '../../images/rightArrow.svg';
import more from '../../images/more.svg';

import styles from './index.module.sass';


Handlebars.registerHelper('getDate', function(date) {
  return getDate(date);
});

const chat = () => {
  return(
    `
      <div class=${styles.wrapper}>
        <div class=${styles.sidebar}>
          <input
            type='search'
            placeholder='Поиск'
            class=${styles.inputSearch}
          />
          <div class=${styles.users}>
            {{#each users}}
              <div class=${styles.contact}>
                <div class=${styles.avatar}></div>
                <div class=${styles.userInfo}>
                  <div class=${styles.name}>{{last_message.user.first_name}}</div>
                  <div class=${styles.lastMessage}>{{last_message.content}}</div>
                </div>
                <div class=${styles.messageInfo}>
                  <div class=${styles.time}>{{getDate last_message.time}}</div>
                  <div class=${styles.unread}>{{unread_count}}</div>
                </div>
              </div>
            {{/each}}
          </div>
        </div>
        <div class=${styles.chat}>
          <div class=${styles.shapka}>
            <div class=${styles.companion}>
              <img src='' class=${styles.avatarComp} />
              <div class=${styles.nameComp}>{{companion}}</div>
            </div>
            <button class=${styles.moreBtn}>
              <img src=${more} alt="more" />
            </button>
          </div>
          <div class=${styles.history}>
          {{#each messages}}
            <div class=${styles.message}>
              <div class=${styles.messageTime}>{{getDate time}}</div>
              {{text}}
            </div>
          {{/each}}
          </div>
          <div class=${styles.send}>
            <button type="button" class=${styles.clipBtn}>
              <img src=${clip} class=${styles.clip} />
            </button>
            <input
              type="text"
              placeholder="Сообщение"
              name="message"
              class=${styles.text}
            />
            <button class=${styles.sendBtn}>
              <img src=${arrow} class=${styles.arrow} width='20px' height='10px' />
            </button>
          </div>
        </div>
      </div>
    `
  );
}

export default chat;


