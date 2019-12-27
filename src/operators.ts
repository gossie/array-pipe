export interface OperatorResult<T> {

    value: T;
    skip?: boolean;
    done?: boolean;
    needsFlattening?: boolean;

}

export abstract class Operator<F, T> {

    protected next: Operator<T, any>;

    public abstract perform(from: F): OperatorResult<T>;

    public abstract isTerminal(): boolean;

}

export abstract class TerminalOperator<F, T> extends Operator<F, T> {
    public isTerminal() {
        return true;
    }

    public abstract getFallbackValue(): T;
}

export abstract class IntermediateOperator<F, T> extends Operator<F, T> {
    public isTerminal() {
        return false;
    }
}

interface Predicate<T> {
    (item: T): boolean;
}

interface BiPredicate<T> {
    (item1: T, item2: T): boolean;
}

interface Mapper<F, T> {
    (from: F): T;
}

class DistinctOperator extends IntermediateOperator<any, any> {

    private _pastValues: Set<any> = new Set();

    public perform(from: any): OperatorResult<any> {
        if (this._pastValues.has(from)) {
            return {
                value: from,
                skip: true,
            };
        } else {
            this._pastValues.add(from);
            return {
                value: from,
                skip: false,
            };
        }
    }
}

class EveryOperator<T> extends TerminalOperator<T, boolean> {

    constructor(private readonly _tester: Predicate<T>) {
        super();
    }

    public getFallbackValue(): boolean {
        return true;
    }

    public perform(from: T): OperatorResult<boolean> {
        if (!this._tester(from)) {
            return {
                value: false,
                done: true,
            };
        }
        return {
            value: true,
            done: false
        };
    }
}

class NoneOperator<T> extends TerminalOperator<T, boolean> {

    constructor(private readonly _tester: Predicate<T>) {
        super();
    }

    public getFallbackValue(): boolean {
        return true;
    }

    public perform(from: T): OperatorResult<boolean> {
        if (this._tester(from)) {
            return {
                value: false,
                done: true
            };
        }
        return {
            value: true,
            done: false
        };
    }
}

class FilterOperator<T> extends IntermediateOperator<T, T> {

    constructor(private readonly _tester: Predicate<T>) {
        super();
    }

    public perform(from: T): OperatorResult<T> {
        return {
            value: from,
            skip: !this._tester(from)
        };
    }
}

class FindOperator<T> extends TerminalOperator<T, T> {

    constructor(private tester: Predicate<T>) {
        super();
    }

    public getFallbackValue(): T {
        return null;
    }

    public perform(from: T): OperatorResult<T> {
        return {
            value: from,
            done: this.tester(from)
        };
    }
}

class FlatMapOperator<F, T> extends IntermediateOperator<F, T> {

    constructor(private mapper: Mapper<F, T>) {
        super();
    }

    public perform(from: F): OperatorResult<T> {
        return {
            value: this.mapper(from),
            needsFlattening: true
        };
    }

}

class MapOperator<F, T> extends IntermediateOperator<F, T> {

    constructor(private mapper: Mapper<F, T>) {
        super();
    }

    public perform(from: F): OperatorResult<T> {
        return {
            value: this.mapper(from)
        };
    }

}

class SomeOperator<T> extends TerminalOperator<T, boolean> {

    constructor(private readonly _tester: Predicate<T>) {
        super();
    }

    public getFallbackValue(): boolean {
        return false;
    }

    public perform(from: T): OperatorResult<boolean> {
        if (this._tester(from)) {
            return {
                value: true,
                done: true
            };
        }
        return {
            value: false,
            done: false
        };
    }
}

class FastReduceOperator<T> extends TerminalOperator<T, boolean> {

    private _last: T;

    constructor(private _reducer: BiPredicate<T>,
                private _mapper: Mapper<boolean, OperatorResult<boolean>>,
                private _fallbackValue: boolean,
                private _firstResult: OperatorResult<boolean>) {
        super();
    }

    public getFallbackValue(): boolean {
        return this._fallbackValue;
    }

    public perform(item: T): OperatorResult<boolean> {
        let result: OperatorResult<boolean>;
        if (this._last) {
            result = this._mapper(this._reducer(this._last, item));
        } else {
            result = this._firstResult;
        }
        this._last = item;
        return result;
    }

}

export function filter<T>(tester: Predicate<T>): IntermediateOperator<T, T> {
    return new FilterOperator<T>(tester);
}

export function map<F, T>(mapper: Mapper<F, T>): IntermediateOperator<F, T> {
    return new MapOperator<F, T>(mapper);
}

export function flatMap<F, T extends Array<any>>(mapper: Mapper<F, T>): IntermediateOperator<F, T> {
    return new FlatMapOperator<F, T>(mapper);
}

export function distinct(): IntermediateOperator<any, any> {
    return new DistinctOperator();
};

export function find<T>(tester: Predicate<T>): TerminalOperator<T, T> {
    return new FindOperator<T>(tester);
}

export function some<T>(tester: Predicate<T>): TerminalOperator<T, boolean> {
    return new SomeOperator<T>(tester);
}

export function every<T>(tester: Predicate<T>): TerminalOperator<T, boolean> {
    return new EveryOperator<T>(tester);
}

export function none<T>(tester: Predicate<T>): TerminalOperator<T, boolean> {
    return new NoneOperator<T>(tester);
}

export function reduceToEvery<T>(reducer: BiPredicate<T>): TerminalOperator<T, boolean> {
    const mapper: Mapper<boolean, OperatorResult<boolean>> = (reduction: boolean) => {
        return {
            value: reduction,
            done: !reduction
        };
    };

    return new FastReduceOperator(reducer, mapper, true, {
        value: true,
        done: false
    });
}

export function reduceToSome<T>(reducer: BiPredicate<T>): TerminalOperator<T, boolean> {
    const mapper: Mapper<boolean, OperatorResult<boolean>> = (reduction: boolean) => {
        return {
            value: reduction,
            done: reduction
        };
    };

    return new FastReduceOperator(reducer, mapper, false, {
        value: false,
        done: false
    });
}

export function reduceToNone<T>(reducer: BiPredicate<T>): TerminalOperator<T, boolean> {
    const mapper: Mapper<boolean, OperatorResult<boolean>> = (reduction: boolean) => {
        return {
            value: !reduction,
            done: reduction
        };
    };

    return new FastReduceOperator(reducer, mapper, true, {
        value: true,
        done: false
    });
}
