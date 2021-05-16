// extends from https://github.com/kwhitley/itty-router/blob/v2.x/src/itty-router.js

import pathToRegexp from "./path-to-regexp";

interface Options {
  base?: string;
}
type Route = [regexp: RegExp, handlers: Handler[], method: string];

export interface ExtendsRequest extends Request {
  proxy?: ExtendsRequest;
  params?: Record<string, string>;
  query?: Record<string, string>;
}

interface Handler {
  (request: ExtendsRequest, ...args: any[]): Promise<Response>;
}

interface Router {
  handle(request: ExtendsRequest, ...args: any[]): void;
  get(route: string, ...handlers: Handler[]): void;
  head(route: string, ...handlers: Handler[]): void;
  post(route: string, ...handlers: Handler[]): void;
  patch(route: string, ...handlers: Handler[]): void;
  put(route: string, ...handlers: Handler[]): void;
  delete(route: string, ...handlers: Handler[]): void;
  all(route: string, ...handlers: Handler[]): void;
}
/**
 * @example
 * const router = Router() // note the lack of "new"
 *
 * // GET collection index
 * router.get('/todos', () => new Response('Todos Index!'))
 *
 * // GET item
 * router.get('/todos/:id', ({ params }) => new Response(`Todo #${params.id}`))
 *
 * // POST to the collection (we'll use async here)
 * router.post('/todos', async request => {
 *   const content = await request.json()
 *   return new Response('Creating Todo: ' + JSON.stringify(content))
 * })
 */
const Router = (options: Options = {}) => {
  const _base = options.base || "";
  const _routes: Route[] = [];

  return new Proxy(options, {
    get: (_, prop) =>
      prop === "handle"
        ? async (request: ExtendsRequest, ...args: any[]) => {
            const routes = _routes.filter(
              ([_regexp, _handlers, method]) =>
                method === request.method || method === "ALL"
            );
            for (let [regexp, handlers] of routes) {
              const url = new URL(request.url);
              const match = url.pathname.match(regexp);
              if (!match) continue;

              request.params = match.groups;
              request.query =
                request.query || Object.fromEntries(url.searchParams.entries());

              for (let handler of handlers) {
                const req = request.proxy || request;
                const res = await handler(req, ...args);
                if (typeof res !== "undefined") return res;
              }
            }
          }
        : (route: string, ...handlers: Handler[]) =>
            _routes.push([
              pathToRegexp(_base + route),
              handlers,
              prop.toString().toUpperCase(),
            ]),
  }) as Router;
};

export default Router;
