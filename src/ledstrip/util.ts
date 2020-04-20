export type RgbColour = {
  red: number;
  green: number;
  blue: number;
};

export const rgbToInt = (colour: RgbColour) => {
  const {
    red,
    green,
    blue,
  } = colour;

  return (red << 16) | (green << 8)| blue;
};

const clamp = (x: number, min: number, max: number) => Math.max(Math.min(x, max), min);
const clampRgb = (x: number) => clamp(Math.round(x), 0, 255);

export const scaleRgb = (colour: RgbColour, scale: number) => ({
  red: clampRgb(colour.red * scale),
  green: clampRgb(colour.green * scale),
  blue: clampRgb(colour.blue * scale)
});
