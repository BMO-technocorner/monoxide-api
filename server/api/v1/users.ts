import type { IncomingMessage, ServerResponse } from "http";
import { withHTTPMethod } from "../../../composables/useHTTPAction";

async function onGET(req: IncomingMessage, res: ServerResponse) {
  return {
    success: true,
  };
}

export default withHTTPMethod({ onGET });
