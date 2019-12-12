import { Operator, TerminalOperator, OperatorResult } from './operators/operator';

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
            for (let i=1; i<operators.length; i++) {
                operators[i-1].setSuccessor(operators[i]);
            }

            const lastOperator: Operator<any, any> = operators[operators.length - 1];
            if (lastOperator.isTerminal()) {
                for (let i=0; i<this.length; i++) {
                    const value: OperatorResult<any> = operators[0].performChain(this[i]);
                    if (!value.skip) {
                        result = value.value;
                        break;
                    }
                }
                if (result === undefined) {
                    result = (lastOperator as TerminalOperator<any, any>).getFallbackValue();
                }
            } else {
                result = []
                for (let i=0; i<this.length; i++) {
                    const value: OperatorResult<any> = operators[0].performChain(this[i]);
                    if (!value.skip) {
                        result.push(value.value);
                    }
                }
            }
        }
        return result;
    };
}
