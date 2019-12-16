import { TerminalOperator, OperatorResult } from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

class FirstOperator<T> extends TerminalOperator<T, T> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    public getFallbackValue(): T {
        return null;
    }

    public perform(from: T): OperatorResult<T> {
        return {
            value: from,
            skip: !this.tester(from),
            needsFlattening: false
        };
    }
}

export default function first<T>(tester: Predicate<T>): TerminalOperator<T, T> {
    return new FirstOperator<T>(tester);
}
