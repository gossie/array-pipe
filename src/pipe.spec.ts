import './pipe';
import filter from './operators/filter';
import map from './operators/map';

describe('pipe', () => {

    it('should throw error if no operators are passed', () => {
        expect(() => [0, 1, 2, 3].pipe()).toThrow(new Error('no operators were provided'));
    });

    it('should pipe', () => {
        const result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            .pipe(
                filter(n => n%2 === 0),
                map(n => n + 1)
            );
        
        expect(result).toEqual([1, 3, 5, 7, 9]);
    });
})
