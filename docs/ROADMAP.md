# Implementation roadmap

| Milestone | Concrete result | Acceptance evidence |
|---|---|---|
| 0: Design release | Reviewable workbench and proposed contracts | Screens, fixtures, scope, and editable source |
| 1: One source-backed case | A retained, bounded real event window | Provenance, decoder revision, raw records, gaps |
| 2: Deterministic reconstruction | Reproducible event ordering and route graph | Source-to-event checks and comparison cases |
| 3: Agent briefs | Model-written claims tied to evidence | Evaluations for unsupported claims and missed gaps |
| 4: Counterevidence | Alternative explanations and claim revision | Shared-service and incomplete-window challenge sets |
| 5: Receipts and replay | Portable provenance and revision history | Independent replay against preserved bytes |
| 6: Policy rehearsal | Reviewable hypothetical plans | Quote, freshness, budget, and authorization evaluations |

Live signing or execution would be a separate extension after the investigation pipeline works. Model choice, hosting, storage, and provider costs should follow measured case workloads, not a promise in a screenshot.

No milestone beyond the local design preview is claimed as implemented in release 0.1. The smallest useful next step is a single trustworthy source-backed case.
