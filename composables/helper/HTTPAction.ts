import { isMethod, createError } from "h3";
import type { IncomingMessage, ServerResponse } from "http";

export default class HTTPAction {
  req: IncomingMessage;
  res: ServerResponse;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
  }

  onGET: null | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) =
    null;

  onHEAD: null | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) =
    null;

  onPOST: null | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) =
    null;

  onPUT: null | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) =
    null;

  onDELETE:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null;

  onCONNECT:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null;

  onOPTIONS:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null;

  onTRACE:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null;

  async perform() {
    if (this.onGET && isMethod(this.req, "GET"))
      return await this.onGET(this.req, this.res);
    if (this.onHEAD && isMethod(this.req, "HEAD"))
      return await this.onHEAD(this.req, this.res);
    if (this.onPOST && isMethod(this.req, "POST"))
      return await this.onPOST(this.req, this.res);
    if (this.onPUT && isMethod(this.req, "PUT"))
      return await this.onPUT(this.req, this.res);
    if (this.onDELETE && isMethod(this.req, "DELETE"))
      return await this.onDELETE(this.req, this.res);
    if (this.onCONNECT && isMethod(this.req, "CONNECT"))
      return await this.onCONNECT(this.req, this.res);
    if (this.onOPTIONS && isMethod(this.req, "OPTIONS"))
      return await this.onOPTIONS(this.req, this.res);
    if (this.onTRACE && isMethod(this.req, "TRACE"))
      return await this.onTRACE(this.req, this.res);
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }
}
