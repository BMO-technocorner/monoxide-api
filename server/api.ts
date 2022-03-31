import { apiPath } from "../helpers/useApiPath"; // do not use "~" alias!

export const v1 = apiPath("v1", [
  "devices/sync",
  "devices",
  "reports",
  "users",
]);
