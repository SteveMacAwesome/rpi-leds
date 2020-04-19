import * as ws281x from 'rpi-ws281x';

type RgbColour = {
  red: number;
  green: number;
  blue: number;
}

const initStrip = (options: {}) => {
  // const ledStrip = new ws281x();
  ws281x.configure(options);

  return ws281x;
}

const rgbToInt = (colour: RgbColour) => {
  const {
    red,
    green,
    blue,
  } = colour;

  return (red << 16) | (green << 8)| blue;
}

const main = (opts: {leds: number, colour: RgbColour}) => {
  const {
    leds = 10,
    colour
  } = opts;

  const ledStrip = initStrip({
    leds,
    strip: 'grb'
  });

  const pixels = new Uint32Array(leds);
  const colourInt = rgbToInt(colour);
  const colourPixels = pixels.map(() => colourInt);

  ledStrip.render(colourPixels);
}

main({
  leds: 300,
  colour: {
    red: 0,
    green: 0,
    blue: 0
  }
});