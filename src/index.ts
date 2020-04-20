import { initStrip } from './ledstrip';
import { bounceFunction } from './ledstrip/bounce';
import { RgbColour } from './ledstrip/util';

const args = process.argv.slice(2);
const colour: RgbColour = {
  red: parseInt(args[0] || '0'),
  green: parseInt(args[1] || '0'),
  blue: parseInt(args[2] || '0'),
}
const ledCount = parseInt(args[3] || '300');
const animInterval = parseInt(args[4] || '150');

const ledStrip = initStrip({
  leds: ledCount,
  strip: 'grb'
});

// const solidColour = () => {
//   const pixels = new Uint32Array(ledCount);
//   const colourInt = rgbToInt(colour);
//   return pixels.map(() => colourInt);
// }

const bounce = bounceFunction(ledCount, colour, 20);

setInterval(() => {
  ledStrip.render(bounce());
}, animInterval); // tadaa

