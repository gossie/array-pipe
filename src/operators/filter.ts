import Operator from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

class FilterOperation<T> extends Operator<T, T> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    public perform(from: T): T {
        return this.tester(from) ? from : undefined;
    }
}

export default function filter<T>(tester: Predicate<T>): Operator<T, T> {
    return new FilterOperation<T>(tester);
}
