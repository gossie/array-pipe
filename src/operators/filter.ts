import { IntermediateOperator, OperatorResult } from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

class FilterOperator<T> extends IntermediateOperator<T, T> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    public perform(from: T): OperatorResult<T> {
        return {
            value: from,
            skip: !this.tester(from),
            needsFlattening: false
        };
    }
}

export default function filter<T>(tester: Predicate<T>): IntermediateOperator<T, T> {
    return new FilterOperator<T>(tester);
}
