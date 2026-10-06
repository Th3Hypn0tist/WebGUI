# WebGUI

WebGUI is a standalone, concept-free, minimalist DOM library for structural rendering.

It provides DOM construction, controls, structural composition, mounting and instance-owned theme selection. It does not contain application concepts, application state management, integration with another framework or host-specific adapters.

```js
import { WebGUI } from './WebGUI/webgui.js';

const gui = new WebGUI({ theme: 'default' });
document.body.append(gui.stack([
  gui.field('Name', gui.input({ name: 'name' })),
  gui.button('Save')
]));
```

Built-in themes are addressed by name and always remain in `themes/`:

```js
new WebGUI({ theme: 'default' });
```

A consuming project may keep its own theme anywhere and pass only its path or URL:

```js
new WebGUI({ theme: '/assets/themes/project.css' });
new WebGUI({ theme: new URL('./project.css', import.meta.url) });
```

The root contains one JavaScript entry point, `webgui.js`. It assembles all internal dependencies. See `Contracts/` for the binding rules.


## Presentation contract

WebGUI owns the semantic meaning of the shared generic UI namespace:

```text
.wg-*
```

Current public classes:

```text
.wg-button
.wg-input
.wg-select
.wg-field
.wg-label
.wg-panel
.wg-row
.wg-stack
.wg-table
.wg-badge
.wg-status
```

These names describe generic, domain-neutral UI semantics. They do not encode visual appearance or host-application meaning.

Preferred state carriers are:

```text
data-state
data-status
data-variant
aria-current
native disabled state
data-disabled
```

Native controls use native disabled semantics. `data-disabled` is reserved for non-native composite structures and must not replace the native `disabled` attribute.

WebGUI owns the semantics. Style owns the visual implementation. WebEngine keeps its separate `.we-*` application/composition namespace.

The current runtime still emits `data-ui` markers for several helpers; aligning runtime emission with the canonical `.wg-*` contract is a later implementation task, not part of this contract-only step.
