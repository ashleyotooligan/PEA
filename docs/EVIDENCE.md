# Evidence model

Every future source record needs an immutable reference and retained raw payload. A normalized event is an interpretation of that payload under a declared decoder revision. A claim is a separate statement about one or more events.

| Claim status | Meaning | Requirement |
|---|---|---|
| Observed | Directly represented in the available source | At least one relevant evidence ID |
| Inferred | Interpretation that depends on observations and assumptions | Evidence IDs plus an explicit limitation |
| Unknown | Unresolved from available records | State the missing information |

A digest identifies bytes under a specified serialization. It does not authenticate the source by itself. A blockchain reference is not automatically proof of an offchain narrative. A model-written sentence is not a new observation.

The fixture claims reference only IDs present in their own case. The local checker validates that linkage. All fixture IDs begin with `demo:` to prevent confusion with real chain identifiers.

Production evidence should also retain failures: null RPC results, decode errors, unsupported versions, and gaps. A case can be useful with partial coverage if its conclusions are correspondingly narrow.
