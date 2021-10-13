import { ith_bit } from "./utils";

import {VariableDict, newvar} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';

import { c, o, v, t } from './vars';

import { Parameters } from './parameters';

export function restrict(params: Parameters, cnf: CNF, fanin: number){

    //I should change these to use the existing onehot function! cnf.addOneHot

    cnf.addComment("one port of a gate receives one connection")

    for (const i of params.gates()) {
        for (var j = 0; j < i; j++) {
          for (var k = 0; k < j; k++) {
            cnf.addClause([not(c(i, 0, j)), not(c(i, 0, k))])
            cnf.addClause([not(c(i, 1, j)), not(c(i, 1, k))])
          } 
          //first input has smaller index than second
          for (var k = j; k < i; k++) {
            cnf.addClause([not(c(i, 0, j)), not(c(i, 1, k))])
          } 
        }
      }

    for (const i of params.gates()){

        let newClause0 = []
        let newClause1 = []

        for (var j=0; j<i; j++){
            newClause0.push(c(i,0,j))
            newClause1.push(c(i,1,j))
        }

        cnf.addClause(newClause0)
        cnf.addClause(newClause1)
    }

    cnf.addComment("one output of the circuit receives one connection")
    //again the addonehot...

    for (const i of params.sinks()){
        
        for (const j of params.sourcesAndGates()){
            
            for (var l=0; l<j; l++){

                cnf.addClause([not(o(j,i)), not(o(l,i))])
            
            }

        }

    }

    for (const i of params.sinks()){

        let newClause = []

        for (const j of params.sourcesAndGates()){
            newClause.push(o(j,i))
        }

        cnf.addClause(newClause)
    }

    cnf.addComment("input gate has input value")

    for (const i of params.sources()){

        for (const r of params.inputVectors()){
            if(ith_bit(r, i)){
                cnf.addClause([v(i,r)])
            } else {
                cnf.addClause([not(v(i,r))])
            }
        }

    }

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
                                c(i,0,j0),
                                c(i,1,j1),
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


    cnf.addComment("outputs match truth table")

    function tableMatch(o: Literal, v: Literal, vl: number): Literal[] {
        if(vl){
            return [not(o), v]
        } else {
            return [not(o),not(v)]
        }
    }

    for (const k of params.sinks()){
        for (const row of params.table.rows){
            for (const i of params.sourcesAndGates()){

                cnf.addClause(tableMatch(
                    o(i,k), 
                    v(i,row.in), 
                    ith_bit(row.out, k)
                    ))

            }
        }
    }

    return cnf
}
