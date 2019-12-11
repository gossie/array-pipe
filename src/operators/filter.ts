import { IntermediateOperator } from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

class FilterOperator<T> extends IntermediateOperator<T, T> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    protected perform(from: T): T {
        return this.tester(from) ? from : undefined;
    }
}

export default function filter<T>(tester: Predicate<T>): IntermediateOperator<T, T> {
    return new FilterOperator<T>(tester);
}
