//Time to make it read from file
//But woww I want to re-write this in scala or typescript or something

const N=2 // gates
const n=3 // inputs
const m=1 // outputs

const table = [ 
    {in:0b000 , out:0b0},
    {in:0b001 , out:0b0},
    {in:0b010 , out:0b0},
    {in:0b011 , out:0b0},
    {in:0b100 , out:0b0},
    {in:0b101 , out:0b0},
    {in:0b110 , out:0b0},
    {in:0b111 , out:0b1}
];

clauses = []
vars = []

//dimacsMode = process.argv.length == 3

function variable(name) {
    if (vars.indexOf(name) == -1) {
        vars.push(name)
    }
    return 1 + vars.indexOf(name) 
}


function c(i,j,k) {
    return variable("c_" + i + "_" + j + "_" + k)
}

function o(i,j,k) {
    return variable("o_" + i + "_" + j)
}

function v(i,t) {
    return variable("v_" + i + "_" + t)
}

function tt(i, b1, b2) {
    return variable("t_" + i + "_" + b1 + "_" + b2)
}

function not(name) {
    return "-" + name
}

function ith_bit(num, i){
    return ((num>>i) & 1)
}

function comment(x) {
    clauses.push(["c #### " + x])
}

function commentTruthTable() {
    comment("target truth table")
      table.forEach(row =>{
        comment(JSON.stringify(row))        
    })

}

function commentVariableMapping() {
    comment("variable")
      vars.forEach((name, index) =>{
        comment(name + " " + index)        
    })

}

function emitClauses(clauses) {

    var realclauses = clauses.filter(x => { return (""+x[0]).substring(0,2) != "c "})

    console.log("p cnf " + vars.length + " " + realclauses.length)

    console.log(clauses.map(terms => {return (terms.join(" ") + " 0" )}).join("\n"))

}




    comment("one port of a gate receives one connection")

for (i = n; i < n + N; i++) {
    for (j = 0; j < i; j++) {
      for (k = 0; k < j; k++) {
        clauses.push([not(c(i, 0, j)), not(c(i, 0, k))])
        clauses.push([not(c(i, 1, j)), not(c(i, 1, k))])
      } 
      //first input has smaller index than second
      for (k = j; k < i; k++) {
        clauses.push([not(c(i, 0, j)), not(c(i, 1, k))])
      } 
    }
  }

    for (i = n; i < n+N; i++){

        newClause0 = []
        newClause1 = []

        for (j=0; j<i; j++){
            newClause0.push(c(i,0,j))
            newClause1.push(c(i,1,j))
        }

        clauses.push(newClause0)
        clauses.push(newClause1)
    }

    comment("one output of the circuit receives one connection")

    for (i = 0; i < m; i++){
        
        for (j=0; j<n+N; j++){
            
            for (l=0; l<j; l++){

                clauses.push([not(o(j,i)), not(o(l,i))])
            
            }

        }

    }

    for (i = 0; i < m; i++){

        newClause = []

        for (j=0; j<n+N; j++){
            newClause.push(o(j,i))
        }

        clauses.push(newClause)
    }

    comment("input gate has input value")

    for (i = 0; i < n; i++){

        for(t = 0; t < Math.pow(2,n); t++){
            if(ith_bit(t, i)){
                clauses.push([v(i,t)])
            } else {
                clauses.push([not(v(i,t))])
            }
        }

    }

function sixClauseGateValue(c0,c1,v0,v1,vir,t,i0,i1) {
    return [
        [not(c0), not(c1), i0?v0:not(v0), i1?v1:not(v1), not(vir),t],
        [not(c0), not(c1), i0?v0:not(v0), i1?v1:not(v1), vir, not(t)]
    ];
}

    comment("internal gates produce calculated value")

    for (i = n; i < N+n; i++){

        for (j0 = 0; j0 < i; j0++){

            for (j1 = 0; j1 < j0; j1++){
                for(r = 0; r < Math.pow(2,n); r++){

                    for (i0 = 0; i0 < 2; i0++){
                        for (i1 = 0; i1 < 2; i1++){
                            clauses = clauses.concat(sixClauseGateValue(
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

    comment("outputs match truth table")

function tableMatch(o,v,vl) {
    if(vl){
        return [[not(o),v]]
    } else {
        return [[not(o),not(v)]]
    }
}

    for (k = 0; k < m; k++){
        table.forEach( row => {
            for(i = 0; i < n+N; i++){

                clauses = clauses.concat(tableMatch(
                    o(i,k), 
                    v(i,row.in), 
                    ith_bit(row.out, k)
                    ))

            }
        })
    }


commentTruthTable()
commentVariableMapping()
emitClauses(clauses)
