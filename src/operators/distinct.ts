import { IntermediateOperator, OperatorResult } from "./operator";

class DistinctOperator extends IntermediateOperator<any, any> {

    private pastValues: Set<any> = new Set();

    public perform(from: any): OperatorResult<any> {
        if (this.pastValues.has(from)) {
            return {
                value: from,
                skip: true,
                needsFlattening: false
            };
        } else {
            this.pastValues.add(from);
            return {
                value: from,
                skip: false,
                needsFlattening: false
            };
        }
    }
}

export default function distinct(): IntermediateOperator<any, any> {
    return new DistinctOperator();
};
