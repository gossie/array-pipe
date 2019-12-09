if (!Array.prototype.pipe) {
    Array.prototype.pipe = function(operators) {
        if (!operators || operators.length === 0) {
            throw new Error('no operators were provided');
        }

        const result = [];
        for (let i=0; i<this.length; i++) {
            let value = this[i];
            for (let j=0; j<operators.length; j++) {
                value = operators[j](value);
                if (value === undefined) {
                    break;
                }
            }
            if (value) {
                result.push(value);
            }
        }
        return result;
    }; 
}
