# Overview

The GraphQL Composite Schemas specification describes how multiple GraphQL services,
known as _subgraphs_, are combined into a single unified GraphQL schema called the
_supergraph_.

For clients querying the unified GraphQL schema, the implementation details and complexities
of the distributed systems behind it are hidden. The observable behavior of the distributed
GraphQL executor is the same as that of a standard GraphQL executor as described by
the GraphQL specification.

This specification focuses on two core components to allow interoperability between
tooling and gateways from  different implementers, the schema composition and the execution.

- **Composition**: The schema composition describes a process of merging subgraph schemas
  into a single GraphQL schema. This schema is annotated with execution directives and is referred
  to as the Gateway Configuration.

- **Execution**: The distributed GraphQL executor specifies the Gateway Configuration and
  the core execution algorithms.

The GraphQL Composite Schemas spec describes a colaborative approach towards build a single graph composed from multiple
_subgraphs_ by specifying the algorithms to merge different GraphQL _subgraph_ schemas into a single
_supergraph_.

Two subgraphs exposing a type with the same name form a distributed type in the _supergraph_.

```graphql example
# subgraph 1
type SomeType {
  a: String
  b: String
}

# subgraph 2
type SomeType {
  a: String
  c: String
}

# supergraph
type SomeType {
  a: String
  b: String
  c: String
}
```

## Entities

Entities are objects with a stable identity that endure over time. They typically represent core domain objects that act as entry points to a graph. In a distributed architecture, each _subgraph_ can contribute different fields to the same entity, and is responsible for resolving only the fields that it contributes. In such an architecture, entities effectively act as hubs that enable transparent traversal across service boundaries.

## Keys

A representation of an object’s identity is known as a key. Keys consist of one or more fields from an object, and are infered from the entity resolvers. An entity can have many keys as entities can have many entity resolvers.
