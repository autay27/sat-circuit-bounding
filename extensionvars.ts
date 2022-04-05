import { } from "./utils";

import {getRandomVar, getVarCount, newvar} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';

import { q } from './vars';

import { Parameters } from './parameters';

export function restrict(params: Parameters, cnf: CNF, n: number){

    cnf.addComment("add " + n + " extension variables")

    for(var i = 0; i < n; i++){
        //pick existing literals
        const l1 = new Literal(getRandomVar(), (Math.random() < 0.5))
        var l2 = new Literal(getRandomVar(), (Math.random() < 0.5))

        while (l1.v == l2.v) {
            l2 = new Literal(getRandomVar(), (Math.random() < 0.5))
        }

        //add axioms - we are sticking to conjunctions only
        const q0 = q(i);

        cnf.addClause([l1, not(q0)])
        cnf.addClause([l2, not(q0)])
        cnf.addClause([not(l1), not(l2), q0])

    }

    return cnf
}

