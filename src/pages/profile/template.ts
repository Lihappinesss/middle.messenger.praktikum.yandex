import styles from './index.module.sass';

const template = `
  <div class=${styles.wrapper}>
    <div class=${styles.profileImg}>
      <div class=${styles.name}>{{nameProfile}}</div>
      {{{Ava}}}
    </div>

    <div class=${styles.columns}>
      <div class=${styles.left}>
        <div>Почта</div>
        <div>Логин</div>
        <div>Имя</div>
        <div>Фамилия</div>
        <div>Телефон</div>
        <div>Имя в чате</div>
        <div>Пароль</div>
      </div>
      <form>
        {{{Email}}}
        {{{Login}}}
        {{{Name}}}
        {{{Sername}}}
        {{{Tel}}}
        {{{DisplayName}}}
        {{{Pass}}}
      </form>
    </div>

    <div class=${styles.btn}>
      <div class=${styles.change}>{{{ChangeData}}}</div>
      <div class=${styles.change}>{{{Exit}}}</div>
      {{{GoChatBtn}}}
    </div>
  </div>
`;

export default template;
