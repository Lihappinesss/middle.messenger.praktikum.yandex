import styles from './index.module.sass';

const error = () => {
  return (
    `
      <div class=${styles.wrapper}>
        <div class=${styles.error}>{{err}}</div>
        <div class=${styles.text}>{{text}}</div>
        <a class=${styles.link} href='/chat'>Назад к чатам</a>
      </div>
    `
  );
}

export default error;
