import styles from './index.module.sass';

const template = `
  <ul class=${styles.items}>
    <li><a href='/signin'>Войти</a></li>
    <li><a href='/signup'>Зарегестрироваться</a></li>
    <li><a href='/chat'>К чатам</a></li>
    <li><a href='/profile'>Профиль</a></li>
  </ul>
`;

export default template;
