import Block from '../modules/Block';

import store from '../store';

export default function connect(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let previousState: any;

    return class WithStore extends Component {
      constructor(tag, props: any) {
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
