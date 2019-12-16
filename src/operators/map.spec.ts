import map from './map';
import { Operator } from './operator';

describe('map', () => {

    it('should not be terminal', () => {
        const operator: Operator<number, number> = map((item: number) => item + 1);
        expect(operator.isTerminal()).toBe(false);
    });

    it('should map', () => {
        const operator: Operator<number, number> = map((item: number) => item + 1);
        expect(operator.perform(4)).toEqual({
            value: 5,
            skip: false,
            needsFlattening: false
        });
    });

})
