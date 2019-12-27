import { Operator, TerminalOperator, everyReduce } from '../src/operators';

describe('everyReduce', () => {

    it('should be terminal', () => {
        const operator: Operator<number, boolean> = everyReduce((n1: number, n2: number) => (n1+n2)%2 === 0);
        expect(operator.isTerminal()).toBeTruthy();
    });

    it('should have fallback value', () => {
        const operator: TerminalOperator<number, boolean> = everyReduce((n1: number, n2: number) => (n1+n2)%2 === 0);
        expect(operator.getFallbackValue()).toBeTruthy();
    });

    it('should match criteria', () => {
        const operator: Operator<number, boolean> = everyReduce((n1: number, n2: number) => (n1+n2)%2 === 0);
        expect(operator.perform(1)).toEqual({
            value: true,
            done: false
        });

        expect(operator.perform(3)).toEqual({
            value: true,
            done: false
        });
    });

    it('should not match criteria', () => {
        const operator: Operator<number, boolean> = everyReduce((n1: number, n2: number) => (n1+n2)%2 === 0);
        expect(operator.perform(1)).toEqual({
            value: true,
            done: false
        });

        expect(operator.perform(4)).toEqual({
            value: false,
            done: true
        });
    });

});
