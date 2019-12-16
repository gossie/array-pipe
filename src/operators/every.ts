import { TerminalOperator, OperatorResult } from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

class EveryOperator<T> extends TerminalOperator<T, boolean> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    public getFallbackValue(): boolean {
        return true;
    }

    public perform(from: T): OperatorResult<boolean> {
        if (!this.tester(from)) {
            return {
                value: false,
                skip: false,
                needsFlattening: false
            };
        }
        return {
            value: null,
            skip: true,
            needsFlattening: false
        };
    }
}

export default function every<T>(tester: Predicate<T>): TerminalOperator<T, boolean> {
    return new EveryOperator<T>(tester);
}