import { Literal, not } from './literal';

import { VariableDict } from './variabledict';

interface DimacsLine {
    getDimacs(): string
}

export class Clause implements DimacsLine{

    ls: Literal[] 
    
    constructor(ls: Literal[]){
        this.ls = ls
    }

    getDimacs(): string {
        return this.ls.map(x => x.getDimacs()).join(" ") + " 0"
    }

}

export class Comment implements DimacsLine{

    s: string

    constructor(s: string){
        this.s = s
    }

    getDimacs(): string {
        return "c " + this.s
    }
}


//export type Clause = (Literal[]|string)//imterface dimacsline

export class CNF {

    private clauses: DimacsLine[] = []

    addClause(xs: Literal[]) {
        this.clauses.push(new Clause(xs))
    }

    addClauses(xs: Literal[][]) {
        this.clauses = this.clauses.concat(xs.map(xs => new Clause(xs)))
    }

    addComment(s: string) {
        this.clauses.push(new Comment(s))
    }

    addComments(ls: string[]) {
        this.clauses = this.clauses.concat(ls.map(s => new Comment(s)))
    }

    /*readable
    dimacs
    varmap*/

    private clauseCount(): number {
        return this.clauses.filter(x => x instanceof Clause).length
    }

    dimacs(): string {

        return "p cnf " + VariableDict.getVarCount() + " " + this.clauseCount() + "\n"
            + this.clauses.map(clause => clause.getDimacs()).join("\n")

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