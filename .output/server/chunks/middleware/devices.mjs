import { defineHandle } from 'h3';

const devices = defineHandle((req, res) => {
  throw new Error("Device error!");
});

export { devices as default };
