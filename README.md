[![Build Status](https://travis-ci.org/gossie/array-pipe.svg?branch=master)](https://travis-ci.org/gossie/array-pipe)


# array-pipe

The project defines a pipe method as a polyfill for arrays, that enables developers to perform multiple operations with only iterating over as few elements as possible.<br/>
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
The pipe polyfill with its operators will get the same result, but it won't map all elements before the check. Each element will be handled by all operators (or if the element doesn't match a filter operator) before the next element is processed. As soon as a result is found, it is returned and the handling is stopped.<br/>
The following table illustrates how the elements are streamed throught the operators.

|      | |map operator|some operator|                                                               |
|------|-|------------|-------------|---------------------------------------------------------------|
|Step 1| |         '1'|             |'1' is mapped                                                  |
|Step 2| |            |            1|1 is checked -> check fails                                    |
|Step 3| |         '2'|             |'2' is mapped                                                  |
|Step 4| |            |            2|2 is checked -> check succeeds and true is returned by the pipe|

No more elements are mapped or checked, because it is not necessary.

## Current Operators

### Intermetiate Operators

There can be as many intermediate operators as you want in a pipe. In an intermediate operator is the last operator of a pipe, the result of the pipe call will be an array.

* __filter__
Gets a function that takes an element and returns a boolean. The elements where the function returns true survive.
* __map__
Gets a function and applies each element to that function.
* __flatMap__
The operator gets a function that maps to an array of elements and flattens them.
* __distinct__
Removes duplicated elements. It's important to not, that this is a statefull operator.

### Terminal Operators

A terminal operator has to be the last one in a pipe. Also, there can only be on terminal operator in a pipe.

* __first__
Gets a function that takes an element and returns a boolean. If an element is evaluated to true that element is immediately returned by the pipe.
* __some__
Some works similar to the `first`-operator except that not the element is returned, but the value `true` as soon as the passed function evaluates to true.
* __every__
`every` also applies the passed function to each element. As soon as one element does not evaluate to `true` the pipe immediately returns `false`. 

## When is it usefull?

If your code always needs to perform all operations on all elements in your array, you probably should stick to the original JavaScript methods. The pipe is only usefull if you use the `first`, `some` or `every` operator as last operator.<br/>
Another case for using the pipe would be, if you need to write your own operator.

## Integration

After you installed the npm dependency you need to import @gossie/array-pipe so that the polyfill is activated. In addition the operators you want to use need to be imported. For the example above, it would look like this:
```typescript
import '@gossie/array-pipe';
import map from '@gossie/array-pipe/operators/map';
import some from '@gossie/array-pipe/operators/some';
```

## Try it out

Go to the [array-pipe Test application](https://gossie.github.io/array-pipe-test-app) to compare different implementations.
