import Operator from "./operator";

interface Mapper<F, T> {
    (from: F): T;
}

class MapOperator<F, T> extends Operator<F, T> {

    constructor(private mapper: Mapper<F, T>) {
        super();
    }
    
    public perform(from: F): T {
        return this.mapper(from);
    }

}

export default function map<F, T>(mapper: Mapper<F, T>): Operator<F, T> {
    return new MapOperator<F, T>(mapper);
}
