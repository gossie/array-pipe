import map from './map';
import { Operator } from './operator';

describe('map', () => {

    it('should not be terminal', () => {
        const operator: Operator<number, number> = map((item: number) => item + 1);
        expect(operator.isTerminal()).toBeFalsy();
    });

    it('should map', () => {
        const operator: Operator<number, number> = map((item: number) => item + 1);
        expect(operator.performChain(4)).toEqual({
            value: 5,
            skip: false
        });
    });

})
