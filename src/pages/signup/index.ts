import Block from '../../modules/Block';

import authController from '../../controllers/Auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import validateForm from '../../utils/validateForm';

import template from './template';
import router from '../../modules/Router';

class SignUp extends Block {
  constructor(tag, props: Record<string, any> = {}) {
    const handleSubmit = (e: MouseEvent) => {
      e.preventDefault();
      const inputs = document.querySelectorAll('input');
      const formData = Array.from(inputs).reduce((acc: any, field: HTMLInputElement) => {
        acc[field.name] = field.value;
        return acc;
      }, {});

      console.log(formData);

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
        authController.signUp(formData);
      }
    };

    const Email = new Input({
      type: 'email',
      placeholder: 'Почта',
      name: 'email',
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Login = new Input({
      type: 'text',
      placeholder: 'Логин',
      name: 'login',
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Name = new Input({
      type: 'text',
      placeholder: 'Имя',
      name: 'first_name',
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Sername = new Input({
      type: 'text',
      placeholder: 'Фамилия',
      name: 'second_name',
      onValidate:
        (
          element: HTMLInputElement | null,
        ) => validateForm(element.value, element.name, element),
    });

    const Tel = new Input({
      type: 'tel',
      placeholder: 'Телефон',
      name: 'phone',
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

    const ButtonSubmit = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Зарегистрироваться',
      onClick: (event: MouseEvent) => {
        handleSubmit(event);
      },
    });

    const Signin = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Войти',
      onClick: (e) => {
        e.preventDefault();
        router.go('/signin');
      },
    });

    super('div', {
      ...props,
      ButtonSubmit,
      Login,
      Pass,
      Email,
      Name,
      Sername,
      Tel,
      Signin,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default SignUp;
