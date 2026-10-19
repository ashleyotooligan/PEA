# Hypothetical plan sandbox

The design proposes a review boundary between understanding an event and acting on it. A plan is a separate object carrying an action description, assumptions, budget, quote requirements, policy version, and requested authorization.

The sample display uses 0.200 SOL proposed spend, a 0.300 SOL ceiling, and a 200 bps slippage cap. They are authored limits, not recommended trading values. There is no live quote, signer, or broadcast capability.

The example is always review-only. A complete local fixture is not a fresh chain window; a proposed spend within a ceiling is not execution authorization. A future policy engine should separately evaluate coverage, quote age, allowed program IDs, expected account changes, budget, and human review.

No trading outcome or profit is simulated. No token is purchased. The preview requests zero funds and contains no wallet connection prompt. A future execution extension would be its own implemented and validated component.
