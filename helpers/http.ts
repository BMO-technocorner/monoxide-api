import type { IncomingMessage, ServerResponse } from "http";
import { defineHandle } from "h3";
import { usePrisma } from "~/helpers/prisma";
import HTTPAction from "~/models/HTTPAction";
import HTTPMethod from "~/models/HTTPMethod";

export const useHTTPAction = (req: IncomingMessage, res: ServerResponse) => {
  return new HTTPAction(req, res, usePrisma());
};

export const withHTTPMethod = (method: Partial<HTTPMethod>) => {
  return defineHandle(async (req: IncomingMessage, res: ServerResponse) => {
    const action = useHTTPAction(req, res);
    action.onGET = method.onGET ?? null;
    action.onHEAD = method.onHEAD ?? null;
    action.onPOST = method.onPOST ?? null;
    action.onPUT = method.onPUT ?? null;
    action.onDELETE = method.onDELETE ?? null;
    action.onCONNECT = method.onCONNECT ?? null;
    action.onOPTIONS = method.onOPTIONS ?? null;
    action.onTRACE = method.onTRACE ?? null;
    return await action.perform();
  });
};
