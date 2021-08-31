//truth table input

const fs = require('fs')


/*
truth table file format: eg with 2 inputs 1 output

comment
00 0
01 1
10 1
11 1

*/

type row = {in: number, out: number}
type table = {rows: row[], ins: number, outs: number}

export function parseTable(filename: string): table {

    let file: string = fs.readFileSync('./'+filename, 'utf-8')

    const notcomment = /^[01 ]+ [01]+$/

    const rs = file.split('\n').filter(line => line.match(notcomment)).map(str => str.split(' '))
    const t = rs.map(row => {
            return {in: parseInt(row[0], 2), out: parseInt(row[1], 2)}
        })

    return {rows: t, ins: rs[0][0].length, outs: rs[0][1].length}

}


//dimacs output

//prefer to pass cs as arg

let cs: string[][] = []
let vars: string[] = []

export function variable(name: string) {
    if (vars.indexOf(name) == -1) {
        vars.push(name)
    }
    return 1 + vars.indexOf(name) 
}


export function addComment(x: string) {
    cs.push(["c #### " + x])
}

export function addClause(x: string[]) {
    cs.push(x)
}

export function addClauses(x: string[][]) {
    cs = cs.concat(x)
}

//take truth table as arg
export function commentTruthTable(t: table) {
    addComment("target truth table")
      t.rows.forEach(row =>{
        addComment(JSON.stringify(row))        
    })

}

export function commentVariableMapping() {
    addComment("variable names")
      vars.forEach((name, index) =>{
        addComment(name + " " + (index+1))        
    })

}

export function emitClauses() {

    var realclauses = cs.filter(x => { return (""+x[0]).substring(0,2) != "c "})

    console.log("p cnf " + vars.length + " " + realclauses.length)

    console.log(cs.map(clause => {
            if (clause[0][0]=='c') return clause.join(" ")
            else return (clause.join(" ") + " 0" )
        }).join("\n"))

}