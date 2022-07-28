
# Introduction

As a stepping stone towards building blocks that will allow us to facilitate different types of schema composition, the below represents an attempt to summarize the current known state of subschema composability.

# Nomenclature

This RFC will adopt the language suggested at our first WG of referring to each individual smaller schema as a "subschema," which may or may not be executable, with the composed schema referred to as the "composite schema." In addition, the below terms are defined as follows:

## "Overlapping"

The term "overlapping" will be used to refer to a situation where different subschemas define GraphQL elements (such as types, fields, arguments, etc) that each map to the same entity (type, field, argument) etc. in the composite schema. In the naïve situation, these overlapping elements are known to be overlapping simply because they have the same name. However, as mentioned during our first WG, a method of composition may be devised in which elements in different subschemas with different names are mapped to the same element in the composite schema via some set of guiding metadata.

## Composable

For a given set of subschemas, it may be impossible to generate a valid composite schema that contains all GraphQL elements of all of the individual subschemas. This set of subchemas is then considered to be "not composable." Inversely, if a composite schema can be generated for a given set of subschemas, this set of subschemas is considered "composable."

## Merging and Mergability

The following terms will be avoided by this RFC until consensus is achieved on a specific meaning that enhances the lexicon: "schema merging," "schema stitching," "schema federation," "type federation."

However, the term "merging" will be used as follows: When a set of subschemas with overlapping elements is composable, all overlapping GraphQL elements will be considered to have been "merged" succesfully. If a set of subschemas contains even a single set of overlapping GraphQL elemeents that cannot be "merged," then the subschemas are not composable. If all GraphQL entities within the subschemas are "mergable," then the subschemas are composable.

The terms "type merging," "field merging," "argument merging," etc., are therefore all well defined. The terms "schema merging" or "subschema merging" are not well defined by this definition, as schemas/subschemas do not "overlap" and therefore cannot be merged.

## Namespacing

A set of potentially "overlapping" types in subschemas may be considered to have been "namespaced" if they have been adjusted in some way so as to longer be overlapping. For example, identically named types in different subschemas may be namespaced by utilizing some form of metadata to map the identically named types to different types in the composite schema. Or, when metadata denotes types as overlapping in the first instance, namespacing may be accomplished simply by adjusting the existing metadata or additional additional metadata. Finally, a new namespace construct may be introduced into the GraphQL specification itself such that multiple, different types with the same name could be organized into separate namespaces without conflict. In any of these situations, the "namespaced" types no longer overlap and no longer _require_ merging, and there is no potential impediment to composability. 

## Composability in Relation to Types of Composition

Many types of schema composition exist, with potential distinctions including (but not limited to):

### Timing of Composition

1. "Build-time" composition in which the composite schema is created during a build process prior to system start-up. 
2. "Run-time" composition in which the composite schema is created dynamically at system start-up.
3. "Dynamic" composition , in that subschemas are polled by a managing service (or report changes to a managing service), such that the composition process can be triggered at or after system start-up and that the composite schema is dynamically refreshed as the subschemas change (or go offline!).

### Method of Composite Schema Execution

1. `Subschemas as remote GraphQL services`: in certain forms of composition (gateways, gateway schemas, etc.), the execution of a request against a composite schema will yields request(s) against spec-compliant (or even non-spec compliant) GraphQL subservices that are then merged into a single request.
2. `Single-service composite schema execution`: Often, especially when utilizing "build-time" composition, a single service executes the composite schema without delegation to remote services tied to each subschema. 

The below RFC is meant to be useful across all varieties of schema composition. Because all forms of schema composition require a composite schema, we can speak of "composability" without referring to the timing of composition or the type of execution. However, when relevant, reference will be made to underlying technical factors which affect "composability." Practically speaking, the method of composite schema execution matters more than the timing of composition. If a request against the composite schema must ultimately be translated to request(s) against the still extant source subschemas, then the composition must be -- in some sense -- reversed during execution, an additional strenuous requirement.

# Scalars

1. The specified scalars (Int, Float, String, Boolean, ID) can each be merged across subschemas, because they are identical in all subschemas. 
2. Custom scalars can be merged across subschemas, _as long as the parsing/serialization of values is performed in the identical manner across all subschemas._
   - This important condition/qualification may be difficult to verify!
   - The `specifiedByURL` field may be helpful in this regard.

# Enums

1. Overlapping enum types where the types define identical sets of values can always be merged, as they are identical in all subschemas.
2. Subschemas with overlapping enum types where the disparate types define different value sets are only sometimes composable.
   - When using `Single-service composite schema execution`, the enum types can be merged as a union of values from all subschemas.
   - When using `Subschemas as remote GraphQL services`
     - If the enum types are used only in output types, the enum types can be merged as a union of values from all subschemas.
     - If the enum types are used in input types, the enum types can be merged if and only if there is a way to translate, for any given subschema, every enum value that is defined only in the composite schema to an enum value defined for that subschema.

# Input Object Types

1. Overlapping input object types can be merged, as long as the overlapping input fields can be merged.
2. If some of the types define fields not defined by the other types, the fields of these input objects may no longer affect the execution of portions of the subschema, in ways that may be unpredictable for users of the composite schema. Although clear documentation may ameliorate this issue, overall, the user experience may suffer. 

# Input Object Fields

1. Overlapping input object fields can be merged as long as the fields define the same type, allowing for variations in nullability.
2. If any of the field types contain non-nullable portions, the field types must be merged as non-nullable for that portion.
3. TODO: discuss default values.

WIP! will be edited.
