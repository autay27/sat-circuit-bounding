import { flatMap, seq, kGatesSeq, orDImplication, orConjunction } from "./utils";

import {VariableDict, newvar} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';

import { c, o, v, t, m } from './vars';

import { Parameters } from './parameters';

export function restrict(params: Parameters, cnf: CNF, fanin: number){

    cnf.addComment("restrict connections to DNF")

    for (const i of params.gates()){
        for (const j of params.connectibleGates(i)) {
            for(const k of seq(0, fanin)){
                //NOT to anything
                //AND to AND/OR
                cnf.addClause([not(c(i,k,j)), m(j,0), m(j,1), not(m(i,0))])
                //OR to OR
                cnf.addClauses(orConjunction([not(c(i,k,j)), m(j,0), not(m(j,1))], not(m(i,0)), m(i,1)))
            }
        }
    }

    return cnf
}

