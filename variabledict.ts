import { Variable } from './variable';
import { Literal } from './literal';
import { table } from './parameters';

import {getRandomInt} from "./utils";


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

    static getVarCount(): number {
        return this.dict.length
    }

    static getVarMapComment(): string[] {

        return ["variable names:"].concat(this.dict.map(v => `${v.name} ${v.index}`))

    }

    static getRandomVar(): Variable {
        return this.dict[getRandomInt(0, this.getVarCount())]
    }
}

export function newvar(name: string): Literal{
    return new Literal(VariableDict.newvar(name), true)
}

export function getRandomVar(): Variable { return VariableDict.getRandomVar() }