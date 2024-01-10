# Executor

A distributed GraphQL executor acts as an orchestrator that uses schema metadata to rewrite a GraphQL request into a query plan. This plan resolves the required data from subgraphs and coerces this data into the result of the GraphQL request.

## Configuration

The supergraph is a GraphQL IDL document that contains metadata for the query planner that describes the relationship between type system members and the type system members on subgraphs.

### @variable

**TODO: We might need the type stated on the variable as we might want to change resolvers when we cannot guarntee data in some cases** 

```graphql
directive @variable(
  name: Name!
  select: FieldSelection
  value: Value
  subgraph: Subgraphs!
) repeatable on OBJECT | FIELD_DEFINITION
```

The `@variable` directive specifies how the value for a variable specified by a `@resolver` directive can be resolved from subgraphs.

A variable can be declared on object types to provide variable values for entity resolvers or on field resolvers.

```graphql example
type User
  @variable(name: "User_id" select: "id" subgraph: Subgraphs.ACCOUNT) {

}
```

When declared on a field, variables represent conditional ways to resolve a value. Only if this field is included into a query, will this variable be available.

```graphql example
type User {
  address: Address @variable(name: "User_id", select: "id", subgraph: Subgraphs.ACCOUNT)
}
```

The `@variable` directive specifies how data can be selected from a subgraph relative to the entity by specifying GraphQL field syntax in the `select` argument. The field syntax may refer to fields only available on a specific subgraph.

```graphql example
type Product
  @variable(
    name: "Product_group_name"
    select: "group { name }"
    subgraph: "ProductCatalog"
  ) {
  dimension: ProductDimension
}
```

```graphql example
type Product {
  dimension: ProductDimension
  shippingEstimate(zip: String!): Int
    @variable(
      name: "Product_dimension_weight"
      select: "dimension { weight }"
      subgraph: "ProductCatalog"
    )
}
```

To construct the complex variable values, the `@variable` directives allow using GraphQL value syntax from which it can refer to other variables.

```graphql example
type User
  @variable(name: "User_id", select: "id", subgraph: "Account")
  @variable(name: "FilterObj", value: "{ id: { eq: $User_id } }", subgraph: "Account") {

}
```

Field arguments are implicitly declared as variables and can be referenced within the GraphQL value syntax.

```graphql example
type Query {
  productById(id: ID!): Product
    @variable(
      name: "FilterObj"
      value: "{ id: { eq: $id } }"
      subgraph: "Account"
    )
}
```

**Arguments:**

- `name`: The name of the variable.
- `select`: Represents GraphQL field syntax and specifies the required data relative to an object type.
- `value`: Represents GraphQL value syntax and allows to construct a GraphQL value syntax by referencing variables.
- `subgraph`: The subgraph from which the variable value can be resolved.

**Type Validation:**

Variables must be referenced by `@variable` or `@resolver` directives within the same type definition.

1. Collect all names from `@variable` directives within the type definition in a set.
2. Collect all variable names from the operation syntax of the `@resolver` directives' `operation` argument.
3. It must be ensured that both sets intersect for all elements.

### @resolver

```graphql
directive @resolver(
  operation: OperationDefinition!
  kind: ResolverKind
  subgraph: Subgraphs!
) repeatable on OBJECT | FIELD_DEFINITION
```

The resolver directives specify an operation to fetch data from a subgraph. The `operation` argument specifies GraphQL operation syntax to define the operation.

```graphql example
type User
  @resolver(
    operation: "query($User_id: Int!) { userById(id: $User_id) { ... User } }"
    subgraph: Subgraphs.ACCOUNT) {

}
```

The root selection set of an operation must only have a single root field which specifies how to fetch data for a field or type from a subgraph.

```graphql counter-example
type User
  @resolver(
    operation: "query($User_id: Int!) { userById(id: $User_id) { ... User } someOtherData }" 
    subgraph: Subgraphs.ACCOUNT) {

}
```

The fully qualified subgraph query is constructed in the query planning process by rewriting the fragment spread.

```graphql example
type User
  @resolver(
    operation: "query($User_id: ID!) { node(id: $User_id) { ... on Author { ... User } } }" 
    subgraph: Subgraphs.ACCOUNT) {

}
```

The `kind` argument of the `@resolver` directive defines the type of the resolver.

By default a resolver represents a simple fetch from a subgraph.

```graphql example
type Query {
  root: Root
    @resolver(
      operation: "query { root { ... Root } }"
      subgraph: Subgraphs.ACCOUNT
    )
}
```

