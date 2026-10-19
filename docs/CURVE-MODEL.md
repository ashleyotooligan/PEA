# Curve teaching model

The visual bench uses an original, deliberately simple constant-product model. Starting virtual reserves are x=40 SOL and y=1,000,000,000 tokens. Their product k is held constant. For q additional quote units, y(q)=k/(40+q). The displayed marginal price is `(40+q)^2/k`, with q ranging from 0 to 35.

The plot uses relative vertical scaling so its shape is readable. It does not display an executable token quote. Fees, integer rounding, reserve availability, transfers, migration boundaries, token extensions, and routing are omitted.

These parameters were chosen for the illustration. They are not reported Pump.fun reserve parameters. The production adapter must use the exact current program behavior, account state, and quote asset. The chart does not imply that all launch or pool mechanics reduce to this model.

The workbench's case notional and this model are separate examples. A 0.420 SOL event in a case does not drive this curve. The separation makes the simplified mechanism visible without pretending it is a calibrated reconstruction.
