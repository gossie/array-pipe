import Operator from "./operator";

interface Mapper<F, T> {
    (from: F): T;
}

export default function map<F, T>(mapper: Mapper<F, T>): Operator<F, T> {
    return (item: F) => mapper(item);
}
