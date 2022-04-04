import type { IncomingMessage, ServerResponse } from "http";
import { useQuery } from "h3";

export const matchPath = (path: Array<string>, target: string): boolean => {
  for (let pattern of path) if (target.includes(pattern)) return true;
  return false;
};

export const handleServerError = (res: ServerResponse) => {
  res.statusCode = 500;
  return res.end(
    JSON.stringify({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Unknown error happened. Please try again later.",
    })
  );
};

export const usePaginate = async (req: IncomingMessage) => {
  const param = await useQuery(req);
  let skip = 0;
  let take = 15;
  if (param) {
    if (param.cursor) {
      try {
        skip = parseInt(String(param.skip));
      } catch (e) {}
    }
    if (param.take) {
      try {
        take = parseInt(String(param.take));
      } catch (e) {}
    }
  }
  return { skip, take };
};

export const useIdentifier = async (req: IncomingMessage) => {
  const param = await useQuery(req);
  let id = 0;
  if (param && param.id) {
    try {
      id = parseInt(String(param.skip));
    } catch (e) {}
  }
  return id;
};
