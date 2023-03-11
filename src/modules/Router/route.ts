import Block, { TProps } from '../Block';

import isEqual from '../../utils/equal';

class Route {
  private _pathname: string;

  private _blockClass: typeof Block;

  private _block: Block | null;

  private _props: TProps;

  constructor(pathname: string, view: typeof Block, props: TProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname:string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass('div', this._props);
      const root = document.querySelector(this._props.rootQuery);
      if (!root) {
        throw new Error('Root not found');
      }
      root.appendChild(this._block.getContent());

      return;
    }

    this._block.show();
  }
}

export default Route;
