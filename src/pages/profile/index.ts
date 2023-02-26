import Block, { TProps } from '../../modules/Block';

import userController from '../../controllers/UserController';
import authController from '../../controllers/Auth';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Avatar from '../../components/Avatar';

import validateForm from '../../utils/validateForm';
import connect from '../../hoc/connect';

import template from './template';
import { TStore } from '../../store/types';
import router from '../../modules/Router';

class Profile extends Block {
  constructor(tag: string, props: TProps) {
    const { user = {} } = props || {};
    const nameProfile = user?.first_name;

    const handleSubmit = (e: MouseEvent) => {
      e.preventDefault();
      const inputs = document.querySelectorAll('input');
      const formData = Array.from(inputs).reduce((acc: any, field: HTMLInputElement) => {
        acc[field.name] = field.value;
        return acc;
      }, {});

      userController.updateProfile(formData);
    };

    const Email = new Input({
      type: 'email',
      placeholder: 'Почта',
      name: 'email',
      value: user?.email,
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Login = new Input({
      type: 'text',
      placeholder: 'Логин',
      name: 'login',
      value: user?.login,
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Name = new Input({
      type: 'text',
      placeholder: 'Имя',
      name: 'first_name',
      value: user?.first_name,
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Sername = new Input({
      type: 'text',
      placeholder: 'Фамилия',
      name: 'second_name',
      value: user?.second_name,
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Tel = new Input({
      type: 'tel',
      placeholder: 'Телефон',
      name: 'phone',
      value: user?.phone,
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Pass = new Input({
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const DisplayName = new Input({
      type: 'text',
      placeholder: 'Имя в чате',
      name: 'display_name',
      value: user?.display_name,
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Ava = new Avatar({
      ...props,
      onInput: (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        userController.updateAvatar(formData);
      },
    });

    const ChangeData = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Сохранить',
      onClick: (event) => handleSubmit(event),
    });

    const Exit = new Button({
      attr: {
        type: 'button',
      },
      text: 'Выйти',
      onClick: () => {
        authController.logout();
      },
    });

    const GoChatBtn = new Button({
      attr: {
        type: 'button',
      },
      text: 'К чатам',
      onClick: () => {
        router.go('/messenger');
      },
    });

    super('div', {
      ...props,
      ChangeData,
      Login,
      Pass,
      Email,
      Name,
      Sername,
      Tel,
      Ava,
      nameProfile,
      Exit,
      DisplayName,
      GoChatBtn,
    });
  }

  render(): DocumentFragment {
    return (
      this.compile(template, this.props)
    );
  }
}

function mapUserToProps(state: TStore) {
  return {
    user: state.user,
  };
}

export default connect(Profile, mapUserToProps);
