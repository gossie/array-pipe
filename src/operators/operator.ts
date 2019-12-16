export interface OperatorResult<T> {

    value: T;
    skip: boolean;
    needsFlattening: boolean;

}

export abstract class Operator<F, T> {

    protected next: Operator<T, any>;

    public abstract perform(from: F): OperatorResult<T>;

    public abstract isTerminal(): boolean;

}

export abstract class TerminalOperator<F, T> extends Operator<F, T> {
    public isTerminal() {
        return true;
    }

    public abstract getFallbackValue(): T;
}

export abstract class IntermediateOperator<F, T> extends Operator<F, T> {
    public isTerminal() {
        return false;
    }
}