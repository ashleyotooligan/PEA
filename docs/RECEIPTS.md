# Case receipt format

The local receipt export contains schema `pea/receipt/1`, a `synthetic: true` marker, `signature: null`, the case payload, and a SHA-256 digest. The digest is computed at build time from UTF-8 bytes of JavaScript `JSON.stringify(case)` in the fixture's declared property order.

This is a specific serialization convention, not a claim of universal JSON canonicalization. Reordering properties can change the digest. A production format should choose and document a canonical encoding or retain the exact hashed bytes alongside the payload.

The current digest checks the local fixture payload. It does not prove authorship, authenticity of chain observations, completeness, publication time, or blockchain inclusion. The export is explicitly unsigned.

A source-backed receipt would additionally identify network, requested range, actual coverage, commitment, raw-source digests, decoder revision, model/provider provenance, prompt revision, tool calls, and unresolved claims. Signing or onchain anchoring would be separate optional protocols with their own key and verification design.

The example JSON in `examples/receipt.json` is generated from First Light by the build process. The workbench export uses the selected complete case, even when its event-reveal slider is at an earlier point.
