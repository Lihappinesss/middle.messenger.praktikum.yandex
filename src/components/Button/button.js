import styles from './index.module.sass';

const button = () => {
  return (
    `<button type="{{type}}" class=${styles.btn}>{{text}}</button>`
  );
}

export default button;
