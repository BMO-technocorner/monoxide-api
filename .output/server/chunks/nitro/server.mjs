import 'unenv/runtime/polyfill/fetch.node';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { createApp, lazyHandle, useBase } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { joinURL, withQuery } from 'ufo';
import defu from 'defu';

const _runtimeConfig = {public:{app:{baseURL:"\u002F",buildAssetsDir:"\u002F_nuxt\u002F",assetsPath:{},cdnURL:null}},private:{}};
for (const type of ["private", "public"]) {
  for (const key in _runtimeConfig[type]) {
    _runtimeConfig[type][key] = destr(process.env[key] || _runtimeConfig[type][key]);
  }
}
const appConfig = _runtimeConfig.public.app;
appConfig.baseURL = process.env.NUXT_APP_BASE_URL || appConfig.baseURL;
appConfig.cdnURL = process.env.NUXT_APP_CDN_URL || appConfig.cdnURL;
appConfig.buildAssetsDir = process.env.NUXT_APP_BUILD_ASSETS_DIR || appConfig.buildAssetsDir;
const privateConfig = deepFreeze(defu(_runtimeConfig.private, _runtimeConfig.public));
const publicConfig = deepFreeze(_runtimeConfig.public);
const config = privateConfig;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

function baseURL() {
  return config.app.baseURL;
}
function buildAssetsDir() {
  return config.app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), config.app.buildAssetsDir, ...path);
}
function publicAssetsURL(...path) {
  const publicBase = config.app.cdnURL || config.app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const cwd = process.cwd();
const hasReqHeader = (req, header, includes) => req.headers[header] && req.headers[header].toLowerCase().includes(includes);
async function handleError(error, req, res) {
  const isJsonRequest = hasReqHeader(req, "accept", "application/json") || hasReqHeader(req, "user-agent", "curl/") || hasReqHeader(req, "user-agent", "httpie/");
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace(".vue", ".js").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const is404 = error.statusCode === 404;
  const errorObject = {
    url: req.url,
    statusCode: error.statusCode || 500,
    statusMessage: error.statusMessage ?? is404 ? "Page Not Found" : "Internal Server Error",
    message: error.message || error.toString(),
    description: ""
  };
  res.statusCode = errorObject.statusCode;
  res.statusMessage = errorObject.statusMessage;
  if (!is404) {
    console.error(error.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest) {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(errorObject));
  }
  const url = withQuery("/_nitro/__error", errorObject);
  const html = await $fetch(url).catch(() => errorObject.statusMessage);
  res.setHeader("Content-Type", "text/html;charset=UTF-8");
  res.end(html);
}

const _b6337e = () => import('./static.mjs');
const _fae216 = () => import('../middleware/users.mjs');
const _fbdb42 = () => import('../middleware/devices.mjs');

const middleware = [
  {
    route: "/",
    handle: _b6337e,
    lazy: true,
    promisify: true
  },
  {
    route: "/api/v1/users",
    handle: _fae216,
    lazy: true,
    promisify: true
  },
  {
    route: "/api/v1/devices",
    handle: _fbdb42,
    lazy: true,
    promisify: true
  },
  {
    route: "/v1/devices",
    handle: _fbdb42,
    lazy: true,
    promisify: true
  },
  {
    route: "/v1/users",
    handle: _fae216,
    lazy: true,
    promisify: true
  }
];

const app = createApp({
  debug: destr(false),
  onError: handleError
});
const renderMiddleware = lazyHandle(() => import('../app/render.mjs').then((e) => e.renderMiddleware));
app.use("/_nitro", renderMiddleware);
app.use(timingMiddleware);
app.use(middleware);
app.use(renderMiddleware);
app.stack;
const handle = useBase(baseURL(), app);
const localCall = createCall(handle);
const localFetch = createFetch(localCall, globalThis.fetch);
const $fetch = createFetch$1({ fetch: localFetch, Headers });
globalThis.$fetch = $fetch;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, handle) : new Server$1(handle);
const port = destr(process.env.NUXT_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NUXT_HOST || process.env.HOST || "localhost";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${baseURL()}`);
});
const server$1 = {};

export { publicConfig as a, buildAssetsURL as b, buildAssetsDir as c, config as d, privateConfig as p, server$1 as s };
