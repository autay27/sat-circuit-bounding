import * as utils from "./utils";

import {VariableDict, newvar} from './variabledict';

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

function c(i: number, j: number, k: number): Literal {
    return newvar("c_" + i + "_" + j + "_" + k)
}

function o(i: number, j: number): Literal {
    return newvar("o_" + i + "_" + j)
}

function v(i: number, t: number): Literal {
    return newvar("v_" + i + "_" + t)
}

function t(i: number, b1: number, b2: number): Literal {
    return newvar("t_" + i + "_" + b1 + "_" + b2)
}

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

//I should change these to use the existing onehot function!
//and make some lists to iterate over instead of these for loops
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

    cnf.addComment("internal gates restricted to a subset of functions")

    const allowedTruthTables = [ 0b0001, 0b0111, 0b1010 ]

    for (var i = n; i < N+n; i++){
        for (var j = 0; j < 16; j++){
            if (!allowedTruthTables.includes(j)){
                cnf.addClause([
                    ith_bit(j,3) ? not(t(i,0,0)) : t(i,0,0),
                    ith_bit(j,2) ? not(t(i,0,1)) : t(i,0,1),
                    ith_bit(j,1) ? not(t(i,1,0)) : t(i,1,0),
                    ith_bit(j,0) ? not(t(i,1,1)) : t(i,1,1)
                ])
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