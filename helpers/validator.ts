import type { CompatibilityEvent } from "h3";
import Validator from "fastest-validator";

export class Validation {
  body: any;
  rules: any;
}

export const useValidator = (schema: Partial<Validation>) => {
  if (!schema.rules || schema.rules === "") return;
  if (!schema.body || schema.body === "") return "Request body can't be empty.";
  const validator = new Validator();
  const check = validator.compile(schema.rules);
  return check(schema.body);
};

export const handleValidation = (
  event: CompatibilityEvent,
  validation: any
) => {
  event.res.statusCode = 400;
  return event.res.end(
    JSON.stringify({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "The given request body data format is not valid.",
      errors: validation,
    })
  );
};
