import type { IncomingMessage, ServerResponse } from "http";

export default class HTTPMethod {
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
}
