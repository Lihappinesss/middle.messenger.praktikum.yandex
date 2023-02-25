import Block from '../../modules/Block';

import authController from '../../controllers/Auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import template from './template';
import router from '../../modules/Router';

class Signin extends Block {
  constructor(tag, props: Record<string, any> = {}) {
    const handleSign = (e: MouseEvent) => {
      e.preventDefault();
      const data = {
        email: '',
        password: '',
      };
      document.querySelectorAll('input').forEach((elem) => {
        data[elem.name] = elem.value;
      });
      authController.signIn(data);
    };

    const Login = new Input({
      type: 'text',
      placeholder: 'Логин',
      name: 'login',
    });

    const Pass = new Input({
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
    });

    const ButtonSignin = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Авторизоваться',
      onClick: (e) => {
        handleSign(e);
      },
    });

    const GoSinup = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Нет аккаунта',
      type: 'ghost',
      onClick: (e) => {
        e.preventDefault();
        router.go('/signup');
      },
    });

    super('div', {
      ...props,
      ButtonSignin,
      Login,
      Pass,
      GoSinup,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Signin;
