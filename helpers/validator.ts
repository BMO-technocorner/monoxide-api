import type { ServerResponse } from "http";
import { createError } from "h3";
import Validator from "fastest-validator";

export class Validation {
  body: any;
  rules: any;
}

export const useValidator = (schema: Partial<Validation>) => {
  if (!schema.rules || schema.rules === "") return;
  if (!schema.body || schema.body === "")
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body can't be empty.",
    });
  const validator = new Validator();
  const check = validator.compile(schema.rules);
  return check(schema.body);
};

export const handleValidation = (res: ServerResponse, validation: any) => {
  res.statusCode = 400;
  return res.end(
    JSON.stringify({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "The given request body data format is not valid.",
      errors: validation,
    })
  );
};
