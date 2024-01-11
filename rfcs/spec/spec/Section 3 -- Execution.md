# Executor

A distributed GraphQL executor acts as an orchestrator that uses schema metadata to rewrite a GraphQL request into a query plan. This plan resolves the required data from subgraphs and coerces this data into the result of the GraphQL request.

## Configuration

The supergraph is a GraphQL IDL document that contains metadata for the query planner that describes the relationship between type system members and the type system members on subgraphs.
