import { initStrip } from './ledstrip';
import { bounceFunction } from './ledstrip/bounce';
import { RgbColour } from './ledstrip/util';
import { solidFunction } from './ledstrip/solid';

// const express = require('express')
import * as express from 'express';
const webServer = express();
const port = 3000

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

const bounce = bounceFunction(ledCount, colour, 20);
const solid = solidFunction(ledCount, colour);

const interval = setInterval(() => {
  ledStrip.render(bounce());
}, animInterval); // tadaa


webServer.get('/', (req, res) => {
  console.log('got request on port 3000, clearing interval and rendering solid');
  clearInterval(interval);

  ledStrip.render(solid());
  res.send('Hello World!')
});

webServer.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))