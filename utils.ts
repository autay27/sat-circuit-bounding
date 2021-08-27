//io and dimacs generation

//help with the truth table input


//help with the dimacs output

let cs: string[][] = []
let vars: string[] = []

export function variable(name) {
    if (vars.indexOf(name) == -1) {
        vars.push(name)
    }
    return 1 + vars.indexOf(name) 
}


export function addComment(x) {
    cs.push(["c #### " + x])
}

export function addClause(x) {
    cs.push(x)
}

export function addClauses(x) {
    cs = cs.concat(x)
}

//take truth table as arg
export function commentTruthTable(table) {
    addComment("target truth table")
      table.forEach(row =>{
        addComment(JSON.stringify(row))        
    })

}

export function commentVariableMapping() {
    addComment("variable")
      vars.forEach((name, index) =>{
        addComment(name + " " + index)        
    })

}

export function emitClauses() {

    var realclauses = cs.filter(x => { return (""+x[0]).substring(0,2) != "c "})

    console.log("p cnf " + vars.length + " " + realclauses.length)

    console.log(cs.map(terms => {return (terms.join(" ") + " 0" )}).join("\n"))

}