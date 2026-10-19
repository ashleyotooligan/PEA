# Proposed case state

| State | Entry condition | Next useful transition |
|---|---|---|
| Open | Question and requested range exist | Fetch source |
| Sourced | Raw records and coverage retained | Decode |
| Partial | Gaps, null results, or unsupported versions exist | Bounded backfill or limited interpretation |
| Reconstructed | Supported records normalized and ordered | Build claims |
| Challenged | Alternatives considered against available evidence | Revise or report |
| Reported | Brief and limits packaged | Export receipt |
| Revised | New source or decoder version changes interpretation | Preserve prior revision, reconstruct again |

State labels describe processing, not confidence or token quality. A reported case may remain partial. A complete local bundle is not proof that a provider returned complete chain history.

The current preview does not run this state machine. Its case selector switches authored example states for review.
