import { initStrip } from './ledstrip';
import { bounceFunction } from './ledstrip/bounce';
import { RgbColour } from './ledstrip/util';
import { solidFunction } from './ledstrip/solid';

import * as express from 'express';

const webServer = express();

const args = process.argv.slice(2);
const colour: RgbColour = {
  red: parseInt(args[0] || '255'),
  green: parseInt(args[1] || '0'),
  blue: parseInt(args[2] || '119'),
}
const ledCount = parseInt(args[3] || '120');
const animInterval = parseInt(args[4] || '50');

const ledStrip = initStrip({
  leds: ledCount,
  strip: 'grb'
});

const bounce = bounceFunction(ledCount, colour, 10);
const solid = solidFunction(ledCount, {red: 0, green: 0, blue: 0});

let interval;

const startBounce = () => {
  return setInterval(() => {
    ledStrip.render(bounce());
  }, animInterval); // tadaa
}

const port = 3000;

webServer
  .use(express.json())
  .get('/', (req, res) => {
    console.log('Received GET request, restarting animation\n');
    if (interval) {
      clearInterval(interval);
    }

    interval = startBounce();
    res.send('Restarted bounce animation\n').status(200).end();
  })
  .post('/', function (req, res) {
    console.log('Received POST request:', req.body);

    if (interval) {
      clearInterval(interval);
    }

    const {
      red = 128,
      green = 120,
      blue = 100
    } = req.body;

    ledStrip.render(solid({red, green, blue}));

    res.send(`Displaying #${red.toString(16)}${green.toString(16)}${blue.toString(16)}\n`).status(200).end();
  })
  .listen(port, () => console.log(`Webserver listening on http://localhost:${port}`));