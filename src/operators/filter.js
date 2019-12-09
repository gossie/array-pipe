export default function filter(tester) {
    if(typeof(tester) !== 'function') {
        throw new TypeError(tester + ' is not a function!');
    }

    return item => {
        if (tester(item)) {
            return item;
        } else {
            return undefined;
        }
    }
}
