import { TerminalOperator, OperatorResult } from "./operator";


interface Predicate<T> {
    (item: T): boolean;
}

class SomeOperator<T> extends TerminalOperator<T, boolean> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    public getFallbackValue(): boolean {
        return false;
    }

    public perform(from: T): OperatorResult<boolean> {
        if (this.tester(from)) {
            return {
                value: true,
                skip: false
            };
        }
        return {
            value: undefined,
            skip: true
        };
    }
}

export default function some<T>(tester: Predicate<T>): TerminalOperator<T, boolean> {
    return new SomeOperator<T>(tester);
}