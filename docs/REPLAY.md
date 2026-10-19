# Replay and coverage

The local replay reveals the first `ceil(eventCount*cursor)` supplied events, with at least one visible event. Cursor values range from 0.01 to 1. They are event-list fractions, not elapsed-time estimates or simulated block times.

The screenshot opens Missing Pages at 68%, showing five of its six supplied events. Its header statistics still describe the complete selected fixture; the replay panel identifies the visible event count separately.

The gap is part of the case's data. Showing all six supplied records does not fill slots 830004–830005, which that fixture deliberately omits. A production system should keep a gap until source backfill addresses it.

A full replay engine would retain query versions, source fetch results, decoder revisions, claim revisions, and model outputs. It should allow a reviewer to reconstruct what evidence was available when a claim was written. That engine is a future component, distinct from this presentation slider.
