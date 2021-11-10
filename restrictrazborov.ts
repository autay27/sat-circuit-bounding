import { seq, ith_bit, flatMap, orDImplication, orConjunction } from "./utils";

import {VariableDict, newvar} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';

import { y, e, fanin, type, gatein, varin, whichconst, inputvar, varor, inputnode, nodeor } from './varsrazborov';

import { Parameters } from './parameters';

export function restrict(params: Parameters, cnf: CNF){

    console.assert(params.table.rows[0].out < 2)

    cnf.addComment("constant inputs match")

    for (const v of params.gates()){
        for(const i of seq(0,2)){

            //constant inputs
            for(const r of params.table.rows){
                const a = r.in
                cnf.add(new Clause([gatein(i,v), varin(i,v)]).orEq(e(a,i,v), whichconst(i,v)))
            }


        }
    }

    cnf.addComment("correct number & matching on var (source) inputs")

    for (const v of params.gates()){
        for(const i of seq(0,2)){

            const doesntTakeVar = new Clause([gatein(i,v), not(varin(i,v))])

            //only 1 source (var) per port
            for(const j of seq(0, params.table.ins)){
                for(const k of seq(0, params.table.ins).slice(j+1)){
                    cnf.add([doesntTakeVar.concat([not(inputvar(v,i,j)), not(inputvar(v,i,k))])])
                }
            }

            //VAROR is correct when v takes a var
            //slight variation from the original since my variables are 0-indexed

            //first VAROR is false
            cnf.add([doesntTakeVar.concat([not(varor(i,v,-1))])])

            //VAROR ors its predecessors as described
            for(const j of params.sources()){
                cnf.add([doesntTakeVar.concat([not(varor(i,v,j)), varor(i,v,j-1), inputvar(i,v,j)])])
                cnf.add(doesntTakeVar.concat([varor(i,v,j)]).orAnd(not(varor(i,v,j-1)), not(inputvar(i,v,j))))
            }

            //when v takes a var, it takes at least one, ie. the last VAROR is true
            cnf.add([doesntTakeVar.concat([varor(i,v,params.lastSource())])])

            //when v takes var j, its input value is equal to the jth input bit
            for(const r of params.table.rows){
                const a = r.in
                for(const j of params.sources()){
                    cnf.add([doesntTakeVar.concat([not(inputvar(i,v,j)), e(a,i,v).match(ith_bit(a,j) == 1)])])
                }
            }
        }
    }

    cnf.addComment("correct number & matching on node (gate) inputs")


    for (const v of params.gates()){
        for(const i of seq(0,2)){

            const doesntTakeNode = new Clause([not(gatein(i,v)), not(gatein(i,v))])

            //only one gate per port
            for(const u of params.connectibleGates(v)){
                for(const w of params.connectibleGates(v).slice(u+1)){
                    cnf.add([doesntTakeNode.concat([not(inputnode(i,v,u)), not(inputnode(i,v,w))])])
                }
            }            

            //NODEOR is correct when v takes a var

            //first NODEOR is false
            cnf.add([doesntTakeNode.concat([not(nodeor(i,v,params.lastSource()))])])

            //NODEOR ors its predecessors as described
            for(const u of params.connectibleGates(v)){
                cnf.add([doesntTakeNode.concat([not(nodeor(i,v,u)), nodeor(i,v,u-1), inputnode(i,v,u)])])
                cnf.add(doesntTakeNode.concat([nodeor(i,v,u)]).orAnd(not(nodeor(i,v,u-1)), not(inputnode(i,v,u))))
            }

            //when v takes a node, it takes at least one, ie. the last NODEOR is true
            cnf.add([doesntTakeNode.concat([nodeor(i,v,v-1)])])

            //when v takes node u, its input value is equal to u's output value
            for(const r of params.table.rows){
                const a = r.in
                for(const u of params.connectibleGates(v)){
                    cnf.add(doesntTakeNode.concat([not(inputnode(i,v,u))]).orEq(e(a,i,v), y(a,u)))
                }
            }
        }
    }

    cnf.addComment("NOT gates compute")

    for (const v of params.gates()){
        for(const r of params.table.rows){
            const a = r.in
            cnf.add(new Clause([fanin(v)]).orEq(y(a,v), not(e(a,0,v))))
        }
    }

    cnf.addComment("AND gates compute")
    for (const v of params.gates()){
        for(const r of params.table.rows){
            const a = r.in
            const And = new Clause([fanin(v), not(type(v))])
            cnf.add(And.tgtImplies( new Clause([not(y(a,v))]).orAnd(e(a,0,v), e(a,1,v))) )
            cnf.add(And.tgtImplies([ new Clause([y(a,v), not(e(a,0,v)), not(e(a,1,v))]) ]))
        }
    }

    cnf.addComment("OR gates compute")
    for (const v of params.gates()){
        for(const r of params.table.rows){
            const a = r.in
            const Or = new Clause([fanin(v), type(v)])
            cnf.add(Or.tgtImplies([ new Clause([not(y(a,v)), e(a,0,v), e(a,1,v)]) ]))
            cnf.add(Or.tgtImplies( new Clause([y(a,v)]).orAnd(not(e(a,0,v)), not(e(a,1,v)))) )
        }
    }

    cnf.addComment("outputs match")

    for(const r of params.table.rows){
        const a = r.in
        cnf.add([new Clause([y(a,params.lastGate()).match(r.out == 1)])])
    }

    return cnf
}