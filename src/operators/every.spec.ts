import { Operator, TerminalOperator } from "./operator";
import every from './every';

describe('every', () => {

    it('should be terminal', () => {
        const operator: Operator<number, boolean> = every((n: number) => n%2 === 0);
        expect(operator.isTerminal()).toBeTruthy();
    });

    it('should have fallback value', () => {
        const operator: TerminalOperator<number, boolean> = every((n: number) => n%2 === 0);
        expect(operator.getFallbackValue()).toBeTruthy();
    });

    it('should match criteria', () => {
        const operator: Operator<number, boolean> = every((n: number) => n%2 === 0);
        expect(operator.perform(4)).toEqual({
            value: null,
            skip: true,
            needsFlattening: false
        });
    });

    it('should not match criteria', () => {
        const operator: Operator<number, boolean> = every((n: number) => n%2 === 0);
        expect(operator.perform(5)).toEqual({
            value: false,
            skip: false,
            needsFlattening: false
        });
    });

});