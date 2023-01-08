import styles from './index.module.sass';

const input = () => {
  return (
    `
      <div class=${styles.wrapper}>
        <input
          class=${styles.input}
          type="{{type}}"
          placeholder="{{placeholder}}"
          value="{{value}}"
          name="{{name}}"
        />
        <label for="{{name}}" class=${styles.label}>{{placeholder}}</label>
      </div>
    `
  );
};

export default input;
