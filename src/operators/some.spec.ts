import { Operator, TerminalOperator } from "./operator";
import some from './some';

describe('some', () => {

    it('should be terminal', () => {
        const operator: Operator<number, boolean> = some((n: number) => n%2 === 0);
        expect(operator.isTerminal()).toBeTruthy();
    });

    it('should have fallback value', () => {
        const operator: TerminalOperator<number, boolean> = some((n: number) => n%2 === 0);
        expect(operator.getFallbackValue()).toBeFalse();
    });

    it('should match criteria', () => {
        const operator: Operator<number, boolean> = some((n: number) => n%2 === 0);
        expect(operator.performChain(4)).toEqual({
            value: true,
            skip: false
        });
    });

    it('should not match criteria', () => {
        const operator: Operator<number, boolean> = some((n: number) => n%2 === 0);
        expect(operator.performChain(5)).toEqual({
            value: undefined,
            skip: true
        });
    });

});