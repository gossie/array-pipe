[![Build Status](https://travis-ci.org/gossie/array-pipe.svg?branch=master)](https://travis-ci.org/gossie/array-pipe)


# array-pipe

The projects define a pipe method as a polyfill for arrays, that enables the developer to perform multiple operations with only iterating over the array once.
Imagin you have an array of numbers, want to drop all odd numbers, multiply the others with two and then concat a string. 
```typescript
const result: Array<string> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .filter((n: number) => n%2 === 0)
    .map((n: number) => n * 2)
    .map((n: number) => `${n} is even and doubled`);
```
The code does what it is supposed to, but it will iterate three times over the array.
The pipe polyfill with its operators will get the same result, but only needs to iterate over the array once.
```typescript
const result: Array<string> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .pipe(
        filter((n: number) => n%2 == 0),
        map((n: number) => n * 2),
        map((n: number) => `${n} is even and doubled`)
    );
```

# Operators

* filter
* map