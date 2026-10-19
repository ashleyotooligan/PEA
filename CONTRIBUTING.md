# Contributing to PEA

This release is a design workbench and production specification. Keep implemented preview features separate from proposed backend capabilities in code, screenshots, and documentation.

For a visual change, rebuild the embedded preview, regenerate relevant screenshots, inspect labels and layout, and run the local checker. For a fixture change, preserve `synthetic: true`, use `demo:` identifiers, keep claims linked to existing events, and rebuild receipt digests.

For backend proposals, include the source boundary, schema revision strategy, failure handling, coverage model, and acceptance evidence. Start with one reproducible source-backed case rather than a broad unverified feature list.

Do not import another project's artwork or claim an affiliation. No production wallet keys, real private data, API secrets, or copied protected material belong in fixture examples.

Commands: `npm run build`, `npm run check`; optionally `npm run screenshots` after installing the documented native Canvas package. Describe what was actually checked in a pull request.
