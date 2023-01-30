import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';

import EventBus from '../EventBus/index';
import debounce from '../../utils/debounce';

type TProps = Record<string, any>;

class Block {
  private _meta: {
    tagName: string,
    props: TProps
  };

  private _id: string;

  protected _element: HTMLElement;

  private _eventBus: () => EventBus;

  children: Record<string, any>;

  protected readonly props: TProps;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(tagName: string = 'div', propsAndChildren: TProps = {}) {
    const { children, props } = this._getChildren(propsAndChildren);

    const eventBus = new EventBus();

    this.children = children;
    this._eventBus = () => eventBus;
    this._id = uuid();

    this.props = this._makePropsProxy({ ...props, __id: this._id });

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

  init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps?: TProps) {
    console.log(oldProps);
  }

  compile(template?: string, props?: TProps) {
    if (typeof props === 'undefined') {
      props = this.props;
    }

    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

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
    console.log(oldProps, newProps);
    return true;
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

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
    return this._element;
  }

  private _makePropsProxy(props: TProps) {
    const self = this;

    return new Proxy(props, {
      get(target: TProps, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: TProps, prop: string, value: unknown) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self._eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
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
      if (events.debounce) {
        const debouncedHandle = debounce(events[eventName], 500);
        this._element.addEventListener(eventName, debouncedHandle);
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
