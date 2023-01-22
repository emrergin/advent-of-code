# Advent Of Code Solutions

[Advent of Code](https://adventofcode.com/) Solutions, done using Javascript. Written to be run by Nodejs.

### What I learned

-   `Number.MIN_SAFE_INTEGER` can be used as a starting point for finding maximum of a set, instead of `-Infinity`.
-   `Array.fill` passes the objects with reference.
    -   See: https://stackoverflow.com/questions/35578478/array-prototype-fill-with-object-passes-reference-and-not-new-instance
-   Number has a convenient `EPSILON` property.
-   Even the "BigInt" literal type has an upper bound, albeit not specified anywhere. Differently from "Number", if one overshoots the bound, they don't end up with Infinity, instead it is truncated.
-   One must try to manipulate the data using least common multiples dealing with huge numbers.

### Influences

-   I had to skim through solutions of others once, in Day 7, Part 2, 2019. While doing so, I found the following repo really useful: https://github.com/romellem/advent-of-code.
-   [Brian Bucklew](https://twitter.com/unormal) was the one that suggested me to check this website out. He also nudged me to the correct direction more than once.
