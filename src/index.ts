import { Operator, TerminalOperator, OperatorResult } from './operators/operator';

class ChainedOperator<F, T> {
    constructor(private delegate: Operator<F, T>,
                 private next: ChainedOperator<T, any>) {}

    public performChain(from: F): OperatorResult<T> {
        let result: OperatorResult<T>;
        const to: OperatorResult<T> = this.delegate.perform(from);
        if (!to.skip && this.next !== undefined) {
            result = this.next.performChain(to.value);
        } else {
            result = to;
        }
        return result;
    }
}

function checkOperators(operators: Array<Operator<any, any>>): void {
    let terminalOperators: number = 0;
    let foundIntermediate: boolean = false;
    for (let i=operators.length - 1; i>=0; i--) {
        if(!operators[i].isTerminal()) {
            foundIntermediate = true;
        } else {
            ++terminalOperators;
            if (terminalOperators > 1) {
                throw Error('there can only be one terminal operator');
            } else if (foundIntermediate) {
                throw Error('terminal operator has to be the last one');
            }
        }
    }
}

function determineRootOfChain(operators: Array<Operator<any, any>>): ChainedOperator<any, any> {
    let chainedOperator: ChainedOperator<any, any> = undefined;
    for (let i=operators.length - 1; i>=0; i--) {
        chainedOperator = new ChainedOperator(operators[i], chainedOperator);
    }
    return chainedOperator;
}

declare global {
    interface Array<T> {
        pipe(...operators: Array<Operator<any, any>>): Array<any> | any
    }
}

if (!Array.prototype.pipe) {
    Array.prototype.pipe = function pipe(...operators: Array<Operator<any, any>>): Array<any> | any {
        let result: Array<any> | any;
        if (!operators || operators.length === 0) {
            result = this;
        } else {
            checkOperators(operators);

            const root: ChainedOperator<any, any> = determineRootOfChain(operators);
            const lastOperator: Operator<any, any> = operators[operators.length - 1];
            if (lastOperator.isTerminal()) {
                for (let i=0; i<this.length; i++) {
                    const value: OperatorResult<any> = root.performChain(this[i]);
                    if (!value.skip) {
                        result = value.value;
                        break;
                    }
                }
                if (result == null) {
                    result = (lastOperator as TerminalOperator<any, any>).getFallbackValue();
                }
            } else {
                result = []
                for (let i=0; i<this.length; i++) {
                    const value: OperatorResult<any> = root.performChain(this[i]);
                    if (!value.skip) {
                        result.push(value.value);
                    }
                }
            }
        }
        return result;
    };
}