```graphql example
type Address
  @resolver(
    operation: "query($User_id: ID!) { node(id: $User_id) { ... on Author { ... User } } }"
    subgraph: Subgraphs.ACCOUNT) {

}
```

The `BATCH` resolver is used to resolve entity data in a batch.

```graphql example
type Address
  @resolver(
    operation: "query($User_id: [ID!]!) { nodes(ids: $User_id) { ... on User { ... User } } }" 
    kind: BATCH 
    subgraph: Subgraphs.ACCOUNT) {

}
```

The `SUBSCRIBE` resolver may only be used in a subscription context to subscribe to a subgraph.

```graphql example
type Subscription {
  onEvent: String
    @resolver(
      operation: "subscription { onEvent }"
      kind: SUBSCRIBE
      subgraph: Subgraphs.ACCOUNT
    )
}
```

**Arguments:**

- `operation`: Represents GraphQL operation definition syntax.
- `kind`: Specifies the operation kind.
- `subgraph`: The subgraph on which the resolver can be executed.

**Type Validation:**

Variables declared by `@resolver` directives must be resolvable through `@variables` on the same type definition. The variable must be resolvable from a subgraph that is different than the one the `@resolver` directive declares.

1. For each {resolverDirective} in {typeDefinition}:
2. For each {variableDefinition} in {resolverDirective}:
3. At least one {variableDirective} can be found where {variableDirective}.Name == {resolverDirective}.Name and {variableDirective}.Subgraph != {resolverDirective}.Subgraph

### @source

```graphql
directive @source(
  subgraph: Subgraphs!
  name: Name
) repeatable on OBJECT | FIELD_DEFINITION | ENUM | ENUM_VALUE | INPUT_OBJECT | INPUT_FIELD_DEFINITION | SCALAR
```

The `@source` directive specifies on which subgraphs a type system member is available.

```graphql example
type User @source(subgraph: A) @source(subgraph: B) {
  id: ID! String @source(subgraph: A) @source(subgraph: B)
  name: String @source(subgraph: A)
}
```

If a type system name differs accross subgraphs, the `@source` directive may specify the name of the type system member at the subgraph.

```graphql example
type User {
  name: String @source(subgraph: "A", name: "DisplayName")
}
```

**Arguments:**

- `subgraph`: The subgraph from which the type system member is resolvable.
- `name`: Specifies the name of a type system member on a subgraph.

### @owner

```graphql
directive @owner(subgraphs: [Name!]!) on OBJECT
```

Subgraphs that own an entity can be used to resolve this entity and determine if an entity exists.
Multiple subgraphs can own an entity. All other subgraphs are considered to only hold patch data.

```graphql example
type User @owner(subgraphs: ["A", "B"]) {
  id: ID! String @source(subgraph: "A") @source(subgraph: "B")
  name: String @source(subgraph: "A")
}
```

**Arguments:**

- `subgraphs`: The subgraphs from which an entity implementing the `Node` interface can be resolved from.

**Type Validation:**

Object type definitions annotated with this directive must implement the `Node` interface.

### Subgraphs

```graphql
enum Subgraphs {
  NAME_OF_SUBGRAPH_1
  NAME_OF_SUBGRAPH_2
  NAME_OF_SUBGRAPH_3
}
```

### @transport

```graphql
directive @transport(
  subgraph: Name!
  protocol: String!
  location: URI!
  group: String
) repeatable on SCHEMA
```

The `@transport` directive specifies the transport protocol to resolve data from a subgraph.

```graphql example
schema
  @transport(subgraph: "A" protocol: "GRAPHQL-HTTP", location: "http://localhost:1234/graphql")
  @transport(subgraph: "A" protocol: "GRAPHQL-SSE", location: "http://localhost:1234/graphql")
  @transport(subgraph: "A" protocol: "GRAPHQL-WS", location: "ws://localhost:1234/graphql") {

}
```

**Arguments:**

- `subgraph`: The subgraph for which a protocol was defined.
- `protocol`: A string representing the transport protocol.
- `location`: A URI representing the transport resource.
- `group`: An option string allowing to express configuration grouping.

### ResolverKind

```graphql
enum ResolverKind {
  FETCH
  BATCH
  SUBSCRIBE
}
```

The `ResolverKind` enum defines the resolver types.

### Value

```graphql
scalar Value
```

The `Value` scalar represents GraphQL value syntax.