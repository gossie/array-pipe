import Operator from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

class FilterOperation<T> implements Operator<T, T> {

    constructor(private tester: Predicate<T>) {}

    public perform(from: T): T {
        if (this.tester(from)) {
            return from;
        } else {
            return undefined;
        }
    }
}

export default function filter<T>(tester: Predicate<T>): Operator<T, T> {
    if(typeof(tester) !== 'function') {
        throw new TypeError(tester + ' is not a function!');
    }

    return new FilterOperation<T>(tester);
}
