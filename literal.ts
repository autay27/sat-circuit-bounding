import { Variable } from './variable';

export class Literal {

    readonly v: Variable
    readonly sign: boolean

    constructor(v: Variable, sign: boolean) {

        this.v = v
        this.sign = sign

    }

    not(): Literal {
        return new Literal(this.v, !this.sign)
    }

    v(): Literal {

    }
}


export function not(l:Literal):Literal {return l.not()}
