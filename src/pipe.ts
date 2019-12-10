import Operator from "./operators/operator";

declare global {
    interface Array<T> {
        pipe(...operators: Array<Operator<any, any>>): Array<T>
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

    operators.forEach((operator: Operator<any, any>) => value = operator(value));
    if (value) {
        result.push(value);
    }
}
