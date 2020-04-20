import { rgbToInt, RgbColour } from './util'

export const solidFunction = (ledCount: number, colour: RgbColour) => (overrideColour?: RgbColour) => {
  const pixels = new Uint32Array(ledCount);
  const colourInt = rgbToInt(overrideColour ? overrideColour : colour);
  return pixels.map(() => colourInt);
}