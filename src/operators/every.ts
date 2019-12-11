import { TerminalOperator } from "./operator";

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

    protected perform(from: T): boolean {
        if (!this.tester(from)) {
            return false;
        }
        return undefined;
    }
}

export default function every<T>(tester: Predicate<T>): TerminalOperator<T, boolean> {
    return new EveryOperator<T>(tester);
}