# Glossary

This glossary serves as a foundation for having a common wording and language.
The motivation behind this document was the many different namings and, hence,
the resulting communication issues when talking about schema composition.

### Apollo Federated Graph ([Link](https://www.apollographql.com/docs/federation/))

The process of composing multiple Apollo Subgraphs into one schema, usually via
a Gateway. An implementation of Schema composition. The result of composing
multiple Apollo federation Subgraphs is a Apollo Federated Graph. The Apollo
Federated Graph is usually exposed via an Apollo Federation Gateway
(apollo/gateway; apollo-router) or Apollo Federation compatible gateway (e.g.
graphql-mesh).

### Apollo Federation

An implementation of **Subschema Directive-based Schema compositions** that is
defined by the Apollo Federation Specification. GraphQL schemas (**Apollo
Federation Subgraph**s) are composed of a single GraphQL schema (**Apollo
Federated Graph**) on a Gateway level (**Apollo Federation Gateway**).

### Apollo Federation Gateway

A gateway that usually uses a schema registry (e.g. Apollo Studio or GraphQL
Hive) for fetching the apollo subgraph configurations. It is the entry point for
incoming GraphQL requests. It analyzes the incoming operations, builds a query
plan in order to find the quickest way of retrieving all the data from the
apollo federation subgraphs, and then executes that plan.

The approach of combining multiple GraphQL services into a unified GraphQL Graph
on a Gateway using meta-information applied on the individual GraphQL services
schema type definitions.

### Apollo Federation Subgraph ([Link](https://www.apollographql.com/docs/federation/subgraphs/))

A service that exposes a GraphQL schema that is consumed by a gateway in order
to create a federated graph. The services schema uses directive annotations on
types and fields as a hint for a gateway on how it should combine the services
schema with the schema of the other Apollo federation subgraphs. A Apollo
Federation Subgraph is a GraphQL schema with Apollo Federation schema
directives. Also See **Subschema**.

### Apollo Graph Platform

Branding used by Apollo for describing their open-source products.

> The leading open-source GraphQL implementation with 17M downloads per month
> and the only end-to-end cloud management solution for GraphQL. Source:
> [https://www.apollographql.com/](https://www.apollographql.com/) (2022/02/24)

### Apollo Studio

A schema registry for registering and validating Apollo federation subgraphs.

### Data Source

A “dumb” service or database that exposes raw data. Often a data source is
consumed by a service, for reading and/or persisting business logic state.

It is hard to define a border between Data Source and Service. E.g. a PostgreSQL
database could be considered a data source. If the PostgreSQL database uses
database triggers for applying business logic constraints it could be considered
a **Service** instead. The boundaries are fluid.

# Global Object Identification

Pattern of having global unique IDs between all Object Types (entities), usually
on a field with the name `id` and the field type `ID!`.

- [Global Object Identification (graphql.org)](https://graphql.org/learn/global-object-identification/)
- [GraphQL Global Object Identification Specification (relay.dev)](https://relay.dev/graphql/objectidentification.htm)

### GraphQL Hive

A GraphQL schema registry and workflow tool maintained by The Guild that is
compatible with any **type of merging** workflow.

### GraphQL Mesh

A library maintained by The Guild that is capable of transforming a single or
many **data sources** and **services** (GraphQL API, REST API, SQL Database)
into a GraphQL schema. In the case of multiple data sources or services, Mesh
uses Schema Stitching for doing Schema Composition of the GraphQL subschemas
that were the results of the transform.

### Hybrid Schema Composition

A mix of both **Subschema Directive-based Schema Composition** and
**Programmatic/Config Gateway-based Schema Composition**.

### Nadel ([Link](https://github.com/atlassian-labs/nadel))

> Nadel is a Kotlin library to combine several GraphQL services together. This
> is achieved by combining several underlying GraphQL services (schemas) into
> one schema (overall schema). The main purpose of this library is to power a
> GraphQL gateway which serves as the entry point for executing requests across
> different services while presenting one GraphQL API.

### Nautilus ([Link](https://github.com/nautilus/gateway))

> A library and standalone service that composes your GraphQL APIs into one
> endpoint.

Uses these
[merge strategies](https://github.com/nautilus/gateway/blob/master/docs/mergingStrategies.md)
and one interface type to compose subschemas (see **Node interface**).

### Node interface

The [Global Object
Identification][https://graphql.org/learn/global-object-identification/]
[spec][https://relay.dev/graphql/objectidentification.htm] defines a `Node`
interface, which enables composition if shared types implement it.
[Nautilus Gateway](https://github.com/nautilus/gateway) is one such
implementation.

[global object identification]:
  https://graphql.org/learn/global-object-identification/
[relay-goi-spec]: (https://relay.dev/graphql/objectidentification.htm)

### Schema Composition

The process of composing multiple GraphQL schemas (**Subschema**) into a single
GraphQL schema.

### “The Graph”

Branding used by Apollo for describing all their libraries and products.

> [...] the graph is a unified representation of all your data, services, and
> digital capabilities. The graph enables app developers to delete thousands of
> lines of boilerplate code, move fast without waiting on backend teams, and
> keep features consistent across web and mobile platforms

Source: [https://www.apollographql.com/](https://www.apollographql.com/)
(2022/02/24)

### Programmatic/Config Gateway-based Schema Composition

A method of Schema Composition where the **Subschemas** do not expose any
information on how they can be composed. Instead, the rules are defined on the
Gateway, either as code or via a configuration file.

### Schema Stitching

The process of creating a single gateway from multiple underlying GraphQL
services (**Subschema**), that orchestrates and delegates requests to the
corresponding GraphQL services using The Guild’s graphql-tools/stitching
libraries. Stitching supports all methods of Schema Composition (**Subschema
Directive-based Schema Composition** or **Programmatic/Config Gateway-based
Schema Composition**), including **Apollo Federation.** (Subschema
Directive-based schema composition)

### Service

A service uses a data source and exposes processed data, that models a business
logic flow. A data source can evolve into service over time.

### Subschema

A Subschema is a GraphQL schema that is used in a schema composition contexts,
such as in Apollo federation or Schema Stitching for. In Apollo federation, a
Subschema is often called a Apollo Federation Subgraph. A composite schema
itself can be a subschema in another composite schema.

### Subschema Directive-based Schema Composition

The process of applying schema composition on the Gateway using the directive
meta-information exposed on the consumed **Subschemas** (usually GraphQL HTTP
APIs/services) as done by **Apollo Federation** or **Schema Stitching**.
