import { IntermediateOperator } from "./operator";

class DistinctOperator extends IntermediateOperator<any, any> {

    private pastValues: Set<any> = new Set();

    protected perform(from: any): any {
        if (this.pastValues.has(from)) {
            return undefined;
        } else {
            this.pastValues.add(from);
            return from;
        }
    }
}

export default function distinct(): IntermediateOperator<any, any> {
    return new DistinctOperator();
};
