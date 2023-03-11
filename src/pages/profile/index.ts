import Block, { TProps } from '../../modules/Block';

import userController from '../../controllers/UserController';
import authController from '../../controllers/Auth';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Avatar from '../../components/Avatar';

import validateForm from '../../utils/validateForm';
import connect from '../../hoc/connect';

import template from './template';
import router from '../../modules/Router';

class ProfilePage extends Block {
  constructor(tag: string, props: TProps) {
    super('div', {
      ...props,
    });
  }

  async init() {
    authController.fetchUser();
    const { user = {} } = this.props || {};
    const nameProfile = user?.first_name;
    this.props.nameProfile = nameProfile;

    this.children.Email = new Input({
      type: 'email',
      placeholder: 'Почта',
      name: 'email',
      onValidate:
        (
          element: HTMLInputElement,
        ) => validateForm(element.value, element.name, element),
    });

    this.children.Login = new Input({
      type: 'text',
      placeholder: 'Логин',
      name: 'login',
      onValidate:
        (
          element: HTMLInputElement,
        ) => validateForm(element.value, element.name, element),
    });

    const handleSubmit = (e: MouseEvent) => {
      e.preventDefault();
      const inputs = document.querySelectorAll('input');
      const formData = Array.from(inputs).reduce((acc: any, field: HTMLInputElement) => {
        acc[field.name] = field.value;
        return acc;
      }, {});

      userController.updateProfile(formData);
    };

    this.children.Name = new Input({
      type: 'text',
      placeholder: 'Имя',
      name: 'first_name',
      onValidate:
        (
          element: HTMLInputElement,
        ) => validateForm(element.value, element.name, element),
    });

    this.children.Sername = new Input({
      type: 'text',
      placeholder: 'Фамилия',
      name: 'second_name',
      onValidate:
        (
          element: HTMLInputElement,
        ) => validateForm(element.value, element.name, element),
    });

    this.children.Tel = new Input({
      type: 'tel',
      placeholder: 'Телефон',
      name: 'phone',
      onValidate:
        (
          element: HTMLInputElement,
        ) => validateForm(element.value, element.name, element),
    });

    this.children.Pass = new Input({
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
      onValidate:
        (
          element: HTMLInputElement,
        ) => validateForm(element.value, element.name, element),
    });

    this.children.DisplayName = new Input({
      type: 'text',
      placeholder: 'Имя в чате',
      name: 'display_name',
      onValidate:
        (
          element: HTMLInputElement,
        ) => validateForm(element.value, element.name, element),
    });

    this.children.Ava = new Avatar({
      ...this.props,
      onInput: (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        userController.updateAvatar(formData);
      },
    });

    this.children.ChangeData = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Сохранить',
      onClick: (event) => handleSubmit(event),
    });

    this.children.Exit = new Button({
      attr: {
        type: 'button',
      },
      text: 'Выйти',
      onClick: () => {
        authController.logout();
      },
    });

    this.children.GoChatBtn = new Button({
      attr: {
        type: 'button',
      },
      text: 'К чатам',
      onClick: () => {
        router.go('/messenger');
      },
    });
  }

  render(): DocumentFragment {
    return (
      this.compile(template, this.props)
    );
  }
}

const withUser = connect((state) => ({ user: state.user }));

const Profile = withUser(ProfilePage);

export default Profile;
