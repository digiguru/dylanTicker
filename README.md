# dylanTicker

A modern reboot of a tiny retro LED ticker experiment.

The original project moved individual DOM/Raphael lights with jQuery-era timers. Version 2 keeps the dot-matrix look while replacing that architecture with browser-native primitives:

- **Web Component** (`<retro-ticker>`) for framework-agnostic reuse.
- **Canvas** to rasterise the bitmap font only when the message changes.
- **CSS animation** to move the completed message on the compositor — no `setInterval` animation loop.
- **Chunked rendering** so long messages do not create thousands of DOM nodes or one enormous canvas.
- **Zero runtime dependencies.**
- `prefers-reduced-motion`, accessible text, pause-on-hover, direction, speed, pixel size and colour controls.

## Run it

```bash
npm ci
npm run check
npm run build
```

Serve the repository root with any static server, or deploy `dist/` after running the build.

## Use the component

```html
<script type="module" src="/src/retro-ticker.js"></script>

<retro-ticker
  message="HELLO FROM THE FUTURE"
  speed="14"
  direction="left"
  pixel-size="10"
  color="#ff3b30"
  pause-on-hover
></retro-ticker>
```

### JavaScript API

```js
const ticker = document.querySelector('retro-ticker');

ticker.message = 'NEW MESSAGE';
ticker.pause();
ticker.resume();
ticker.toggle();
ticker.setMessages(['FIRST STORY', 'SECOND STORY', 'THIRD STORY']);
```

### Attributes

| Attribute | Default | Purpose |
| --- | --- | --- |
| `message` | element text / blank | Text to scroll. Lowercase is converted to uppercase. |
| `speed` | `14` | Dot-matrix columns per second. |
| `direction` | `left` | `left` or `right`. |
| `pixel-size` | `10` | LED cell size in CSS pixels, clamped to 4–24. |
| `color` | `#ff3b30` | Lit LED colour. |
| `off-color` | `#3a1715` | Unlit LED grid colour. |
| `paused` | absent | Pauses animation when present. |
| `pause-on-hover` | absent | Pauses while the pointer is over the ticker. |

## Why not React?

This is a leaf-level visual component, not an application. A standard custom element gives us a smaller API surface, no framework runtime, and works inside React/Vue/Svelte as easily as plain HTML. Adding a UI framework here would make the demo more modern-looking while making the component less reusable — the wrong trade.

## How the animation works

The bitmap font is converted into columns of lit rows. Those columns are drawn into small canvas chunks. CSS then translates the message from just outside one edge of the ticker to just outside the other using container query units (`cqw`), so the browser can animate the transform without JavaScript touching every frame.

The Git history contains the original jQuery and Raphael implementations if you want to admire the fossils.
