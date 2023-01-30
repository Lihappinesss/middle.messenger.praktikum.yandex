import Block from '../../modules/Block';

import { TInput } from './types';

import styles from './index.module.sass';

class Input extends Block {
  constructor(props: TInput) {
    super('div', {
      ...props,
      events: {
        blur: () => this.validateForm(),
        focus: () => this.validateForm(),
        debounce: props.debounce,
        input: (e: InputEvent) => {
          if (this.props.onInput) {
            this.props.onInput((e.target as HTMLInputElement).value);
            this.validateForm();
          }
        },
      },
      className: styles.wrapper,
    });
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    if (this.props.onValidate) {
      const inputElement: HTMLInputElement | null = this.getContent().querySelector('input');
      this.props.onValidate(inputElement);
    }
  }

  render(): DocumentFragment {
    return this.compile(
      `
        <input
          class=${styles.input}
          type="{{type}}"
          placeholder="{{placeholder}}"
          name="{{name}}"
          autocomplete="off"
        />
        <label for="{{name}}" class=${styles.label}>{{placeholder}}</label>
        <div class='error'></div>
      `,
      this.props,
    );
  }
}

export default Input;
