import { RgbColour, rgbToInt } from './util'

export const solidFunction = (ledCount: number, colour: RgbColour) => () => {
  const pixels = new Uint32Array(ledCount);
  const colourInt = rgbToInt(colour);
  return pixels.map(() => colourInt);
}