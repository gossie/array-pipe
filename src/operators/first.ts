import Operator from "./operator";

interface Predicate<T> {
    (item: T): boolean;
}

class FirstOperator<T> extends Operator<T, T> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    public isTerminal(): boolean {
        return true;
    }

    protected perform(from: T): T {
        return this.tester(from) ? from : undefined;
    }
}

export default function first<T>(tester: Predicate<T>): Operator<T, T> {
    return new FirstOperator<T>(tester);
}
