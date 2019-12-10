import './pipe';
import filter from './operators/filter';
import map from './operators/map';

describe('pipe', () => {

    it('should throw error if no operators are passed', () => {
        expect(() => [0, 1, 2, 3].pipe()).toThrow(new Error('no operators were provided'));
    });

    it('should pipe', () => {
        const result: Array<string> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            .pipe(
                filter((n: number) => n%2 == 0),
                map((n: number) => n * 2),
                map((n: number) => `${n} is even and doubled`)
            );
        
        expect(result).toEqual(['0 is even and doubled', '4 is even and doubled', '8 is even and doubled', '12 is even and doubled', '16 is even and doubled']);
    });
})
