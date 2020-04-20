import * as ws281x from 'rpi-ws281x';

export type RgbColour = {
  red: number;
  green: number;
  blue: number;
}

export const rgbToInt = (colour: RgbColour) => {
  const {
    red,
    green,
    blue,
  } = colour;

  return (red << 16) | (green << 8)| blue;
}

export const initStrip = (options: {}) => {
  // Set default configuration here

  ws281x.configure(options);

  return ws281x;
}
