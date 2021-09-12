import { Variable } from './variable';
import { Literal } from './literal';

export class VariableDict {

    private static dict: Variable[] = []

    static newvar(name: string): Variable {

        const found = this.dict.find(x => x.name == name)

        if (found) {
            return found
        } else {
            const newvar = new Variable(name, this.dict.length + 1)
            this.dict.push(newvar)
            return newvar
        }

    }

    static getVarCount() : number {
        return this.dict.length
    }

}

function newvar(name: string): Literal{
    return new Literal(VariableDict.newvar(name), true)
}

export function c(i: number, j: number, k: number): Literal {
    return newvar("c_" + i + "_" + j + "_" + k)
}

export function o(i: number, j: number): Literal {
    return newvar("o_" + i + "_" + j)
}

export function v(i: number, t: number): Literal {
    return newvar("v_" + i + "_" + t)
}

export function t(i: number, b: number): Literal {
    return newvar("t_" + i + "_" + b)
}
