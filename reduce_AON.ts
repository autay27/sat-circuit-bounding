//really this file should also be passed as an argument to another piece of code

//make a sat problem class
//have a variable class (storing name and index), a literal class, and a clause type
import * as utils from "./utils";


var myArgs = process.argv.slice(2);

if (myArgs.length<2) console.log("Usage: max # gates, truth table file")

const N=parseInt(myArgs[0])// gates
const table = utils.parseTable(myArgs[1])
const rows = table.rows
const n=table.ins
const m=table.outs

//translate variable names
function c(i: number, j: number, k: number): number {
    return utils.variable("c_" + i + "_" + j + "_" + k)
}

function o(i: number, j: number): number {
    return utils.variable("o_" + i + "_" + j)
}

function v(i: number, t: number): number {
    return utils.variable("v_" + i + "_" + t)
}

function tt(i: number, b1: number, b2: number): number {
    return utils.variable("t_" + i + "_" + b1 + "_" + b2)
}

//helper functions

function not(name: number): string {
    return "-" + name
}

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

function one_hot(xs:number[]): void {
    const l: number = xs.length

    for (var i = 0; i < l; i++){
        
        for (var j=0; j<i; j++){
            
            utils.addClause([not(xs[i]), not(xs[j])])

        }

    }

    let newClause = []

    for (var i=0; i<l; i++){
        newClause.push(xs[i].toString())
    }

    utils.addClause(newClause)

}

function gateOutput(ti0, ti1, i0, i1){

  //match gate with one of AND, OR, NAND, NOR
  //using ti_ as index

  let dictionary = [
    [0,0,0,1], //and
    [0,1,1,1], //or
    [1,0,0,0], //nor
    [1,1,1,0] //nand
  ]

  return dictionary[2*ti1 + ti0][2*i1 + i0]

}

//generate reduction

    utils.addComment("one port of a gate receives one connection")

for (var i = n; i < n + N; i++) {
    for (var j = 0; j < i; j++) {
      for (var k = 0; k < j; k++) {
        utils.addClause([not(c(i, 0, j)), not(c(i, 0, k))])
        utils.addClause([not(c(i, 1, j)), not(c(i, 1, k))])
      } 
      //first input has smaller cdcfc than second
      for (var k = j; k < i; k++) {
        utils.addClause([not(c(i, 0, j)), not(c(i, 1, k))])
      } 
    }
  }

    for (var i = n; i < n+N; i++){

        let newClause0 = []
        let newClause1 = []

        for (var j=0; j<i; j++){
            newClause0.push(c(i,0,j).toString())
            newClause1.push(c(i,1,j).toString())
        }

        utils.addClause(newClause0)
        utils.addClause(newClause1)
    }

    utils.addComment("one output of the circuit receives one connection")

    for (var i = 0; i < m; i++){
        
        for (var j=0; j<n+N; j++){
            
            for (var l=0; l<j; l++){

                utils.addClause([not(o(j,i)), not(o(l,i))])
            
            }

        }

    }

    for (var i = 0; i < m; i++){

        let newClause = []

        for (var j=0; j<n+N; j++){
            newClause.push(o(j,i).toString())
        }

        utils.addClause(newClause)
    }

    utils.addComment("input gate has input value")

    for (var i = 0; i < n; i++){

        for (var t = 0; t < Math.pow(2,n); t++){
            if(ith_bit(t, i)){
                utils.addClause([v(i,t).toString()])
            } else {
                utils.addClause([not(v(i,t))])
            }
        }

    }

function sixClauseGateValue(c0: number,c1: number,v0: number,v1: number,vir: number,t: number,i0: number,i1: number) {
    return [
        [not(c0), not(c1), i0?v0.toString():not(v0), i1?v1.toString():not(v1), not(vir),t.toString()],
        [not(c0), not(c1), i0?v0.toString():not(v0), i1?v1.toString():not(v1), vir.toString(), not(t)]
    ];
}

    utils.addComment("internal gates produce calculated value")

    for (var i = n; i < N+n; i++){

        for (var j0 = 0; j0 < i; j0++){

            for (var j1 = 0; j1 < j0; j1++){
                for (var r = 0; r < Math.pow(2,n); r++){

                    for (var i0 = 0; i0 < 2; i0++){
                        for (var i1 = 0; i1 < 2; i1++){
                            utils.addClauses(sixClauseGateValue(
                                c(i,0,j0),
                                c(i,1,j1),
                                v(j0,r),
                                v(j1,r),
                                v(i,r),
                                tt(i, i0, i1),
                                i0,
                                i1
                            ))
                        }
                    }
                }
                
            }

        }

    }

    utils.addComment("outputs match truth table")

function tableMatch(o: number,v: number,vl: number) {
    if(vl){
        return [[not(o),v.toString()]]
    } else {
        return [[not(o),not(v)]]
    }
}

    for (var k = 0; k < m; k++){
        rows.forEach( row => {
            for (var i = 0; i < n+N; i++){

                utils.addClauses(tableMatch(
                    o(i,k), 
                    v(i,row.in), 
                    ith_bit(row.out, k)
                    ))

            }
        })
    }


utils.commentTruthTable(table)
utils.commentVariableMapping()
utils.emitClauses()
