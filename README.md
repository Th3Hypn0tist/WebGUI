# WebGUI

Standalone, concept-free DOM/UI primitive framework.

## Canonical responsibility split

```text
IAM        = who
AccessCore = authority / may
DWH        = where / what relates to what
WebEngine  = execute the declared web structure
WebGUI     = generic UI primitives
S3D        = spatial / 3D primitives
```

WebGUI owns only the generic UI primitive layer.

## Role

```text
DWH declarations
      ↓
 WebEngine
      ↓
   WebGUI
      ↓
 DOM / UI
```

WebGUI does not know why a control exists, who is using it, whether the user is authorized, where canonical data lives, or which domain behavior a control triggers.

It provides reusable primitives for structural browser UI.

## Dependency boundary

```text
WebEngine -> WebGUI
WebGUI -/-> WebEngine
WebGUI -/-> DWH
WebGUI -/-> IAM
WebGUI -/-> AccessCore
```

WebGUI must remain independently usable outside AIGM.fi and outside WebEngine.

## Public entry point

```text
webgui.js
```

Example:

```js
import { WebGUI } from './webgui.js';

const gui = new WebGUI({ theme: 'default' });
document.body.append(gui.stack([
  gui.field('Name', gui.input({ name: 'name' })),
  gui.button('Save')
]));
```

## Generic presentation semantics

WebGUI owns the `.wg-*` namespace.

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

These names describe generic UI semantics, never application/domain meaning or visual appearance.

Preferred state carriers:

```text
data-state
data-status
data-variant
aria-current
native disabled state
data-disabled
```

Native controls use native disabled semantics. `data-disabled` is reserved for non-native composite structures.

## Styling boundary

WebGUI owns generic UI semantics. Style/theme layers own visual implementation.

Built-in themes may be selected by instance configuration. A consumer may also provide its own theme path/URL.

## Architectural invariants

1. WebGUI is generic and host-independent.
2. WebGUI does not consume DWH symbols or canonical relations.
3. WebGUI does not authenticate or authorize.
4. WebGUI does not own WebEngine page/composition state.
5. WebGUI does not own S3D spatial semantics.
6. `.wg-*` contains only generic UI semantics.
7. Visual appearance is not encoded into semantic primitive names.
8. Consumer/domain behavior remains outside WebGUI.

See `Contracts/` for machine-readable framework and presentation boundaries.
