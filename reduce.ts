import { parseTable, isNumeric } from "./utils";

import {CNF} from './cnf';

import { Parameters } from './parameters';

import * as gen from './restrictgen';

import * as gates from './restrictgates';

import * as depth from './restrictdepth';

import * as DPLL from './dpll';



var myArgs = process.argv.slice(2);

var failed = false
var restrictingGates = true
var maxDepth = 0
var dpll = false

var allowedGates = [ 0b0001, 0b0111, 0b1010 ]

if (myArgs.length<2 || !isNumeric(myArgs[0])) {
    console.log("Usage: reduce maxgates truthtable [flags]")
    failed = true
}

var i = 2
while(i < myArgs.length){
    const flag = myArgs[i]
    switch(flag){
        case "-m":
        case "-monotonic":
            allowedGates = [ 0b0001, 0b0111 ]
            break;
        case "-d":
        case "-depth":
            const next = myArgs[i+1] 
            if (isNumeric(next)){
                maxDepth = parseInt(next)
                if(maxDepth < 1) argError(flag, next)
                else i+=1
            } else {
                argError(flag, next)
            }
            break;
        case "-dpll":
            dpll = true
            break;
        case "":
            break;
        default:
            flagError(flag)
    }

    i++
}

function flagError(flag: string){
    console.log("invalid flag " + flag)
    i = myArgs.length
    failed = true
}

function argError(flag: string, arg: string){
    console.log("invalid argument " + arg + " to flag " + flag)
    i = myArgs.length
    failed = true
}

if (!failed){

    const params = new Parameters(parseInt(myArgs[0]), parseTable(myArgs[1]))

    var cnf = new CNF()

    cnf = gen.restrict(params, cnf, 2)

    if (restrictingGates) cnf = gates.restrict(params, cnf, allowedGates)

    if (maxDepth > 0) cnf = depth.restrict(params, cnf, maxDepth)

    if (!dpll){
        cnf.commentVarMap()
        console.log(cnf.dimacs())
    } else {
        if (DPLL.solve(cnf)) console.log("DPLL returns true")
        else console.log("DPLL returns false")
    }

} else {
    console.log("cat reducehelp for more details")
}