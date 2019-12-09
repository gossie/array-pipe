export default function map(mapper) {
    if(typeof(mapper) !== 'function') {
        throw new TypeError(mapper + ' is not a function!');
    }

    return item => mapper(item);
}
