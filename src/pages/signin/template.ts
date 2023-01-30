import styles from './index.module.sass';

const template = `
  {{{nav}}}
  <div class='wrapper'>
    <h1 class='title'>Вход</h1>
    <form class='form'>
      <div class='input'>
        {{{login}}}
      </div>
      <div>
        {{{pass}}}
      </div>
      <div class=${styles.btn}>
        {{{button}}}
      </div>
      <a href='/signup' class='link'>Нет аккаунта?</a>
    </form>
  </div>
`;

export default template;
