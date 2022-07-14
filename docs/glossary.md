# Glossary

### Type Merging

The process of combining multiple GraphQL schemas (graphs) into a single GraphQL schema (graph).

### Schema Stitching

The process of creating a single gateway from multiple underlying GraphQL services (**Subschema**), that orchestrates and delegates requests to the corresponding GraphQL services using The Guild’s graphql-tools/stitching libraries. Stitching supports all methods of type merging (**Subschema Directive-based Type Merging** or **Programmatic/Config Gateway-based Type Merging**) and thus also supports **Apollo Federation.**

### Apollo Federation

An implementation of **Subschema Directive-based Type Merging** that is defined by the Apollo Federation Specification. GraphQL schemas (**Apollo Federation Subgraph**s) are composed of a single GraphQL schema (**Apollo Federated Graph**) on a Gateway level (**Apollo Federation Gateway**).

### “The Graph”

Branding used by Apollo for describing all their libraries and products.

> [...] the graph is a unified representation of all your data, services, and digital capabilities. The graph enables app developers to delete thousands of lines of boilerplate code, move fast without waiting on backend teams, and keep features consistent across web and mobile platforms

Source: [https://www.apollographql.com/](https://www.apollographql.com/) (2022/02/24)
> 

### ****Apollo Graph Platform****

Branding used by Apollo for describing their open-source products.

> ****The Apollo Graph Platform****
The leading open-source GraphQL implementation with 17M downloads per month and the only end-to-end cloud management solution for GraphQL.

Source: [https://www.apollographql.com/](https://www.apollographql.com/) (2022/02/24)
> 

### Apollo Federated Graph

An implementation of Type Merging. The result of combining multiple Apollo federation Subgraphs is an Apollo Federated Graph. The Apollo Federated Graph is usually exposed via an Apollo Federation Gateway or Apollo Federation compatible gateway (e.g. graphql-mesh).

### Apollo Federation Subgraph ([Link](https://www.apollographql.com/docs/federation/subgraphs/))

A service that exposes a GraphQL schema that is consumed by a gateway in order to create a federated graph. The services schema uses directive annotations on types and fields as a hint for a gateway on how it should combine the services schema with the schema of the other Apollo federation subgraphs. A Apollo Federation Subgraph is a GraphQL schema with Apollo Federation schema directives. Also See **Subschema**.

### Apollo Federated Graph ([Link](https://www.apollographql.com/docs/federation/))

The process of composing multiple Apollo Subgraphs into one schema, usually via a Gateway.

### Apollo Studio

A schema registry for registering and validating Apollo federation subgraphs.

### Apollo Federation Gateway

A gateway that usually uses a schema registry (Apollo Studio) for fetching the apollo subgraph configurations. It is the entry point for incoming GraphQL requests. It analyzes the incoming operations, builds a query plan in order to find the quickest way of retrieving all the data from the apollo federation subgraphs, and then executes that plan.

The approach of combining multiple GraphQL services into a unified GraphQL Graph on a Gateway using meta-information applied on the individual GraphQL services schema definitions.

### Subschema

A  Subschema is a GraphQL schema that is used in a type merging contexts, such as in Apollo federation or Schema Stitching for. In Apollo federation, a Subschema is often called a Apollo Federation Subgraph.

### Subschema Directive-based Type Merging

The process of applying type merging on the Gateway using the directive meta-information exposed on the consumed GraphQL services (**Subschemas** as done by **Apollo Federation** or **Schema Stitching**.

### Programmatic/Config Gateway-based Type Merging

A method of Type Merging where the **Subschemas** do not expose any information on how they can be merged. Instead, the rules are defined on the Gateway, either as code or a configuration file.

### Hybrid Type Merging

A mix of both **Subschema Directive-based Type Merging** and **Programmatic/Config Gateway-based Type Merging**.

### GraphQL Mesh

A library maintained by The Guild that is capable of transforming a single or many **data sources** and **services** (GraphQL API, REST API, SQL Database) into a GraphQL schema. In the case of multiple data sources or services, Mesh uses Schema Stitching for doing Type Merging of the GraphQL subschemas that were the results of the transform.

### Data Source

A “dumb” service or database that exposes raw data. Often a data source is consumed by a service, for reading and/or persisting business logic state.

It is hard to define a border between Data Source and Service. E.g. a PostgreSQL database could be considered a data source. If the PostgreSQL database uses database triggers for applying business logic constraints it could be considered a **Service** instead. The boundaries are fluid.

### Service

A service uses a data source and exposes processed data, that models a business logic flow. A data source can evolve into service over time.

### GraphQL Hive

A GraphQL schema registry and workflow tool maintained by The Guild that is compatible with any **type of merging** workflow.
