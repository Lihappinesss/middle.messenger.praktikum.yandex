import styles from './index.module.sass';

const template = `
  {{{nav}}}
  <div class='wrapper'>
    <h1 class='title'>Регистрация</h1>
    <form class='form'>
      <div class='input'>
        {{{Email}}}
      </div>
      <div class='input'>
        {{{Login}}}
      </div>
      <div class='input'>
        {{{Name}}}
      </div>
      <div class='input'>
        {{{Sername}}}
      </div>
      <div class='input'>
        {{{Tel}}}
      </div>
      <div class='input'>
        {{{Pass}}}
      </div>
      <div class=${styles.btn}>
        {{{ButtonSubmit}}}
      </div>
      {{{Signin}}}
    </form>
  </div>
`;

export default template;
