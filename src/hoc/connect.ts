import Block, { TProps } from '../modules/Block';

import store from '../store';
import { TStore } from '../store/types';

export default function connect(mapStateToProps: (state: TStore) => TStore) {
  return function wrap(Component: typeof Block) {
    let previousState: TStore;

    return class WithStore extends Component {
      constructor(tag: string, props: TProps) {
        previousState = mapStateToProps(store.getState());

        super(tag, { ...props, ...previousState });

        store.on('changed', () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
