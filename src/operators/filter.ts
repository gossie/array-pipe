import Operator from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

export default function filter<T>(tester: Predicate<T>): Operator<T, T> {
    if(typeof(tester) !== 'function') {
        throw new TypeError(tester + ' is not a function!');
    }

    return (item: T) => {
        if (tester(item)) {
            return item;
        } else {
            return undefined;
        }
    }
}
