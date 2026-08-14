import './retro-ticker.js';

const ticker = document.querySelector('#ticker');
const form = document.querySelector('#controls');
const message = form.elements.message;
const speed = form.elements.speed;
const direction = form.elements.direction;
const pixelSize = form.elements.pixelSize;
const color = form.elements.color;
const pause = document.querySelector('#pause');
const speedOutput = document.querySelector('#speed-output');
const sizeOutput = document.querySelector('#size-output');

function updateTicker() {
  ticker.message = message.value;
  ticker.setAttribute('speed', speed.value);
  ticker.setAttribute('direction', direction.value);
  ticker.setAttribute('pixel-size', pixelSize.value);
  ticker.setAttribute('color', color.value);
  speedOutput.value = `${speed.value} cols/s`;
  sizeOutput.value = `${pixelSize.value}px`;
}

form.addEventListener('input', updateTicker);
pause.addEventListener('click', () => {
  ticker.toggle();
  pause.textContent = ticker.hasAttribute('paused') ? 'Resume' : 'Pause';
});

updateTicker();
