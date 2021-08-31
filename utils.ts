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
type table = row[]

export function parseTable(filename: string): table {

    let file: string = fs.readFileSync('./'+filename, 'utf-8')

    const notcomment = /^[01 ]+ [01]$/
    return file.split('\n').filter(line => line.match(notcomment))
        .map(str => {
            const rows = str.split(' ')
            return {in: parseInt(rows[0], 2), out: parseInt(rows[1], 2)}
        })

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
      t.forEach(row =>{
        addComment(JSON.stringify(row))        
    })

}

export function commentVariableMapping() {
    addComment("variable names")
      vars.forEach((name, index) =>{
        addComment(name + " " + index)        
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