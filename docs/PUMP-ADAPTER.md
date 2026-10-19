# Pump.fun adapter design

The adapter is a proposed read-only integration. Its primary references are the [official public documentation and IDLs](https://github.com/pump-fun/pump-public-docs) and Solana's [getTransaction documentation](https://solana.com/docs/rpc/http/gettransaction). No private API or source-code recovery is assumed.

Before decoding, record the target program, quote asset, schema revision, network, and source commitment. Fetch a bounded window; retain transaction bytes or JSON, metadata, and instruction positions. Preserve failures and missing pages. A production decoder must distinguish outer instructions, inner instructions, program logs, and balance changes.

Pump.fun's public interfaces evolve. The current documentation includes revised trade interfaces, quote-asset handling, reserve semantics, and fee behavior. A production implementation must select and pin the appropriate revision, not infer a permanent interface from an old screenshot or one generic formula.

The preview's `kind`, `actor`, `target`, and SOL notional fields are display abstractions. They are not an exact reproduction of a Pump.fun IDL or a claim that account balances can be decoded from those five fields alone.

Suggested first milestone: one transaction fixture obtained from a declared source, a matching program schema, a deterministic decoder, and an independently checked normalized event. Extend to ordering and backfill only after that boundary is reproducible.

No program constants, live endpoint, SDK installation, wallet, or order builder is bundled in this design release. Version selection and supported networks belong in the production adapter's own implementation record.
