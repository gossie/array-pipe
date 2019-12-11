import Operator from "./operators/operator";

declare global {
    interface Array<T> {
        pipe(...operators: Array<Operator<any, any>>): Array<any>
    }
}

if (!Array.prototype.pipe) {
    Array.prototype.pipe = function pipe(...operators: Array<Operator<any, any>>): Array<any> {
        let result: Array<any>;
        if (!operators || operators.length === 0) {
            result = this;
        } else {
            for (let i=1; i<operators.length; i++) {
                operators[i-1].setSuccessor(operators[i]);
            }

            result = []
            for (let i=0; i<this.length; i++) {
                const value = operators[0].performChain(this[i]);
                if (value !== undefined) {
                    result.push(value);
                }
            }
        }
        return result;
    };
}
