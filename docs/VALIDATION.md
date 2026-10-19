# Release validation

Release 0.1 was prepared on 2026-10-19 with Node.js 24.19.0 and optional native Canvas 0.1.100. The source preview and checker require Node.js 20+; the included GitHub workflow uses Node 22.

## Checks performed

- All fourteen views were captured at 1680 × 1050 from the shared renderer and visually reviewed, including the desk, timeline, topology, challenge, sandbox, replay, receipt, and portrait layouts.
- A native Canvas layout check rendered all fourteen views against all three cases: 42 combinations. Text remained inside the viewport and rendering did not mutate fixture data.
- The embedded HTML booted in a native Canvas/DOM harness without a network fetch. The harness exercised all views, case selection, the replay cursor, and unsigned receipt export.
- The local Node server served HTML, JavaScript modules with the expected MIME type, JSON fixtures, and PNGs. Traversal requests, missing files, and POST requests were rejected.
- The source checker parses JSON, compiles JavaScript syntax, checks relative Markdown/HTML paths, checks PNG headers and screenshot dimensions, and resolves local schema references.
- Fixture checks verify synthetic markers, event ordering, event identifiers, claim references, exact sample notional, declared gaps, and rebuilt receipt digests. These are targeted release checks, not a full external JSON Schema conformance suite.
- The release archive is checked against its SHA-256 manifest after packaging.

## Interpretation

These checks validate the design preview and its local data consistency. They do not demonstrate a working production agent, real blockchain ingestion, live decoding, model inference, wallet integration, or trade execution.

The UI harness is not a Chromium browser-engine integration session. Native Canvas and browser font rasterization can differ. The local preview includes native labeled controls, but the Canvas figures have not had a full screen-reader audit.

The final archive includes all original art, screenshots, source modules, and relative image paths. Upload folders beside the README to preserve those paths on GitHub.
