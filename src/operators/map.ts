import { IntermediateOperator, OperatorResult } from "./operator";

interface Mapper<F, T> {
    (from: F): T;
}

class MapOperator<F, T> extends IntermediateOperator<F, T> {

    constructor(private mapper: Mapper<F, T>) {
        super();
    }

    protected perform(from: F): OperatorResult<T> {
        return {
            value: this.mapper(from),
            skip: false
        };
    }

}

export default function map<F, T>(mapper: Mapper<F, T>): IntermediateOperator<F, T> {
    return new MapOperator<F, T>(mapper);
}
