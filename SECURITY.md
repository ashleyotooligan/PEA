# Local operation and future trust boundaries

The current preview loads local synthetic fixtures. It contains no wallet connector, signer, trade sender, production RPC, or model credential input. The Node preview server binds to loopback and is not a public deployment server.

A future agent should treat source metadata as untrusted case data, retain source provenance, and expose only declared tool capabilities. A fetched token description cannot authorize a trade or change system instructions. Signing and investigation should remain separate boundaries.

Unsigned digests check bytes, not identity or truth. A production signature or anchoring protocol would need its own implemented key, encoding, and verification design. No such security guarantee is made by the screenshot gallery.

Use private vulnerability reporting on GitHub if enabled. For ordinary design or data issues, include the selected synthetic case, view, reproduction steps, and expected behavior in an issue. Never post credentials or secret keys.
