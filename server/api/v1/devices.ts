import type { IncomingMessage, ServerResponse } from "http";
import { withHTTPMethod } from "~/helpers/useHTTPAction";
import { usePrisma } from "~/helpers/usePrisma";

const prisma = usePrisma();

async function onGET(req: IncomingMessage, res: ServerResponse) {
  return await prisma.device.findMany({
    take: 10,
  });
}

export default withHTTPMethod({ onGET });
