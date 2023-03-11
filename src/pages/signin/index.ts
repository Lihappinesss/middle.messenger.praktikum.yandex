import Block, { TProps } from '../../modules/Block';

import authController from '../../controllers/Auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import template from './template';
import router from '../../modules/Router';

// Todo вывести ошибку, если неверный пароль или логин
class Signin extends Block {
  constructor(tag: string, props: TProps) {
    const handleSign = (e: MouseEvent) => {
      e.preventDefault();

      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');

      const inputsArray = Array.from(inputs) as HTMLInputElement[];

      const formData = inputsArray.reduce((acc: any, field: HTMLInputElement) => {
        acc[field.name] = field.value;
        return acc;
      }, {});

      authController.signIn(formData);
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
        router.go('/sign-up');
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
