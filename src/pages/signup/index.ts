import Block from '../../modules/Block';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Navigation from '../../components/Navigation';

import validateForm from '../../utils/validateForm';
import debounce from '../../utils/debounce';

import template from './template';

class SignUp extends Block {
  constructor(props: Record<string, any> = {}) {
    const handleSubmit = (e: MouseEvent) => {
      e.preventDefault();
      const form = document.querySelector('form');
      const fields = Array.from(form).filter((el) => el.nodeName === 'input');
      const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
        acc[field.name] = field.value;
        return acc;
      }, {});

      const isEmailValid = validateForm(formData.email, 'email');
      const isPasswordValid = validateForm(formData.password, 'password');
      const isLoginValid = validateForm(formData.login, 'login');
      const isFirstValid = validateForm(formData.first_name, 'first_name');
      const isSecondValid = validateForm(formData.second_name, 'second_name');
      const isPhoneValid = validateForm(formData.phone, 'phone');

      const isValidField = isEmailValid
      && isPasswordValid
      && isLoginValid
      && isFirstValid
      && isSecondValid
      && isPhoneValid;

      if (isValidField) {
        console.log(formData);
      }
    };

    const email = new Input({
      type: 'email',
      placeholder: 'Почта',
      name: 'email',
      debounce,
      onInput: (value) => console.log(value),
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const login = new Input({
      type: 'text',
      placeholder: 'Логин',
      name: 'login',
      onInput: (value) => console.log(value),
      debounce,
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const name = new Input({
      type: 'text',
      placeholder: 'Имя',
      name: 'first_name',
      debounce,
      onInput: (value) => console.log(value),
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const sername = new Input({
      type: 'text',
      placeholder: 'Фамилия',
      name: 'second_name',
      debounce,
      onInput: (value) => console.log(value),
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const tel = new Input({
      type: 'tel',
      placeholder: 'Телефон',
      name: 'phone',
      debounce,
      onInput: (value) => console.log(value),
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const pass = new Input({
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
      debounce,
      onInput: (value) => console.log(value),
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const button = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Зарегистрироваться',
      onClick: (event: MouseEvent) => {
        handleSubmit(event);
      },
    });

    const nav = new Navigation();

    super('div', {
      ...props,
      button,
      login,
      pass,
      email,
      name,
      sername,
      tel,
      nav,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default SignUp;
