import type { CompatibilityEvent } from "h3";
import { defineEventHandler } from "h3";
import { usePrisma } from "~/helpers/prisma";
import HTTPAction from "~/models/HTTPAction";
import HTTPMethod from "~/models/HTTPMethod";

export const useHTTPAction = (event: CompatibilityEvent) => {
  return new HTTPAction(event, usePrisma());
};

export const withHTTPMethod = (method: Partial<HTTPMethod>) => {
  return defineEventHandler(async (event: CompatibilityEvent) => {
    const action = useHTTPAction(event);
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
