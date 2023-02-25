import Block, { TProps } from '../../modules/Block';

import Input from '../Input';

import styles from './index.module.sass';

class Avatar extends Block {
  constructor(props: TProps) {
    const InputAvatar = new Input({
      type: 'file',
      name: 'avatar',
      placeholder: '',
      onInput: (_, e) => {
        const { files }: { files: FileList | null } = e.target as HTMLInputElement;
        if (!files?.length) {
          return;
        }
        const [file] = files;
        this.props.onInput(file);
      },
    });
    super('form', {
      ...props,
      InputAvatar,
    });
  }

  getStateFromProps(props) {
    this.state = {
      ...props,
    };
  }

  render() {
    const path = `https://ya-praktikum.tech/api/v2/resources/${this.props.user?.avatar}`;

    return this.compile(`
      <div class=${styles.avatar}>
        <img src=${path} />
        <label for='avatar' class=${styles.upload} >
          {{{InputAvatar}}}
        </label>
      </div>
  `);
  }
}

export default Avatar;
