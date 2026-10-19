# Source ingestion requirements

A production adapter needs an explicit network and target program, bounded query window, requested commitment, pagination strategy, transaction-version support, and retry budget. Record provider errors and null responses rather than converting them into empty activity.

Retain the original response and sufficient metadata to distinguish a provider observation from an agent interpretation. For same-slot events, preserve finer transaction/instruction order when available. Version schema changes separately from source changes.

Completeness should be a declared coverage property. “No matching event in the retained window” is narrower than “no event occurred.” A decoder that does not support a new instruction version should emit `unsupported`, not guess a legacy interpretation.

The design's synthetic fixture has no provider, retrieval timestamp, or real signature. A production adapter must supply those fields from actual observations rather than copying example labels.
