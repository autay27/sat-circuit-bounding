import {ith_bit} from "./utils";

import { Parameters } from './parameters';

import {VariableDict, newvar} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';

import { c, o, v, t } from './vars';

export function restrict(params: Parameters, cnf: CNF, allowedTruthTables: number[]){

    cnf.addComment("internal gates restricted to a subset of functions")

    //AON - [ 0b0001, 0b0111, 0b1010 ]

    for (const i of params.gates()) {
        for (var j = 0; j < 16; j++){
            if (!allowedTruthTables.includes(j)){
                cnf.addClause([
                    ith_bit(j,3) ? not(t(i,0,0)) : t(i,0,0),
                    ith_bit(j,2) ? not(t(i,0,1)) : t(i,0,1),
                    ith_bit(j,1) ? not(t(i,1,0)) : t(i,1,0),
                    ith_bit(j,0) ? not(t(i,1,1)) : t(i,1,1)
                ])
            }
        }
    }

    return cnf
}
