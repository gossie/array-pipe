import filter from './filter';
import { Operator } from './operator';

describe('filter', () => {

    it('should not be terminal', () => {
        const operator: Operator<number, number> = filter((item: number) => item%2 === 0);
        expect(operator.isTerminal()).toBeFalsy();
    });

    it('should match', () => {
        const operator: Operator<number, number> = filter((item: number) => item%2 === 0);
        expect(operator.performChain(4)).toEqual({
            value: 4,
            skip: false
        });
    });

    it('should not match', () => {
        const operator: Operator<number, number> = filter((item: number) => item%2 === 0);
        expect(operator.performChain(5)).toEqual({
            value: 5,
            skip: true
        });
    });

})
