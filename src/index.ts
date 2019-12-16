import { Operator, TerminalOperator, OperatorResult } from './operators';

class ChainedOperator<F> {
    constructor(private delegate: Operator<F, any>,
                private next: ChainedOperator<any>) {}

    public performChain(from: F): OperatorResult<any> {
        let result: OperatorResult<any>;
        const to: OperatorResult<any> = this.delegate.perform(from);
        if (!to.skip && this.next) {
            if (to.needsFlattening) {
                const tmp: Array<any> = [];
                for (let i=0; i<to.value.length; i++) {
                    const value: OperatorResult<any> = this.next.performChain(to.value[i]);
                    tmp.push(value.value);
                }
                result = {
                    value: tmp,
                    skip: false,
                    needsFlattening: true
                }
            } else {
                result = this.next.performChain(to.value);
            }
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

function determineRootOfChain(operators: Array<Operator<any, any>>): ChainedOperator<any> {
    let chainedOperator: ChainedOperator<any> = undefined;
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

function handleTerminalPipe(chainedOperator: ChainedOperator<any>, array: Array<any>, lastOperator: Operator<any, any>): any {
    let result: any;
    for (let i=0; i<array.length; i++) {
        const value: OperatorResult<any> = chainedOperator.performChain(array[i]);
        if (!value.skip) {
            result = value.value;
            break;
        }
    }
    if (result == null) {
        result = (lastOperator as TerminalOperator<any, any>).getFallbackValue();
    }
    return result;
}

function handleIntermediatePipe(chainedOperator: ChainedOperator<any>, array: Array<any>): Array<any> {
    const result: Array<any> = []
    for (let i=0; i<array.length; i++) {
        const value: OperatorResult<any> = chainedOperator.performChain(array[i]);
        if (!value.skip) {
            if (value.needsFlattening) {
                for (let j=0; j<value.value.length; j++) {
                    result.push(value.value[j]);
                }
            } else {
                result.push(value.value);
            }
        }
    }
    return result;
}

if (!Array.prototype.pipe) {
    Array.prototype.pipe = function pipe(...operators: Array<Operator<any, any>>): Array<any> | any {
        let result: Array<any> | any;
        if (!operators || operators.length === 0) {
            result = this;
        } else {
            checkOperators(operators);

            const root: ChainedOperator<any> = determineRootOfChain(operators);
            const lastOperator: Operator<any, any> = operators[operators.length - 1];
            const handler = lastOperator.isTerminal() ? handleTerminalPipe : handleIntermediatePipe;

            result = handler(root, this, lastOperator);
        }
        return result;
    };
}
