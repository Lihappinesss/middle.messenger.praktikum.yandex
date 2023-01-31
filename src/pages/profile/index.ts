import Block from '../../modules/Block';

import Button from '../../components/Button';
import Input from '../../components/Input';

import validateForm from '../../utils/validateForm';

import avatar from '../../images/avatar.jpg';

import template from './template';

class Profile extends Block {
  constructor(props: Record<string, any> = {}) {
    const nameProfile = 'name';
    const email = new Input({
      type: 'email',
      placeholder: 'Почта',
      name: 'email',
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
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const name = new Input({
      type: 'text',
      placeholder: 'Имя',
      name: 'first_name',
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
      onInput: (value) => console.log(value),
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const displayName = new Input({
      type: 'text',
      placeholder: 'Имя в чате',
      name: 'display_name',
      onInput: (value) => console.log(value),
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const changeData = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Сохранить',
    });

    const exit = new Button({
      attr: {
        type: 'button',
      },
      text: 'Выйти',
    });

    super('form', {
      ...props,
      changeData,
      login,
      pass,
      email,
      name,
      sername,
      tel,
      avatar,
      nameProfile,
      exit,
      displayName,
    });
  }

  render(): DocumentFragment {
    return (
      this.compile(template)
    );
  }
}

export default Profile;
