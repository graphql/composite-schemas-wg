# Shared Types

In this section we outline directives and types that are shared between the subgraph configuration and the gateway configuration document.

## @fusion

```graphql
directive @fusion(
  prefix: String
  prefixSelf: Boolean! = false
  version: Version!
) on SCHEMA
```

The `@fusion` directive is applied to a schema definition node or a schema extension node in a GraphQL schema document and defines the Fusion specification version that the configuration document follows. If the version is not explicitly stated, Fusion tooling is expected to select the newest specification version the tooling follows.

```graphql example
schema @fusion(version: "2023-12.rfc-1") {
  query: Query
}
```

In addition, it specifies a prefix for Fusion-specific types and directives to prevent naming collisions with user-defined schema types or directives.

```graphql example
extend type Bar
  @fusion__variable(name: "field" select: "field" subgraph: "subgraphName") {

}

schema
  @fusion(prefix: "fusion", version: "2023-12.rfc-1") {

}
```

If the `prefixSelf` argument is set to `true`, the prefix will also be applied to the `@fusion` directive itself.

```graphql example
extend type Bar
  @fusion__variable(name: "field" select: "field" subgraph: "subgraphName") {

}

schema @fusion__fusion(prefix: "fusion" prefixSelf: true, version: "2023-12.rfc-1") {

}
```

**Arguments:**

- `version`: Specifies the version of the Fusion specification the document aligns with. The version string consists of the year and month the spec was released, e.g., `2023-12`.
- `prefix`: This string defines the prefix for Fusion-specific types and directives.
- `prefixSelf`: A boolean that, when set to `true`, applies the specified prefix to the `@fusion` directive itself.

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

## Version

```graphql
scalar Version
```
