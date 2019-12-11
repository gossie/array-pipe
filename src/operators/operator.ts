export default abstract class Operator<F, T> {

    protected next: Operator<T, any>;

    protected abstract perform(from: F): T;

    public abstract isTerminal(): boolean;

    public performChain(from: F): any {
        const to: T = this.perform(from);
        if (this.next !== undefined && to !== undefined) {
            return this.next.performChain(to);
        } else {
            return to;
        }
    }

    public setSuccessor(next: Operator<T, any>): void {
        this.next = next;
    }

}