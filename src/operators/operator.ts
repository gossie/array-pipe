export default interface Operator<F, T> {
    (from: F): T;
}