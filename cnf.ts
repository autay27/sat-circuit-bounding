import { Literal, not } from './literal';

import { VariableDict } from './variabledict';

interface DimacsLine {
    getDimacs(): string
    getReadable(): string
}

export class Clause implements DimacsLine{

    ls: Literal[] //make it private later..
    
    constructor(ls: Literal[]){
        this.ls = ls
    }
    
    getDimacs(): string {
        return this.ls.map(x => x.getDimacs()).join(" ") + " 0"
    } 

    getReadable(): string {
        return this.ls.map(x => x.getReadable()).join(" ")
    }

    includes(l: Literal): boolean {
        //is this optimal?
        return this.ls.some(x => x.getDimacs() == l.getDimacs())
    }

    without(l: Literal): Clause {
        return new Clause(this.ls.filter(x => x.getDimacs() != l.getDimacs()))
    }

    isEmpty(): boolean { return this.ls.length == 0 }

    isUnit(): boolean { return this.ls.length == 1 }

    concat(ls: Literal[]): Clause {
        return new Clause(this.ls.concat(ls))
    }

    orAnd(l1: Literal, l2: Literal): Clause[] {
        return [new Clause(this.ls.concat([l1])), new Clause(this.ls.concat([l2]))]
    }

    orEq(l1: Literal, l2: Literal): Clause[] {
        return [new Clause(this.ls.concat([l1, not(l2)])), new Clause(this.ls.concat([not(l1), l2]))]
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

    getReadable(): string {
        return "// " + this.s
    }
}

export class CNF {

    private clauses: DimacsLine[] = []

    add(cs: Clause[]) {
        this.clauses.concat(cs)       
    }

    //I would really rather not allow the literal lists, something to eventually fix
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

    commentVarMap() {
        this.clauses = this.clauses.concat(VariableDict.getVarMapComment().map(s => new Comment(s)))
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

    readable(): string {

        return VariableDict.getVarCount() + " variables and " + this.clauseCount() + " clauses\n"
            + this.clauses.map(clause => clause.getReadable()).join("\n")

    }

    clause_list(): Clause[] {

        return this.clauses.filter(x => x instanceof Clause) as Clause[]

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