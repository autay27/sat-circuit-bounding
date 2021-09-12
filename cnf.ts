import { Literal, not } from './literal';

export type Clause = Literal[]

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

    add_one_hot(xs:Literal[]): void {
        
        const l: number = xs.length

        for (var i = 0; i < l; i++){
            
            for (var j=0; j<i; j++){
                
                this.addClause([not(xs[i]), not(xs[j])])

            }

        }

        let newClause = []

        for (var i=0; i<l; i++){
            newClause.push(xs[i].toString())
        }

        this.addClause(newClause)

    }

}