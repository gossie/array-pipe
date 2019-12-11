import distinct from './distinct';
import Operator from './operator';

describe('distinct', () => {

    it('should remove duplicated values', () => {
        const operator: Operator<any, any> = distinct();

        expect(operator.performChain(5)).toBe(5);
        expect(operator.performChain(6)).toBe(6);
        expect(operator.performChain(5)).toBe(undefined);
    });
});
