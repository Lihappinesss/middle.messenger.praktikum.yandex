import styles from './index.module.sass';

const template = `
  <div class=${styles.wrapper}>
    <div class=${styles.profileImg}>
      <div class=${styles.name}>{{nameProfile}}</div>
      <div class=${styles.avatar}>
        <img src={{avatar}} alt='avatar' class=${styles.img} />
        <input type="file" class=${styles.upload} name='avatar' />
      </div>
    </div>

    <div class=${styles.columns}>
      <div class=${styles.left}>
        <div>Почта</div>
        <div>Имя</div>
        <div>Фамилия</div>
        <div>Телефон</div>
        <div>Имя в чате</div>
        <div>Пароль</div>
      </div>
      <div>
        <div>{{{email}}}</div>
        <div>{{{name}}}</div>
        <div>{{{sername}}}</div>
        <div>{{{tel}}}</div>
        <div>{{{displayName}}}</div>
        <div>{{{pass}}}</div>
      </div>
    </div>

    <div class=${styles.btn}>
      <div class=${styles.change}>{{{changeData}}}</div>
      <div>{{{exit}}}</div>
    </div>
  </div>
`;

export default template;
