# GraphQL Composite Schemas Spec

**Introduction**

The GraphQL Composite Schemas introduces a comprehensive specification for creating distributed GraphQL systems that seamlessly merges multiple GraphQL schemas. This specification describes the process of composing a federated GraphQL schema and outlines algorithms for executing GraphQL queries on the federated schema effectively by using query plans. This specifcation was origially created by ChilliCream and was transfered to the GraphQL foundation.

The GraphQL Foundation was formed in 2019 as a neutral focal point for organizations who support the GraphQL ecosystem, and the GraphQL Specification Project was established also in 2019 as the Joint Development Foundation Projects, LLC, GraphQL Series.

If your organization benefits from GraphQL, please consider becoming a member and helping us to sustain the activities that support the health of our neutral ecosystem.

The GraphQL Specification Project has evolved and may continue to evolve in future editions of this specification. Previous editions of the GraphQL specification can be found at permalinks that match their release tag. The latest working draft release can be found at https://spec.graphql.org/draft.

**Copyright Notice**

Copyright © 2019-present, GraphQL contributors

THESE MATERIALS ARE PROVIDED “AS IS”. The parties expressly disclaim any
warranties (express, implied, or otherwise), including implied warranties of
merchantability, non-infringement, fitness for a particular purpose, or title,
related to the materials. The entire risk as to implementing or otherwise using
the materials is assumed by the implementer and user. IN NO EVENT WILL THE
PARTIES BE LIABLE TO ANY OTHER PARTY FOR LOST PROFITS OR ANY FORM OF INDIRECT,
SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER FROM ANY CAUSES
OF ACTION OF ANY KIND WITH RESPECT TO THIS DELIVERABLE OR ITS GOVERNING
AGREEMENT, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR
OTHERWISE, AND WHETHER OR NOT THE OTHER MEMBER HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

**Licensing**

The GraphQL Specification Project is made available by the
[Joint Development Foundation](https://www.jointdevelopment.org/). The current
[Working Group](https://github.com/graphql/graphql-wg) charter, which includes
the IP policy governing all working group deliverables (including
specifications, source code, and datasets) may be found at
[https://technical-charter.graphql.org](https://technical-charter.graphql.org).

Currently, the licenses governing GraphQL Specification Project deliverables
are:

| Deliverable    | License                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Specifications | [Open Web Foundation Agreement 1.0 (Patent and Copyright Grants)](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0) |
| Source code    | [MIT License](https://opensource.org/licenses/MIT)                                                                                                                 |
| Data sets      | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)                                                                                                      |

**Conformance**

A conforming implementation of GraphQL must fulfill all normative requirements.
Conformance requirements are described in this document via both descriptive
assertions and key words with clearly defined meanings.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the normative portions of
this document are to be interpreted as described in
[IETF RFC 2119](https://tools.ietf.org/html/rfc2119). These key words may appear
in lowercase and still retain their meaning unless explicitly declared as
non-normative.

A conforming implementation of GraphQL may provide additional functionality, but
must not where explicitly disallowed or would otherwise result in
non-conformance.

**Conforming Algorithms**

Algorithm steps phrased in imperative grammar (e.g. "Return the result of
calling resolver") are to be interpreted with the same level of requirement as
the algorithm it is contained within. Any algorithm referenced within an
algorithm step (e.g. "Let completedResult be the result of calling
CompleteValue()") is to be interpreted as having at least the same level of
requirement as the algorithm containing that step.

Conformance requirements expressed as algorithms can be fulfilled by an
implementation of this specification in any way as long as the perceived result
is equivalent. Algorithms described in this document are written to be easy to
understand. Implementers are encouraged to include equivalent but optimized
implementations.

See [Appendix A](#sec-Appendix-Notation-Conventions) for more details about the
definition of algorithms and other notational conventions used in this document.

**Non-Normative Portions**

All contents of this document are normative except portions explicitly declared
as non-normative.

Examples in this document are non-normative, and are presented to aid
understanding of introduced concepts and the behavior of normative portions of
the specification. Examples are either introduced explicitly in prose (e.g. "for
example") or are set apart in example or counter-example blocks, like this:

```example
This is an example of a non-normative example.
```

```counter-example
This is an example of a non-normative counter-example.
```

Notes in this document are non-normative, and are presented to clarify intent,
draw attention to potential edge-cases and pit-falls, and answer common
questions that arise during implementation. Notes are either introduced
explicitly in prose (e.g. "Note: ") or are set apart in a note block, like this:

Note: This is an example of a non-normative note.

# [Overview](Section%201%20--%20Overview.md)

# [Composition](Section%202%20--%20Composition.md)

# [Execution](Section%203%20--%20Execution.md)

# [Shared Types](Section%204%20--%20Shared%20Types.md)

# [Appendix: Definitions](Appendix%20A%20--%20Definitions.md)