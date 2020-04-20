import { rgbToInt, scaleRgb, RgbColour } from './util';


type Direction = 'up' | 'down';

// Function generates a new array of LEDs each time it's called without needing any
// external state management. It's not pure because the input is always () and the output is
// different every time but idk seems like a good idea now. At least it doesn't have side
// effects, it's more like a function generator
export const bounceFunction = (ledCount: number, colour: RgbColour, width: number) => {
  // Aww yis closures
  let position: number = 0;
  let direction: Direction = 'up';

  return (
    () => {
      const newDirection = position + (width / 2) >= ledCount ? 'down' :
        position <= (-width / 2) ? 'up' :
        direction;

      const newPosition = newDirection === 'up' ? position + 1 : position - 1;

      const pixels = new Uint32Array(ledCount);

      for (let i = Math.max(0, newPosition); i < newPosition + width; i++) {
        const distance = Math.abs(newPosition + (width / 2) - i);
        const scale = distance === 0 ? 1 : (1 / distance);

        pixels[i] = rgbToInt(scaleRgb(colour, scale));
      }

      position = newPosition;
      direction = newDirection;

      return pixels;
    }
  );
}

