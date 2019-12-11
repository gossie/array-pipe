import Operator from "./operator";

class DistinctOperator extends Operator<any, any> {

    private pastValues: Set<any> = new Set();

    public perform(from: any): any {
        if (this.pastValues.has(from)) {
            return undefined;
        } else {
            this.pastValues.add(from);
            return from;
        }
    }
}

export default function distinct(): Operator<any, any> {
    return new DistinctOperator();
};
