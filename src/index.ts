import { initStrip, RgbColour, rgbToInt } from './ledstrip';

const args = process.argv.slice(2);
const leds = parseInt(args[3] || '300');
const colour: RgbColour = {
  red: parseInt(args[0] || '0'),
  green: parseInt(args[1] || '0'),
  blue: parseInt(args[2] || '0'),
}

const ledStrip = initStrip({
  leds,
  strip: 'grb'
});

const pixels = new Uint32Array(leds);
const colourInt = rgbToInt(colour);
const colourPixels = pixels.map(() => colourInt);

ledStrip.render(colourPixels);
