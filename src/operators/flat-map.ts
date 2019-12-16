import { IntermediateOperator, OperatorResult } from './operator';

interface Mapper<F, T> {
    (from: F): T;
}

class FlatMapOperator<F, T> extends IntermediateOperator<F, T> {

    constructor(private mapper: Mapper<F, T>) {
        super();
    }

    public perform(from: F): OperatorResult<T> {
        return {
            value: this.mapper(from),
            skip: false,
            needsFlattening: true
        };
    }

}

export default function flatMap<F, T extends Array<any>>(mapper: Mapper<F, T>): IntermediateOperator<F, T> {
    return new FlatMapOperator<F, T>(mapper);
}