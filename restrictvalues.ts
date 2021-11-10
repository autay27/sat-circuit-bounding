import { flatMap, seq, kGatesSeq, orDImplication } from "./utils";

import {VariableDict, newvar} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';

import { c, o, v, t, m } from './vars';

import { Parameters } from './parameters';

export function restrict(params: Parameters, cnf: CNF){

    function sixClauseGateValue(c0: Literal,c1: Literal,v0: Literal,v1: Literal, vir: Literal, t: Literal, i0: number,i1: number): Literal[][] {
        return [
            [
                not(c0), 
                not(c1),
                i0 ? not(v0) : v0,
                i1 ? not(v1) : v1,
                not(vir),
                t
            ],
            [
                not(c0), 
                not(c1),
                i0 ? not(v0) : v0,
                i1 ? not(v1) : v1,
                vir,
                not(t)
            ]
        ]
            

    }

    cnf.addComment("internal gates produce calculated value")

    for (const i of params.gates()) {

        for (var j0 = 0; j0 < i; j0++){

            for (var j1 = 0; j1 < j0; j1++){

                for (const r of params.inputVectors()) {

                    for (var i0 = 0; i0 < 2; i0++){

                        for (var i1 = 0; i1 < 2; i1++){
                            cnf.addClauses(sixClauseGateValue(
                                c(i,0,j1),
                                c(i,1,j0),
                                v(j0,r),
                                v(j1,r),
                                v(i,r),
                                t(i, i0, i1),
                                i0,
                                i1
                            ))
                        }
                    }
                }
            }
        }
    }

    return cnf

}


export function restrictAON(params: Parameters, cnf: CNF, fanin: number){

    cnf.addComment("NOT gates produce calculated value")

    for (const i of params.gates()) {
        for (var j = 0; j < i; j++){
            for (const r of params.inputVectors()) {

                cnf.addClauses(orDImplication([not(c(i,0,j)), not(m(i,0))], v(i,r), not(v(j,r))))

            }
        }
    }

    cnf.addComment("AND/OR gates produce calculated value when all input bits the same")

    for (const i of params.gates()) {
        for (const j_vec of kGatesSeq(fanin, i)){
            for (const r of params.inputVectors()) {

                var allTrue = [m(i,0)]
                var allFalse = [m(i,0)]

                for (var k = 0; k < fanin; k++){
                    allTrue.push(not(c(i, k, j_vec[k])))
                    allFalse.push(not(c(i, k, j_vec[k])))

                    allTrue.push(not(v(j_vec[k], r)))
                    allFalse.push(v(j_vec[k], r))
                }

                allTrue.push(v(i,r))
                allFalse.push(not(v(i,r)))

                cnf.addClause(allTrue)
                cnf.addClause(allFalse)
            }
        }
    }

    cnf.addComment("AND/OR gates produce calculated value when some input bits differ")

    for (const i of params.gates()) {
        for (const j_vec of kGatesSeq(fanin, i)){
            for (const r of params.inputVectors()) {
                for (var l0 = 0; l0 < fanin; l0++){
                    for (var l1 = 0; l1 < l0; l1++){

                        var clause = seq(0,fanin).map( k => not(c(i, k, j_vec[k])) )
                        clause.push(m(i,0))
                        
                        var clauses = [clause.concat([not(v(j_vec[l0], r)), v(j_vec[l1], r)]),
                                        clause.concat([v(j_vec[l0], r), not(v(j_vec[l1], r))])]

                        clauses = flatMap(clauses, (c => orDImplication(c, v(i,r), m(i,1))))

                        cnf.addClauses(clauses)
                    }
                }
            }
        }
    }           

    return cnf

}