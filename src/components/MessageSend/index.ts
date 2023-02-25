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
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const SendBtn = new Button({
      text: 'Отправить',
      attr: {
        type: 'button',
      },
      onClick: (e: Event) => {
        this.handleSubmit(e);
      },
    });

    super(tag, {
      ...props,
      InputField,
      SendBtn,
      className: styles.form,
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    const form = (e.target as HTMLElement).closest('form');

    const fields = Array.from(form).filter((el) => el.nodeName === 'INPUT');
    const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
      acc[field.name] = field.value;
      return acc;
    }, {});

    if (!formData.message) {
      return;
    }

    this.props.onMessageSend(formData);
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
