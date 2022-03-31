import type { IncomingMessage, ServerResponse } from "http";
import { withHTTPMethod } from "~/helpers/useHTTPAction";

async function onGET(req: IncomingMessage, res: ServerResponse) {
  return {
    success: true,
  };
}

export default withHTTPMethod({ onGET });
