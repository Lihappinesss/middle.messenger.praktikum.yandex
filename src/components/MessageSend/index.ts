import Block, { TProps } from '../../modules/Block';

import Input from '../Input';
import Button from '../Button';

import validateForm from '../../utils/validateForm';

import styles from './index.module.sass';

class MessageSend extends Block {
  constructor(tag: string, props: TProps) {
    const InputField = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message',
      styleType: 'secondary',
      onValidate:
        (
          element: HTMLInputElement,
        ) => validateForm(element.value, element.name, element),
    });

    const SendBtn = new Button({
      text: 'Отправить',
      attr: {
        type: 'button',
      },
      onClick: (e: Event) => {
        this.props.onMessageSend(e);
      },
    });

    super(tag, {
      ...props,
      InputField,
      SendBtn,
      className: styles.form,
    });
  }

  render(): DocumentFragment {
    return (
      this.compile(
        `
          {{{InputField}}}
          <div class=${styles.btn}>
            {{{SendBtn}}}
          </div>
        `,
      )
    );
  }
}

export default MessageSend;
