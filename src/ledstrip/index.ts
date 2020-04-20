import * as ws281x from 'rpi-ws281x';

export const initStrip = (options: {}) => {
  // Set default configuration here

  ws281x.configure(options);

  return ws281x;
};
