# WEB-GUI base libraries

This directory defines the reusable browser-library boundary used by Structure and intended for later reuse by AIGMos WEB-GUI.

## Public surface

Three import surfaces are available:

- `sdom.js` — SDOM only.
- `s3d.js` — S3D only.
- `index.js` — combined SDOM + S3D surface.

The two foundations are independent:

- **SDOM** — minimal DOM construction/composition primitives.
- **S3D** — scene, selection, playback, math, render storage, WebGL rendering, benchmark utilities and generic 3D objects.

The libraries are application-neutral. They must not contain Structure, CW, AIGMos, workspace, Ruleset, Entity or other host-domain semantics.

## Dependency rules

```text
SDOM  ↛ S3D
S3D   ↛ SDOM
SDOM  ↛ host application
S3D   ↛ host application
host application → SDOM / S3D
```

Neither library registers browser globals. Applications import the public surface directly.

S3D internals use named ES-module exports only. `../3d/index.js` is the sole namespace assembly point and exposes an immutable convenience `S3D` object. Internal modules never mutate that namespace.

## No-legacy rule

The library boundary has one implementation path only:

- no compatibility aliases
- no browser-global registration
- no classic-script loaders
- no prototype patches
- no monkey-patched function replacement
- no fallback implementation beside the canonical implementation

A host must adapt to the library API; the library is never changed to preserve an obsolete host API.

## Styling

`../ui.css` contains SDOM primitive layout only. `theme-default.css` provides replaceable default `--ui-*` visual tokens. A host may replace the theme without changing SDOM JavaScript or layout primitives.

## Extraction contract

A later standalone package can lift:

- `webgui/index.js`
- `webgui/sdom.js`
- `webgui/s3d.js`
- `webgui/theme-default.css`
- `../ui.css`
- the modules reachable from `../3d/index.js`

without carrying Structure application code. Structure-specific adapters, projections, editors and canonical semantics remain outside this boundary.
