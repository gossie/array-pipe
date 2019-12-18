import { Operator, TerminalOperator, some } from './operators';

describe('some', () => {

    it('should be terminal', () => {
        const operator: Operator<number, boolean> = some((n: number) => n%2 === 0);
        expect(operator.isTerminal()).toBeTruthy();
    });

    it('should have fallback value', () => {
        const operator: TerminalOperator<number, boolean> = some((n: number) => n%2 === 0);
        expect(operator.getFallbackValue()).toBe(false);
    });

    it('should match criteria', () => {
        const operator: Operator<number, boolean> = some((n: number) => n%2 === 0);
        expect(operator.perform(4)).toEqual({
            value: true,
            done: true
        });
    });

    it('should not match criteria', () => {
        const operator: Operator<number, boolean> = some((n: number) => n%2 === 0);
        expect(operator.perform(5)).toEqual({
            value: false,
            done: false
        });
    });

});