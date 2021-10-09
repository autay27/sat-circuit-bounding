//really this file should also be passed as an argument to another piece of code

//make a sat problem class
//have a variable class (storing name and index), a literal class, and a clause type
import * as utils from "./utils";

import {c,o,v,t, VariableDict} from './variabledict';

import {CNF, Clause} from './cnf';

import { not, Literal } from './literal';


//import { Variable } from './variable';

//const vars = new VariableDict()

var myArgs = process.argv.slice(2);

if (myArgs.length<2) console.log("Usage: max # gates, truth table file")

const N=parseInt(myArgs[0])// gates
const table = utils.parseTable(myArgs[1])
const rows = table.rows
const n=table.ins
const m=table.outs


var cnf = new CNF()



//translate variable names
/*
function c(i: number, j: number, k: number): number {
    return utils.variable("c_" + i + "_" + j + "_" + k)
}

function o(i: number, j: number): number {
    return utils.variable("o_" + i + "_" + j)
}

function v(i: number, t: number): number {
    return utils.variable("v_" + i + "_" + t)
}

function t(i: number, b: number): number {
    return utils.variable("t_" + i + "_" + b)
}*/

//helper functions


function ith_bit(num: number, i: number): number {
    return ((num>>i) & 1)
}

function seq(max: number): number[] {
    let a = []
    for(var i=0; i<max; i++){
        a.push(i)
    }
    return a
}

function gateOutput(ti0: number, ti1: number, i: number, j: number): number {

  //match gate with one of AND, OR, NOT
  //using ti_ as index

  //not discards 0th bit
  let dictionary: number[][] = [
    [0,0,0,1], //and
    [0,1,1,1], //or
    [1,0,1,0], //not
    [1,0,1,0] //not again
  ]

  return dictionary[2*ti0 + ti1][2*i + j]

}

//I should change these to use the existing onehot function!
//and put these common features of the reduction into a second file, honestly

    cnf.addComment("one port of a gate receives one connection")

for (var i = n; i < n + N; i++) {
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

    for (var i = n; i < n+N; i++){

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

    for (var i = 0; i < m; i++){
        
        for (var j=0; j<n+N; j++){
            
            for (var l=0; l<j; l++){

                cnf.addClause([not(o(j,i)), not(o(l,i))])
            
            }

        }

    }

    for (var i = 0; i < m; i++){

        let newClause = []

        for (var j=0; j<n+N; j++){
            newClause.push(o(j,i))
        }

        cnf.addClause(newClause)
    }

    cnf.addComment("input gate has input value")

    for (var i = 0; i < n; i++){

        for (var r = 0; r < Math.pow(2,n); r++){
            if(ith_bit(r, i)){
                cnf.addClause([v(i,r)])
            } else {
                cnf.addClause([not(v(i,r))])
            }
        }

    }

function sixClauseGateValue(c0: Literal,c1: Literal,v0: Literal,v1: Literal,ti0: Literal,ti1: Literal,i0: number,i1: number,vir: Literal): Literal[][] {
    
    let newClauses = [];

    for (var i = 0; i < 2; i++){
        for(var j = 0; j < 2; j++){
            
            const reqd_value = gateOutput(i0, i1, i, j)

            newClauses.push([
                    not(c0), not(c1),
                    i0 ? not(ti0) : ti0,
                    i1 ? not(ti1) : ti1,
                    i ? not(v0) : v0,
                    j ? not(v1) : v1,
                    reqd_value ? vir : not(vir)
                ])
        }
    }

    return newClauses
}

    cnf.addComment("internal gates produce calculated value")

    //can I have a little iterate over booleans as a treat

    for (var i = n; i < N+n; i++){

        for (var j0 = 0; j0 < i; j0++){

            for (var j1 = 0; j1 < j0; j1++){
                for (var r = 0; r < Math.pow(2,n); r++){

                    for (var i0 = 0; i0 < 2; i0++){
                        for (var i1 = 0; i1 < 2; i1++){
                            cnf.addClauses(sixClauseGateValue(
                                c(i,0,j0),
                                c(i,1,j1),
                                v(j0,r),
                                v(j1,r),
                                t(i, 0),
                                t(i, 1),
                                i0,
                                i1,
                                v(i,r)
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

    for (var k = 0; k < m; k++){
        rows.forEach( row => {
            for (var i = 0; i < n+N; i++){

                cnf.addClause(tableMatch(
                    o(i,k), 
                    v(i,row.in), 
                    ith_bit(row.out, k)
                    ))

            }
        })
    }

cnf.addComments(VariableDict.getVarMapComment())
console.log(cnf.dimacs())
/*
utils.commentTruthTable(table)
utils.commentVariableMapping()
utils.emitClauses()
*/