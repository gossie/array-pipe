[![Build Status](https://github.com/gossie/array-pipe/workflows/ci/badge.svg)](https://github.com/gossie/array-pipe/actions?query=workflow%3Aci+branch%3Amaster)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fgossie%2Farray-pipe%2Fmaster)](https://stryker-mutator.github.io)


# array-pipe

* [Current operators](#currentoperator)
* [Write your own operator](#customoperator)
* [When is it usefull to use array-pipe?](#usecases)
* [Integration](#integration)
* [Try it out](#testout)

The project defines a pipe method as a polyfill for arrays, that enables developers to perform multiple operations with only iterating over as few elements as possible.<br />
Imagine you have an array of string encoded numbers and want to check if there is one that is dividable by two.
```typescript
const result: boolean = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    .map((s: string) => parseInt(s))
    .some((n: number) => n%2 === 0);
```
The code does what it is supposed to. But it will iterate over the whole array mapping all elements before checking the dividability.
Using the pipe polyfill would look like this:
```typescript
const result: boolean = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    .pipe(
        map((s: string) => parseInt(s)),
        some((n: number) => n%2 === 0)
    );
```
The pipe polyfill with its operators will get the same result, but it won't map all elements before the check. Each element will be handled by all operators (or if the element doesn't match a filter operator) before the next element is processed. As soon as a result is found, it is returned and the handling is stopped.<br />
The following table illustrates how the elements are streamed throught the operators.

|      | |map operator|some operator|                                                               |
|------|-|------------|-------------|---------------------------------------------------------------|
|Step 1| |         '1'|             |'1' is mapped                                                  |
|Step 2| |            |            1|1 is checked -> check fails                                    |
|Step 3| |         '2'|             |'2' is mapped                                                  |
|Step 4| |            |            2|2 is checked -> check succeeds and true is returned by the pipe|

No more elements are mapped or checked, because it is not necessary.

<a name="currentoperator"></a>
## Current Operators

### Intermetiate Operators

There can be as many intermediate operators as you want in a pipe. In an intermediate operator is the last operator of a pipe, the result of the pipe call will be an array.

* __filter__<br />
Gets a function that takes an element and returns a boolean. The elements where the function returns true survive.
* __map__<br />
Gets a function and applies each element to that function.
* __flatMap__<br />
The operator gets a function that maps to an array of elements and flattens them.
* __distinct__<br />
Removes duplicated elements. It's important to note, that this is a statefull operator.

### Terminal Operators

A terminal operator has to be the last one in a pipe. Also, there can only be on terminal operator in a pipe.

* __find__<br />
Gets a function that takes an element and returns a boolean. If an element is evaluated to true that element is immediately returned by the pipe.
* __some__<br />
Some works similar to the `first`-operator except that not the element is returned, but the value `true` as soon as the passed function evaluates to true.
* __every__<br />
`every` also applies the passed function to each element. As soon as one element does not evaluate to `true` the pipe immediately returns `false`. 
* __none__<br />
`none` also applies the passed function to each element. As soon as one element evaluates to `true` the pipe immediately returns `false`. 

<a name="customoperator"></a>
## Write your own operator

You might have the need to write your own operator.<br />
The easiest way is, to extend either `IntermediateOperator` or `TerminalOperator`. In this example an operator is implemented that returns the sum of the first n elements, where the n is passed a the `limit` Parameter.<br />
All you need to do then, is implement the `perform` method and, in case of a `TerminalOperator`, the `getFallbackValue` method. The gets passed an element from the array and returns an `OperatorResult`. The `OperatorResult` contains the resulting value of the operation and some other information. For a `TerminalOperator` it needs to contain a `done` attribute that tells the pipe, if it can stop the execution or has to go on. An `IntermediateOperator` does not need the `done` attribute but can contain an option `skip` attribute. That tells the pipe if the value will be part of the result or not.
```typescript
import { TerminalOperator } from '@gossie/array-pipe/operators';

class LimitedSumOperator extends TerminalOperator<number, number> {

    private sum = 0;
    private iterations = 0;

    constructor(private limit: number) {
        super();
    }

    public perform(from: number): OperatorResult<number> {
        ++this.iterations;
        this.sum += from;
        return {
            value: this.sum,
            done: this.iterations == this.limit
        };
    }

    public getFallbackValue(): number {
        return 0;
    }
}
```
After you implemented the operator class you can export a function that returns an instance of your operator.
```typescript
export function limitedSum(n: number): Operator<number, number> {
    return new LimitedSumOperator(n);
}
```
Then you can use your custom operator like the others.
```typescript
const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    .pipe(
        map((s: string) => parseInt(s)),
        limitedSum(5)
    );
```
The result should be 15.

<a name="usecases"></a>
## When is it usefull to use array-pipe?

If your code always needs to perform all operations on all elements in your array, you probably should stick to the original JavaScript methods. The pipe is only usefull if you use a terminal operator as last operator.<br />
Another case for using the pipe would be, if you need to write your own operator.

<a name="integration"></a>
## Integration

After you installed the npm dependency you need to import @gossie/array-pipe so that the polyfill is activated. In addition the operators you want to use need to be imported. For the example above, it would look like this:
```typescript
import '@gossie/array-pipe';
import { map, some } from '@gossie/array-pipe/operators';
```

<a name="testout"></a>
## Try it out

Go to the [array-pipe Test application](https://gossie.github.io/array-pipe-test-app) to compare different implementations.
