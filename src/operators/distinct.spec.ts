import distinct from './distinct';
import Operator from './operator';

describe('distinct', () => {

    it('should remove duplicated values', () => {
        const operator: Operator<any, any> = distinct();

        expect(operator.perform(5)).toBe(5);
        expect(operator.perform(6)).toBe(6);
        expect(operator.perform(5)).toBe(undefined);
    });
});
