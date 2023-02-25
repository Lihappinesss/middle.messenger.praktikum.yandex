import styles from './index.module.sass';

const template = `
  <div class='wrapper'>
    <h1 class='title'>Вход</h1>
    <form class='form'>
      <div class='input'>
        {{{Login}}}
      </div>
      <div>
        {{{Pass}}}
      </div>
      <div class=${styles.btn}>
        {{{ButtonSignin}}}
      </div>
     {{{GoSinup}}}
    </form>
  </div>
`;

export default template;
