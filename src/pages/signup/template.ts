import styles from './index.module.sass';

const template = `
  {{{nav}}}
  <div class='wrapper'>
    <h1 class='title'>Регистрация</h1>
    <form class='form'>
      <div class='input'>
        {{{email}}}
      </div>
      <div class='input'>
        {{{login}}}
      </div>
      <div class='input'>
        {{{name}}}
      </div>
      <div class='input'>
        {{{sername}}}
      </div>
      <div class='input'>
        {{{tel}}}
      </div>
      <div class='input'>
        {{{pass}}}
      </div>
      <div class=${styles.btn}>
        {{{button}}}
      </div>
      <a href='/signin' class='link'>Войти</a>
    </form>
  </div>
`;

export default template;
