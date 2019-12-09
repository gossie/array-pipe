import filter from './filter';

describe('filter', () => {

    it('should throw error', () => {
        expect(() => filter('not valid')).toThrow(new TypeError('not valid is not a function!'));
    });

    it('should match', () => {
        const operator = filter(item => item%2 === 0);
        expect(operator(4)).toBe(4);
    });

    it('should not match', () => {
        const operator = filter(item => item%2 === 0);
        expect(operator(5)).toBe(undefined);
    });

})
