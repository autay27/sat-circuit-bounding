//utils related to generating the dimacs formatted problem



let cs: string[][] = []
let vars: string[] = []

export function variable(name) {
    if (vars.indexOf(name) == -1) {
        vars.push(name)
    }
    return 1 + vars.indexOf(name) 
}

export function c(i,j,k) {
    return variable("c_" + i + "_" + j + "_" + k)
}

export function o(i,j) {
    return variable("o_" + i + "_" + j)
}

export function v(i, t) {
    return variable("v_" + i + "_" + t)
}

export function tt(i, b1, b2) {
    return variable("t_" + i + "_" + b1 + "_" + b2)
}

export function not(name) {
    return "-" + name
}

export function ith_bit(num, i){
    return ((num>>i) & 1)
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

export function commentTruthTable() {
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

export function emitClauses(clauses) {

    var realclauses = clauses.filter(x => { return (""+x[0]).substring(0,2) != "c "})

    console.log("p cnf " + vars.length + " " + realclauses.length)

    console.log(clauses.map(terms => {return (terms.join(" ") + " 0" )}).join("\n"))

}