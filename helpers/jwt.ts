import jwt from "jsonwebtoken";

export const useSecret = () => {
  return process.env.JWT_SECRET ?? "";
};

export const useToken = (id: String | Number) => {
  return jwt.sign({ id: String(id) }, useSecret(), {
    expiresIn: useTokenExpiry(),
  });
};

export const useTokenPayloadID = (token: string): string => {
  const payload = jwt.verify(token, useSecret());
  if (typeof payload === "string") return payload;
  return String(payload.id);
};

export const useTokenExpiry = (): string => "360d";
