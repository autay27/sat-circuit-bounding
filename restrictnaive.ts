import { ith_bit, flatMap, orDImplication, orConjunction } from "./utils";

import {VariableDict, newvar} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';

import { e, x, g } from './varsnaive';

import { Parameters } from './parameters';

export function restrict(params: Parameters, cnf: CNF){

    console.assert(params.table.rows[0].out < 2)

    cnf.addComment("gate output values are correct")

    for (const a of params.inputVectors()){
        for (const i of params.gates()){
            for (const j of params.connectible(i)){
                for (const k of params.connectible(i).slice(j+1)){

                    //AND
                    const notAndGate = [not(g(i,0)), g(i,1), not(x(i,j)), not(x(i,k))]

                    cnf.addClause(notAndGate.concat([e(i,a), not(e(j,a)), not(e(k,a))]))
                    cnf.addClauses(orConjunction(notAndGate.concat([not(e(i,a))]), e(j,a), e(k,a)))

                    //OR
                    const notOrGate = [g(i,0), not(g(i,1)), not(x(i,j)), not(x(i,k))]

                    cnf.addClause(notOrGate.concat([not(e(i,a)), e(j,a), e(k,a)]))
                    cnf.addClauses(orConjunction(notOrGate.concat([e(i,a)]), not(e(j,a)), not(e(k,a))))
                }

                //NOT
                const notNotGate = orDImplication([not(x(i,j))], g(i,0), not(g(i,1)))

                cnf.addClauses(flatMap(notNotGate, (c => orDImplication(c, e(i,a), not(e(j,a))))))
            }
        }
    }

    cnf.addComment("gates have right number of connections")

    for (const i of params.gates()){
        //NOT / AND / OR
        //at least 1
        cnf.addClause(params.connectible(i).map(j => x(i,j)))

        //AND / OR
        //1 implies 2
        for (const j of params.connectible(i)){
            const notJustJ = [not(x(i,j))].concat(params.connectible(i).filter(k => k!=j).map(k => x(i,k)))
            cnf.addClauses(orDImplication(notJustJ, g(i,0), g(i,1)))
        }
    }

    cnf.addComment("sources take on correct values")

    for (const i of params.sources()){

        for (const row of params.table.rows){
            cnf.addClause([ith_bit(row.in,i) ? e(i,row.in) : not(e(i,row.in))]) 
        }

    }

    cnf.addComment("output of circuit matches function")
    
    const finalGate = params.sourcesAndGates().length - 1

    for (const row of params.table.rows){

        cnf.addClause([ (row.out == 1 ) ? e(finalGate,row.in) : not(e(finalGate,row.in))])
    
    }

    return cnf
}


export function restrictDNF(params: Parameters, cnf: CNF){
    console.assert(false)//Not useful for an encoding with fanin only 2
    cnf.addComment("restrict connections to dnf")

    for (const i of params.gates()){
        for (const j of params.connectibleGates(i)){
            //and only connects to and/or
            cnf.addClauses(orDImplication([not(g(j,0)), g(j,1), not(x(i,j))], g(i,0), not(g(i,1))))
        }
    }

    //only final gate is or
    for (const i of params.gates().slice(0,-1)){//broen
        cnf.addClause([g(i,0)])
    }

    const finalGate = params.sourcesAndGates().length - 1

    cnf.addClauses(orConjunction([], not(g(finalGate,0)), g(finalGate,1)))

    return cnf
}