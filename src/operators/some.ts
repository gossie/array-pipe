import { TerminalOperator } from "./operator";

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

    protected perform(from: T): boolean {
        return this.tester(from) || undefined;
    }
}

export default function filter<T>(tester: Predicate<T>): TerminalOperator<T, boolean> {
    return new SomeOperator<T>(tester);
}