# Shared Types

In this section we outline directives and types that are shared between the subgraph configuration and the gateway configuration document.

## Name

```graphql
scalar Name
```

The scalar `Name` represents a valid GraphQL type name.

## FieldSelection

```graphql
scalar FieldSelection
```

The scalar `FieldSelection` represents a GraphQL field selection syntax.

```graphql example
abc(def: 1) { ghi }
```
