import './polyfill.mock';
import './index';

describe('pipe already exists', () => {
    it('should not override pipe when already set', () => {
        expect([1, 2, 3].pipe()).toBe('already set');
    })
});