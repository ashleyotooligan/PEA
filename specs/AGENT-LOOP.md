# Proposed agent loop

1. Parse the user's question and declare the case boundary.
2. Request a bounded source window through an adapter.
3. Preserve source records, failures, and coverage before interpretation.
4. Decode supported records with a pinned program schema.
5. Assemble a timeline and typed relationship graph.
6. Write observed claims using explicit event references.
7. Write interpretations with assumptions and limitations.
8. Challenge the explanation using plausible alternatives.
9. Revise unsupported statements or leave them unresolved.
10. Export a brief and receipt that preserve the case's limits.

Backfill is bounded by the question and budget. The agent should state when extra history would be useful and what it expects that history to resolve. It should stop rather than indefinitely expanding the investigation.

Token metadata, fetched descriptions, and tool response strings are untrusted case data. They cannot add tool privileges, authorize actions, change the system instructions, or remove policy review requirements.

The output should summarize reasons and evidence in a concise public brief. It does not need a transcript of private model deliberation. The preview illustrates that brief's structure with authored examples.
