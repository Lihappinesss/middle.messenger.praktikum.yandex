import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';

import EventBus from '../EventBus/index';

import debounce from '../../utils/debounce';

export type TProps = Record<string, any>;

class Block {
  private _meta: {
    tagName: string,
    props: TProps
  };

  private _id: string;

  protected _element: HTMLElement;

  private _eventBus: () => EventBus;

  private _setUpdate: boolean = false;

  children: Record<string, any>;

  protected readonly props: TProps;

  protected state: any = {};

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(tagName: string = 'div', propsAndChildren: TProps = {}) {
    const { children, props } = this._getChildren(propsAndChildren);

    const eventBus = new EventBus();

    this.children = this._makePropsProxy(children);
    this._eventBus = () => eventBus;
    this._id = uuid();
    this.getStateFromProps(props);

    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this.state = this._makePropsProxy(this.state);

    this._meta = {
      tagName,
      props,
    };

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getStateFromProps(props: any): void {
    this.state = {};
  }

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props) {
    this.componentDidMount(props);

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(props) {
  }

  compile(layout: string, props?: TProps) {
    if (typeof props === 'undefined') {
      props = this.props;
    }
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    const template = Handlebars.compile(layout);
    fragment.innerHTML = template({
      ...propsAndStubs,
    });

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);

    if (Object.keys(this.children).length) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return oldProps !== newProps;
  }

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._addEvents();
    this._addAttribute();
    this._addClassName();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this._element?.parentNode?.nodeType) {
      setTimeout(() => {
        if (this._element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this._eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this._element!;
  }

  setProps(newProps: TProps) {
    if (!newProps) {
      return;
    }

    this._setUpdate = false;
    const oldValue = { ...this.props };

    const { children, props } = this._getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (this._setUpdate) {
      this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
      this._setUpdate = false;
    }
  }

  private _makePropsProxy(props) {
    return new Proxy(props, {
      get(target: TProps, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set: (target, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);

    element.setAttribute('data-id', this._id);
    return element;
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if ((this._element.firstElementChild?.nodeName === 'INPUT')) {
        this._element.firstElementChild.addEventListener(eventName, debounce(events[eventName]));
      } else if (this._element.nodeName === 'UL') {
        const childs = this._element.children;
        for (let i = 0; i < childs.length; i += 1) {
          childs[i].addEventListener(eventName, events[eventName]);
        }
      } else {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _addClassName() {
    const { className = '' } = this.props;

    if (className !== '') {
      this._element.classList.add(className);
    }
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  private _addAttribute() {
    const { attr = {} } = this.props;
    let point: [string, string];

    Object.entries((attr)).forEach(
      ([key, value]: typeof point) => this._element.setAttribute(key, value),
    );
  }

  private _getChildren(propsAndChildren: TProps) {
    const children:Record<string, Block> = {};
    const props: Record<string, unknown> = {};

    Object.keys(propsAndChildren).forEach((key) => {
      if (propsAndChildren[key] instanceof Block) {
        children[key] = propsAndChildren[key];
      } else {
        props[key] = propsAndChildren[key];
      }
    });

    return { children, props };
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;
