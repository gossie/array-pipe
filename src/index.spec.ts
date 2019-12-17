import './index';
import { filter, map, flatMap, distinct, find, some, every } from './operators';

describe('pipe', () => {

    describe('falsy operator configuration', () => {
        it('should throw error if terminal operator is not the last one', () => {
            expect(() => {
                ['2', '4', '6', '8', '11', '12', '14', '16', '18', '20']
                    .pipe(
                        every((n: number) => n%2 === 0),
                        map((n: string) => parseInt(n))
                    );
            }).toThrowError('terminal operator has to be the last one');
        });
    
        it('should throw error if there are more than one terminal operators', () => {
            expect(() => {
                ['2', '4', '6', '8', '11', '12', '14', '16', '18', '20']
                    .pipe(
                        map((n: string) => parseInt(n)),
                        every((n: number) => n%2 === 0),
                        find((n: number) => n%2 === 0)
                    );
            }).toThrowError('there can only be one terminal operator');
        });
    });

    describe('operator combinations', () => {
        it('should throw error if no operators are passed', () => {
            expect([0, 1, 2, 3].pipe()).toEqual([0, 1, 2, 3]);
        });
    
        it('should filter', () => {
            const result: Array<string> = [0, 1, 1, 2, 3, 4, 2, 5, 6, 7, 2, 8, 9]
                .pipe(
                    filter((n: number) => n%2 == 0)
                );
            expect(result).toEqual([0, 2, 4, 2, 6, 2, 8]);
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
                    find((n: number) => n%2 === 0)
                );
            
            expect(result).toEqual(2);
        });
    
        it('should pipe and return null', () => {
            const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                .pipe(
                    map((n: string) => parseInt(n)),
                    find((n: number) => n%10 === 0)
                );
            
            expect(result).toBeNull();
        });
    
        it('should pipe and return true because some elements match criteria', () => {
            const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                .pipe(
                    map((n: string) => parseInt(n)),
                    some((n: number) => n > 5 && n < 10)
                );
            
            expect(result).toBeTruthy();
        });
    
        it('should pipe and return false because no element matches criteria', () => {
            const result: number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                .pipe(
                    map((n: string) => parseInt(n)),
                    some((n: number) => n >= 10)
                );
            
            expect(result).toBe(false);
        });
    
        it('should pipe and return true because all elements match criteria', () => {
            const result: number = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20']
                .pipe(
                    map((n: string) => parseInt(n)),
                    every((n: number) => n%2 === 0)
                );
            
            expect(result).toBeTruthy();
        });
    
        it('should pipe and return false because not all elements match criteria', () => {
            const result: number = ['2', '4', '6', '8', '11', '12', '14', '16', '18', '20']
                .pipe(
                    map((n: string) => parseInt(n)),
                    every((n: number) => n%2 === 0)
                );
            
            expect(result).toBe(false);
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

        describe('flatMap', () => {
            it('should pipe with flatMap as last operator', () => {
                const result: number = ['1', '3', '5', '7', '9']
                    .pipe(
                        map((s: string) => parseInt(s)),
                        flatMap((n: number) => [n, n+1])
                    );
                
                expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });

            it('should pipe with flatMap as intermediate operator', () => {
                const result: number = ['1', '3', '5', '7', '9']
                    .pipe(
                        map((s: string) => parseInt(s)),
                        flatMap((n: number) => [n, n+1]),
                        map((n: number) => n + 1)
                    );
                
                expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            });

            it('should pipe with flatMap as intermediate operator with terminal operator in the end', () => {
                const result: number = ['1', '3', '5', '7', '9']
                    .pipe(
                        map((s: string) => parseInt(s)),
                        flatMap((n: number) => [n, n+1]),
                        map((n: number) => n + 1),
                        some((n: number) => n%3 ===0)
                    );
                
                expect(result).toBeTruthy();
            });
            
        })

    });

})
