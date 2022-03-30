import { defineHandle } from 'h3';

const users = defineHandle((req, res) => {
  return "Hello users";
});

export { users as default };
