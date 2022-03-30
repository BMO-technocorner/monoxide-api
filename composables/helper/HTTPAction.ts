import { isMethod, createError } from "h3";
import type { IncomingMessage, ServerResponse } from "http";

export default class HTTPAction {
  req: IncomingMessage;
  res: ServerResponse;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
  }

  onGET = async (req: IncomingMessage, res: ServerResponse) => {};

  onPOST = async (req: IncomingMessage, res: ServerResponse) => {};

  onPUT = async (req: IncomingMessage, res: ServerResponse) => {};

  onPATCH = async (req: IncomingMessage, res: ServerResponse) => {};

  onDELETE = async (req: IncomingMessage, res: ServerResponse) => {};

  async perform() {
    if (isMethod(this.req, "GET")) return await this.onGET(this.req, this.res);
    throw createError({
      statusCode: 404,
      statusMessage: "",
    });
  }
}
