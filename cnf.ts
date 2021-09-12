import { Literal, not } from './literal';

import { VariableDict } from './variabledict';



export type Clause = (Literal[]|string)//imterface dimacsline

export class CNF {

    private clauses: Clause[] = []

    addClause(xs: Clause) {
        this.clauses.push(xs)
    }

    addClauses(xs: Clause[]) {
        this.clauses = this.clauses.concat(xs)
    }

    /*readable
    dimacs
    varmap*/


    dimacs(): string {

        return "p cnf " + VariableDict.getVarCount() + " " + this.clauses.length + "\n"
            + this.clauses.map(clause => clause.map(x => x.getDimacs()).join(" ") + " 0" ).join("\n")

    }

    dimacsClause(c:Clause): string {
        retun ""
    }

    addOneHot(xs:Literal[]): void {

        const l: number = xs.length

        for (var i = 0; i < l; i++){
            
            for (var j=0; j<i; j++){
                
                this.addClause([not(xs[i]), not(xs[j])])

            }

        }

        let newClause = []

        for (var i=0; i<l; i++){
            newClause.push(xs[i])
        }

        this.addClause(newClause)

    }

}