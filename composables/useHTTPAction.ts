import { defineHandle } from "h3";
import HTTPAction from "./helper/HTTPAction";
import type { IncomingMessage, ServerResponse } from "http";

export const useHTTPAction = (req: IncomingMessage, res: ServerResponse) => {
  return new HTTPAction(req, res);
};

export const withHTTPMethod = (
  onGET:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null,
  onPOST:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null,
  onPUT:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null,
  onPATCH:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null,
  onDELETE:
    | null
    | ((req: IncomingMessage, res: ServerResponse) => Promise<any>) = null
) => {
  return defineHandle(async (req: IncomingMessage, res: ServerResponse) => {
    const action = useHTTPAction(req, res);
    if (onGET) action.onGET = onGET;
    if (onPOST) action.onPOST = onPOST;
    if (onPUT) action.onPUT = onPUT;
    if (onPATCH) action.onPATCH = onPATCH;
    if (onDELETE) action.onDELETE = onDELETE;
    return await action.perform();
  });
};
