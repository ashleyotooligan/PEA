# Data dictionary

| Field | Meaning in this release |
|---|---|
| `synthetic` | True for all case data |
| `id` | Local case or event identifier |
| `mint` | A `demo:` label, not a valid token address |
| `slot` | An illustrative integer in the fixture |
| `kind` | `create`, `fund`, `buy`, or `sell` |
| `actor` | Readable role label |
| `target` | Another role or curve label |
| `sol` | Nonnegative decimal sample notional |
| `note` | Authored event description |
| `claims` | Authored statements with status, references, and limits |
| `gaps` | Explicitly missing portions of the example window |
| `coverage` | Description of the supplied bundle |

SOL display sums are computed using integer lamports: one SOL is represented by 1,000,000,000 subunits in the preview helpers. The display truncates to three decimals; fixture values have three decimals. No fractional number is used to sum case flow.

Synthetic slot numbers are narrative ordering cues. The names SPROUT, FENNEL, and THYME are not live-token claims. No dataset in this release can be used as a real address watchlist or real trading signal.
