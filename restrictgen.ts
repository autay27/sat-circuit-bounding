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

            //this is L onehots, part 1
            for (var k = 0; k < j; k++) {
                for (var l = 0; l < fanin; l++){
                    cnf.addClause([not(c(i, l, j)), not(c(i, l, k))])
                }
            }        
        }
    }
            //this is L onehots, part 2

    for (const i of params.gates()){

        for (var l = 0; l < fanin; l++){

            let newClause = []

            for (var j=0; j<i; j++){
                newClause.push(c(i,l,j))
            }

            cnf.addClause(newClause)
        }
    }

    cnf.addComment("gates are connected to ports by increasing index")

    //first input has smaller index than second, second smaller than third... etc
    //Not adding the minimal number of clauses, could fix it later
    for (const i of params.gates()){
        for (var j = 0; j < i; j++) {
            for (var k = j; k < i; k++) {
                for (var l = 1; l < fanin; l++){
                    cnf.addClause([not(c(i, l-1, k)), not(c(i, l, j))])
                } 
            }
        }
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
