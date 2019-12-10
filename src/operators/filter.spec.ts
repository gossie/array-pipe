import filter from './filter';
import Operator from './operator';

describe('filter', () => {

    it('should match', () => {
        const operator: Operator<number, number> = filter((item: number) => item%2 === 0);
        expect(operator(4)).toBe(4);
    });

    it('should not match', () => {
        const operator: Operator<number, number> = filter((item: number) => item%2 === 0);
        expect(operator(5)).toBe(undefined);
    });

})
