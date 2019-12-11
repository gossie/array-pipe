[![Build Status](https://travis-ci.org/gossie/array-pipe.svg?branch=master)](https://travis-ci.org/gossie/array-pipe)


# array-pipe

The project defines a pipe method as a polyfill for arrays, that enables developers to perform multiple operations with only iterating over the array once.<br/>
Imagine you have an array of string encoded numbers and want to check if there is one that is dividable by two.
```typescript
const result: boolean = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    .map((s: string) => parseInt(s))
    .some((n: number) => n%2 === 0);
```
The code does what it is supposed to. But it will iterate over the whole array mapping all elements before checking the dividability.<br/>
Using the pipe polyfill would look like this:
```typescript
const result: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    .pipe(
        map((s: string) => parseInt(s)),
        some((n: number) => n%2 === 0)
    );
```
The pipe polyfill with its operators will get the same result, but it won't map all elements before the check. Each element will be handled by all operators before the next element is processed. As soon as a result is found, it is returned and the handling is stopped.<br/>
The following table illustrates how the elements are streamed throught the operators.

|Step| |map operator|some operator|                                                               |
|----|-|------------|-------------|---------------------------------------------------------------|
|   1| |         '1'|             |'1' is mapped                                                  |
|   2| |            |            1|1 is checked -> check fails                                    |
|   3| |         '2'|             |'2' is mapped                                                  |
|   4| |            |            2|2 is checked -> check succeeds and true is returned by the pipe|

No more elements are mapped or checked, because it is not necessary.


The processing of an element stops if it doesn't match the predicate of a fillter operator.

## Current Operators

* filter
* map
* distinct
* first
* some