import { FONT_HEIGHT, chunkColumns, columnsForText } from './font.js';

const CANVAS_CELL = 4;
const MAX_CANVAS_COLUMNS = 2048;

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --ticker-color: #ff3b30;
      --ticker-off-color: #3a1715;
      --ticker-background: #090706;
      --ticker-pixel-size: 10px;
      --ticker-duration: 12s;
      --ticker-distance: 1000px;
      --ticker-start-offset: 0px;
      --ticker-steps: 100;
      display: block;
      contain: content;
    }

    .board {
      position: relative;
      height: calc(var(--ticker-pixel-size) * 8);
      overflow: hidden;
      border: 1px solid color-mix(in srgb, var(--ticker-color) 30%, #333);
      border-radius: 0.55rem;
      background-color: var(--ticker-background);
      background-image: radial-gradient(
        circle at center,
        var(--ticker-off-color) 0 29%,
        transparent 32%
      );
      background-size: var(--ticker-pixel-size) var(--ticker-pixel-size);
      box-shadow:
        inset 0 0 1.5rem #000,
        0 0 1rem color-mix(in srgb, var(--ticker-color) 12%, transparent);
      isolation: isolate;
    }

    .message {
      position: absolute;
      inset-block: 0;
      left: calc(100% + var(--ticker-start-offset));
      display: flex;
      width: max-content;
      height: 100%;
      animation: ticker-scroll var(--ticker-duration) steps(var(--ticker-steps), end) infinite;
      will-change: transform;
      filter: drop-shadow(0 0 calc(var(--ticker-pixel-size) * 0.35) var(--ticker-color));
    }

    canvas {
      display: block;
      flex: none;
      height: 100%;
    }

    :host([direction='right']) .message {
      animation-direction: reverse;
    }

    :host([paused]) .message,
    :host([pause-on-hover]:hover) .message {
      animation-play-state: paused;
    }

    @keyframes ticker-scroll {
      from { transform: translateX(0); }
      to { transform: translateX(calc(var(--ticker-distance) * -1)); }
    }

    @media (prefers-reduced-motion: reduce) {
      .board {
        overflow-x: auto;
      }

      .message {
        position: relative;
        left: 0;
        animation: none;
        transform: none;
      }
    }
  </style>
  <div class="board" part="board">
    <div class="message" part="message" aria-hidden="true"></div>
  </div>
`;

export class RetroTicker extends HTMLElement {
  static observedAttributes = [
    'message',
    'speed',
    'direction',
    'pixel-size',
    'color',
    'off-color',
  ];

  #messageElement;
  #boardElement;
  #columns = [[]];
  #resizeObserver;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
    this.#messageElement = this.shadowRoot.querySelector('.message');
    this.#boardElement = this.shadowRoot.querySelector('.board');
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'img');
    this.#resizeObserver = new ResizeObserver(() => this.#updateDuration());
    this.#resizeObserver.observe(this.#boardElement);
    this.render();
  }

  disconnectedCallback() {
    this.#resizeObserver?.disconnect();
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this.render();
  }

  get message() {
    return this.getAttribute('message') ?? this.textContent?.trim() ?? '';
  }

  set message(value) {
    this.setAttribute('message', value);
  }

  get speed() {
    const speed = Number(this.getAttribute('speed') ?? 14);
    return Number.isFinite(speed) && speed > 0 ? speed : 14;
  }

  get pixelSize() {
    const size = Number(this.getAttribute('pixel-size') ?? 10);
    return Number.isFinite(size) ? Math.min(24, Math.max(4, size)) : 10;
  }

  pause() {
    this.setAttribute('paused', '');
  }

  resume() {
    this.removeAttribute('paused');
  }

  toggle() {
    this.hasAttribute('paused') ? this.resume() : this.pause();
  }

  setMessages(messages, separator = '   •   ') {
    this.message = [...messages].join(separator);
  }

  render() {
    const message = this.message || ' ';
    const color = this.getAttribute('color') || '#ff3b30';
    const offColor = this.getAttribute('off-color') || '#3a1715';

    this.setAttribute('aria-label', message);
    this.style.setProperty('--ticker-color', color);
    this.style.setProperty('--ticker-off-color', offColor);
    this.style.setProperty('--ticker-pixel-size', `${this.pixelSize}px`);

    this.#columns = columnsForText(message);
    this.#messageElement.replaceChildren(
      ...chunkColumns(this.#columns, MAX_CANVAS_COLUMNS).map((chunk) =>
        this.#renderChunk(chunk, color),
      ),
    );

    this.#updateDuration();
  }

  #renderChunk(columns, color) {
    const canvas = document.createElement('canvas');
    canvas.width = columns.length * CANVAS_CELL;
    canvas.height = FONT_HEIGHT * CANVAS_CELL;
    canvas.style.width = `${columns.length * this.pixelSize}px`;

    const context = canvas.getContext('2d');
    context.fillStyle = color;

    for (let column = 0; column < columns.length; column += 1) {
      for (const row of columns[column]) {
        const x = column * CANVAS_CELL + CANVAS_CELL / 2;
        const y = row * CANVAS_CELL + CANVAS_CELL / 2;
        context.beginPath();
        context.arc(x, y, CANVAS_CELL * 0.34, 0, Math.PI * 2);
        context.fill();
      }
    }

    return canvas;
  }

  #updateDuration() {
    const boardWidth = this.#boardElement.clientWidth;
    const remainder = boardWidth % this.pixelSize;
    const startOffset = remainder === 0 ? 0 : this.pixelSize - remainder;
    const visibleColumns = Math.ceil(boardWidth / this.pixelSize);
    const steps = this.#columns.length + visibleColumns;
    const duration = Math.max(2, steps / this.speed);
    const distance = steps * this.pixelSize;

    this.style.setProperty('--ticker-start-offset', `${startOffset}px`);
    this.style.setProperty('--ticker-distance', `${distance}px`);
    this.style.setProperty('--ticker-steps', String(steps));
    this.style.setProperty('--ticker-duration', `${duration.toFixed(2)}s`);
  }
}

if (!customElements.get('retro-ticker')) {
  customElements.define('retro-ticker', RetroTicker);
}
