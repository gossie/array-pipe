import { TerminalOperator, none } from '../src/operators';

describe('none', () => {

    it('should be terminal', () => {
        const operator: TerminalOperator<any, any> = none((n: number) => n%2 === 0);
        expect(operator.isTerminal()).toBeTruthy();
    });

    it('should have a fallback value', () => {
        const operator: TerminalOperator<any, any> = none((n: number) => n%2 === 0);
        expect(operator.getFallbackValue()).toBeTruthy();
    });

    it('should not match', () => {
        const operator: TerminalOperator<any, any> = none((n: number) => n%2 === 0);
        expect(operator.perform(4)).toEqual({
            value: false,
            done: true
        });
    });

    it('should match', () => {
        const operator: TerminalOperator<any, any> = none((n: number) => n%2 === 0);
        expect(operator.perform(5)).toEqual({
            value: true,
            done: false
        });
    });
});