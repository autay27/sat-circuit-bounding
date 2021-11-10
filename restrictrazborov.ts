import { seq, ith_bit, flatMap, orDImplication, orConjunction } from "./utils";

import {VariableDict, newvar} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';

import { y, e, fanin, type, gatein, varin, whichconst, inputvar, varor, inputnode, nodeor } from './varsrazborov';

import { Parameters } from './parameters';

export function restrict(params: Parameters, cnf: CNF){

    console.assert(params.table.rows[0].out < 2)

    cnf.addComment("inputs match")

    for (const v of params.gates()){
        for(const i of seq(0,2)){

            //constant inputs
            for(const r of params.table.rows){
                const a = r.in
                cnf.add(new Clause([gatein(i,v), varin(i,v)]).orAnd(e(a,i,v), whichconst(i,v)))
            }

            const doesntTakeVar = new Clause([gatein(i,v), not(varin(i,v))])

            //only 1 source (var) per port
            for(const j of seq(0, params.table.ins)){
                for(const k of seq(0, params.table.ins).slice(0, j-1)){
                    cnf.add([doesntTakeVar.concat([not(inputvar(v,i,j)), not(inputvar(v,i,k))])])
                }
            }

            //VAROR is correct when v takes a var

            //This part is a slight variation from the original since my variables are 0-indexed
            //I figured it would be less confusing this way than to change my indexing habits
            //Who knows, perhaps I'm about to enter a world of pain

            //first VAROR is true when the first var is connected
            cnf.add(doesntTakeVar.orEq(varor(i,v,0), inputvar(i,v,0)))

            //VAROR ors its predecessors as described
            for(const j of seq(1, params.table.ins)){
                cnf.add([doesntTakeVar.concat([not(varor(i,v,j)), varor(i,v,j-1), inputvar(i,v,j)])])
            }

            //when v takes a var, it takes at least one, ie. the last VAROR is true
            cnf.add([doesntTakeVar.concat([varor(i,v,params.table.ins)])])

            //when v takes var j, its input value is equal to the jth input bit
            for(const r of params.table.rows){
                const a = r.in
                for(const j of seq(0, params.table.ins)){
                    cnf.add([doesntTakeVar.concat([not(inputvar(i,v,j)), e(a,i,v).match(ith_bit(a,j) == 1)])])
                }
            }

            //Now just need the SIMILARLY FOR GATES part and the last part. Doable!

            const doesntTakeNode = new Clause([not(gatein(i,v)), not(gatein(i,v))])

            //only one gate per port
            for(const u of params.connectible(v)){
                for(const w of params.connectible(v).slice(0, u+1)){
                    cnf.add([doesntTakeNode.concat([not(inputnode(i,v,u)), not(inputnode(i,v,w))])])
                }
            }            

            //NODEOR is correct when v takes a var

            //first NODEOR is true when the first node is connected
            cnf.add(doesntTakeNode.orEq(nodeor(i,v,0), inputnode(i,v,0)))

            //NODEOR ors its predecessors as described
            for(const u of params.connectible(v).slice(1)){
                cnf.add([doesntTakeNode.concat([not(nodeor(i,v,u)), nodeor(i,v,u-1), inputnode(i,v,u)])])
            }

            //when v takes a node, it takes at least one, ie. the last NODEOR is true
            cnf.add([doesntTakeNode.concat([nodeor(i,v,params.connectible(v).length-1)])])

            //when v takes node u, its input value is equal to u's output value
            for(const r of params.table.rows){
                const a = r.in
                for(const u of params.connectible(v)){
                    cnf.add(doesntTakeNode.orEq(e(a,i,v), y(a,u)))
                }
            }
        }
    }
    return cnf
}