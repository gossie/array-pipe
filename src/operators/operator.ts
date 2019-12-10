export default interface Operator<F, T> {
    perform(from: F): T;
}