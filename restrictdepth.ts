import { seq } from "./utils";

import { Parameters } from './parameters';

import { CNF } from './cnf';

import { not, Literal } from './literal';

import { c, d } from './vars';

export function restrict(params: Parameters, cnf: CNF, maxDepth: number){

    cnf.addComment("a gate has exactly one depth")

    for (const i of params.gates()){
    
        cnf.addOneHot(seq(0, maxDepth).map(l => d(i,l)))

    }

    cnf.addComment("gates output to ones at larger depths")

    for (const i of params.gates()){
        for (var j = params.table.ins; j < i; j++){        
            for (var l0 = 0; l0 < maxDepth; l0++){
                for (var l1 = 0; l1 <= l0; l1++){

                    cnf.addClause(
                        [not(d(i,l0)), not(d(j, l1)), not(c(i,0,j))])

                    cnf.addClause(
                        [not(d(i,l0)), not(d(j, l1)), not(c(i,1,j))])
                }
            } 
        }
    }

    return cnf
}
