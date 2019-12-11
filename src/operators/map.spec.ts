import map from './map';
import Operator from './operator';

describe('map', () => {

    it('should map', () => {
        const operator: Operator<number, number> = map((item: number) => item + 1);
        expect(operator.performChain(4)).toBe(5);
    });

})
