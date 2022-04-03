import type { ServerResponse } from "http";

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
