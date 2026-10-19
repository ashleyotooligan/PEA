# Reconstructing a launch

A production event key should preserve slot, transaction position within the block where available, outer instruction index, inner instruction index, and a stable source reference. Sorting by slot alone cannot establish full order inside one slot.

The authored fixtures already have an explicit display order. The two funding events in First Light share one slot; their order is simply the order in the fixture, not an observed sub-slot chronology.

Reconstruction should answer a question rather than claim universal completeness. Start with creation and the chosen trade/funding window. Add predecessor transfers only if they address the question. Record the query boundary and excluded material.

Normalize creation, transfers, buys, sells, and migration as distinct event types. Do not treat a buy's notional as a wallet's complete balance change: fees, rent, unrelated instructions, and routing can affect a real transaction.

The current header's buy-minus-sell notional sums the displayed sample values and excludes funding transfers. It is not a fee-adjusted reserve delta, complete launch volume, profit, market cap, or performance metric.
