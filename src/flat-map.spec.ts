import { IntermediateOperator, flatMap } from './operators';

describe('flatMap', () => {

    it('should not be terminal', () => {
        const operator: IntermediateOperator<number, Array<number>> = flatMap((item: number) => [item, item + 1]);
        expect(operator.isTerminal()).toBe(false);
    });

    it('should flatMap', () => {
        const operator: IntermediateOperator<number, Array<number>> = flatMap((item: number) => [item, item + 1]);
        expect(operator.perform(5)).toEqual({
            value: [5, 6],
            needsFlattening: true
        });
    });

});
