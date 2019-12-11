import { TerminalOperator } from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

class FirstOperator<T> extends TerminalOperator<T, T> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    public getDefaultValue(): T {
        return undefined;
    }

    protected perform(from: T): T {
        return this.tester(from) ? from : undefined;
    }
}

export default function first<T>(tester: Predicate<T>): TerminalOperator<T, T> {
    return new FirstOperator<T>(tester);
}
