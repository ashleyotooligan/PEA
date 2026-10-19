# Proposed tool contracts

The names below describe an intended agent interface. They are not a registered MCP server or installed tool package. JSON examples use synthetic targets.

| Tool | Input | Proposed output | Boundary |
|---|---|---|---|
| `pea.inspect_launch` | Target, network, question, bounded source window | Case ID, source records, coverage, gaps | Public read-only data |
| `pea.decode_event` | Source reference, program ID, pinned schema | Normalized event, decoder version, unknown fields | Interpretation of retained source |
| `pea.map_routes` | Case ID, event IDs, graph depth limit | Nodes, typed edges, evidence references | Relationship, not identity attribution |
| `pea.challenge_claim` | Claim ID, case boundary, alternative hypotheses | Supporting evidence, counterevidence, revised status | Reasoning over a declared case |
| `pea.rehearse_plan` | Proposed plan, policy, quote assumptions | Checks, missing inputs, review decision | Hypothetical, no broadcast |
| `pea.export_receipt` | Case ID, serialization, provenance selection | Portable artifact and digest metadata | Local export |

Every response should carry a status such as `complete`, `partial`, `unsupported`, or `failed`, plus source references and limitations. A failed tool call is a result to preserve, not a reason to invent a successful response.

The initial production adapter should expose only read operations. Tool names and capabilities must be validated against the actual chosen transport before any server implementation is described as compatible.
