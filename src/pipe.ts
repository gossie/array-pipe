import Operator from "./operators/operator";

declare global {
    interface Array<T> {
        pipe(...operators: Array<Operator<any, any>>): Array<any>
    }
}

if (!Array.prototype.pipe) {
    Array.prototype.pipe = function pipe(...operators: Array<Operator<any, any>>): Array<any> {
        if (!operators || operators.length === 0) {
            throw new Error('no operators were provided');
        }

        const result: Array<any> = [];
        this.forEach((element: any) => handleElement(element, operators, result));
        return result;
    };
}

function handleElement(element: any, operators: Array<Operator<any, any>>, result: Array<any>) {
    let value: any = element;

    for (let i=0; i<operators.length; i++) {
        value = operators[i].perform(value);
        if (value === undefined) break;
    }
    
    if (value !== undefined) {
        result.push(value);
    }
}
