import Block from '../../modules/Block';

import Input from '../../components/Input';

import data from '../../data/chats.json';
import messages from '../../data/messages.json';

import validateForm from '../../utils/validateForm';

import template from './template';
import styles from './index.module.sass';

class Chat extends Block {
  constructor(props: Record<string, any> = {}) {
    const inputField = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message',
      onInput: (value) => console.log(value),
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    super('div', {
      ...props,
      chat: {
        users: data,
        messages,
        companion: 'Павел',
        inputField,
      },
      className: styles.wrapper,
    });
  }

  render(): DocumentFragment {
    return (
      this.compile(template)
    );
  }
}

export default Chat;
