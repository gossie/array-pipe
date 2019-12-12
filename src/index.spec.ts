import './index';
import filter from './operators/filter';
import map from './operators/map';
import distinct from './operators/distinct';
import first from './operators/first';
import some from './operators/some';
import every from './operators/every';

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

    it('should pipe and return true because some elements match criteria', () => {
        const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            .pipe(
                map((n: string) => parseInt(n)),
                some((n: number) => n > 5 && n < 10)
            );
        
        expect(result).toBeTrue();
    });

    it('should pipe and return false because no element matches criteria', () => {
        const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            .pipe(
                map((n: string) => parseInt(n)),
                some((n: number) => n >= 10)
            );
        
        expect(result).toBeFalse();
    });

    it('should pipe and return true because all elements match criteria', () => {
        const result: number = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20']
            .pipe(
                map((n: string) => parseInt(n)),
                every((n: number) => n%2 === 0)
            );
        
        expect(result).toBeTrue();
    });

    it('should pipe and return false because not all elements match criteria', () => {
        const result: number = ['2', '4', '6', '8', '11', '12', '14', '16', '18', '20']
            .pipe(
                map((n: string) => parseInt(n)),
                every((n: number) => n%2 === 0)
            );
        
        expect(result).toBeFalse();
    });

    it('should pipe undefined and null values', () => {
        const undefinedMapper = (s: string) => {
            if (s === undefined || s === null) {
                return '0';
            }
            return s;
        };

        const result: Array<number> = ['2', '4', '6', '-', null, '12', '14', undefined]
            .pipe(
                filter((s: string) => s !== '-'),
                map(undefinedMapper),
                map((s: string) => parseInt(s))
            );

        expect(result).toEqual([2, 4, 6, 0, 12, 14, 0]);
    });
})
