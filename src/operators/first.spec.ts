import first from './first';
import { Operator } from './operator';

describe('first', () => {

    it('should be terminal', () => {
        const operator: Operator<number, number> = first((n: number) => n%2 === 0);
        expect(operator.isTerminal).toBeTruthy();
    });

    it('should find value', () => {
        const operator: Operator<number, number> = first((n: number) => n%2 === 0);
        expect(operator.performChain(4)).toBe(4);
    });

    it('should not find value', () => {
        const operator: Operator<number, number> = first((n: number) => n%2 === 0);
        expect(operator.performChain(5)).toBe(undefined);
    });
})