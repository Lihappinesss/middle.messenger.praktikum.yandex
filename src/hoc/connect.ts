import Block from '../modules/Block';

import store from '../store';

export default function connect(Component: typeof Block, mapStateToProps) {
  return class extends Component {
    constructor(tag: string, props = {}) {
      super(tag, { ...props, ...mapStateToProps(store.getState()) });

      store.on('changed', () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
