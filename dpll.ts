import { CNF, Clause } from './cnf';

import { Variable } from './variable';

import { not, Literal } from './literal';

import { getRandomVar } from './variabledict';

export function solve(cnf: CNF): boolean{

    const firstAssgt = new Literal(getRandomVar(), (Math.random() < 0.5))
    const cs = cnf.clause_list()

    if (dpll(cs, firstAssgt)) return true
    else return dpll(cs, not(firstAssgt))
}

//We assume the sat formula doesn't contain any self-contradictory clauses
function dpll(cs: Clause[], assgt: Literal): boolean {

    var newcs = applyAssgt(cs, assgt)

    if (newcs.some(x => x.isEmpty())) {
        return false
    }


    //unit propagation

    var i = 0
    while (i < newcs.length){
        if(newcs[i].isUnit()){
            newcs = applyAssgt(newcs, newcs[i].ls[0])
            if (newcs.length == 0) return true
            i = 0 
        } else if (newcs[i].isEmpty()){
            return false
        } else {
            i++
        }
    }

    if (newcs.length == 0) return true
    else {
        //For now we just pick the new assignment to be the variable at the top of the list
        const nextAssgt = newcs[0].ls[0]
        if (dpll(newcs, nextAssgt)) return true
        else return dpll(newcs, not(nextAssgt))
    }

}

function applyAssgt(cs: Clause[], assgt: Literal): Clause[] {
    //console.log("applying " + assgt.getDimacs() + " on " + cs.length + " clauses")
    //console.log(cs.filter(c => !c.includes(assgt)).map(c => c.without(not(assgt))).map(c => c.getDimacs()))
    return cs.filter(c => !c.includes(assgt)).map(c => c.without(not(assgt)))

}