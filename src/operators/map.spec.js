import map from './map';

describe('map', () => {

    it('should throw error', () => {
        expect(() => map('not valid')).toThrow(new TypeError('not valid is not a function!'));
    });

    it('should map', () => {
        const operator = map(item => item + 1);
        expect(operator(4)).toBe(5);
    });

})
