import Block from '../Block';
import Route from './route';

class Router {
  private routes: Route[] = [];

  private _currentRoute: Route | null;

  history = window.history;

  private _rootQuery: string;

  private static __instance: Router;

  private _pathnames: string[];

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._pathnames = [];

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);
    this._pathnames.push(pathname);

    return this;
  }

  start() {
    window.onpopstate = () => {
      const pathname = this._hasRoute(window.location.pathname);
      this._onRoute(pathname);
    };

    const pathname = this._hasRoute(window.location.pathname);
    this._onRoute(pathname);
  }

  private _hasRoute(pathname: string) {
    if (!this._pathnames.includes(pathname)) {
      return '*';
    }
    return pathname;
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      route = this.getRoute('/notFound');
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route as Route;

    route?.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
