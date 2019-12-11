import './pipe';
import filter from './operators/filter';
import map from './operators/map';
import distinct from './operators/distinct';
import first from './operators/first';
import some from './operators/some';

describe('pipe', () => {

    it('should throw error if no operators are passed', () => {
        expect([0, 1, 2, 3].pipe()).toEqual([0, 1, 2, 3]);
    });

    it('should pipe and return an array', () => {
        const result: Array<string> = [0, 1, 1, 2, 3, 4, 2, 5, 6, 7, 2, 8, 9]
            .pipe(
                filter((n: number) => n%2 == 0),
                distinct(),
                map((n: number) => n * 2),
                map((n: number) => `${n} is even and doubled`)
            );
        
        expect(result).toEqual(['0 is even and doubled', '4 is even and doubled', '8 is even and doubled', '12 is even and doubled', '16 is even and doubled']);
    });

    it('should pipe and return the first value that matches the criteria', () => {
        const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            .pipe(
                map((n: string) => parseInt(n)),
                first((n: number) => n%2 === 0)
            );
        
        expect(result).toEqual(2);
    });

    it('should pipe and return undefined', () => {
        const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            .pipe(
                map((n: string) => parseInt(n)),
                first((n: number) => n%10 === 0)
            );
        
        expect(result).toEqual(undefined);
    });

    it('should pipe and return true', () => {
        const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            .pipe(
                map((n: string) => parseInt(n)),
                some((n: number) => n > 5 && n < 10)
            );
        
        expect(result).toBeTrue();
    });

    it('should pipe and return false', () => {
        const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            .pipe(
                map((n: string) => parseInt(n)),
                some((n: number) => n >= 10)
            );
        
        expect(result).toBeFalse();
    });
})
