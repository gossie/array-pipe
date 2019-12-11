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
            result = []
            for (let i=0; i<this.length; i++) {
                let value: any = this[i];
                for (let j=0; j<operators.length; j++) {
                    if (value !== undefined) {
                        value = operators[j].perform(value);
                    }
                }
                if (value !== undefined) {
                    result.push(value);
                }
            }
        }
        return result;
    };
}
