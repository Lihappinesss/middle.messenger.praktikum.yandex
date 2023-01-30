import Block from '../../modules/Block';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Navigation from '../../components/Navigation';

import template from './template';

class Signin extends Block {
  constructor(props: Record<string, any> = {}) {
    const handleSign = (e: MouseEvent) => {
      e.preventDefault();
      const data = {};
      document.querySelectorAll('input').forEach((elem) => {
        data[elem.name] = elem.value;
      });
      console.log(data);
    };

    const login = new Input({
      type: 'text',
      placeholder: 'Логин',
      name: 'login',
    });

    const pass = new Input({
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
    });

    const button = new Button({
      attr: {
        type: 'submit',
      },
      text: 'Авторизоваться',
      onClick: (e) => {
        handleSign(e);
      },
    });

    const nav = new Navigation();

    super('div', {
      ...props,
      button,
      login,
      pass,
      nav,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Signin;
