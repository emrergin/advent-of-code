# Advent Of Code Solutions

[Advent of Code](https://adventofcode.com/) Solutions, done using Javascript, Typescript and C# and Java.

### What I learned

- `Number.MIN_SAFE_INTEGER` can be used as a starting point for finding maximum of a set, instead of `-Infinity`.
- `Array.fill` passes the objects with reference.
  - See: https://stackoverflow.com/questions/35578478/array-prototype-fill-with-object-passes-reference-and-not-new-instance
- Number has a convenient `EPSILON` property.
- Even the "BigInt" literal type has an upper bound, albeit not specified anywhere. Differently from "Number", if one overshoots the bound, they don't end up with Infinity, instead it is truncated.
- One must try to manipulate the data using least common multiples dealing with huge numbers.
- `Set.delete()` does not return the set, it returns a boolean.
- I used this challenge to learn Java! Check out: https://github.com/emrergin/advent-of-code/tree/main/2018
- While typing my custom Heap structure, I realized that intersection types do not override duplicate property types, instead require them to be compatible.
- 2023 day 17 includes my first implementation of A-star algorithm. I implemented Dijkstra before, [here](https://github.com/emrergin/practice_codes/blob/main/part2/dijkstra.js), but not for graphs with arbitrary constraints.
- I used this challenge to learn C#! Check out: https://github.com/emrergin/advent-of-code/tree/main/2017 and https://github.com/emrergin/advent-of-code/tree/main/2025

### Influences

- I had to skim through solutions of others once, in Day 7, Part 2, 2019. While doing so, I found the following repo really useful: https://github.com/romellem/advent-of-code.
- [Brian Bucklew](https://twitter.com/unormal) was the one that suggested me to check this website out. He also nudged me to the correct direction more than once.
- For [2017 Day 11](https://adventofcode.com/2017/day/11) the following link made the task almost trivial: https://www.redblobgames.com/grids/hexagons/
