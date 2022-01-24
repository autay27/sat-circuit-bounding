import { parseTable, isNumeric } from "./utils";

import {CNF} from './cnf';

import { Parameters } from './parameters';

import * as gen from './restrictgen';

import * as gates from './restrictgates';

import * as depth from './restrictdepth';

import * as DPLL from './dpll';

import * as values from './restrictvalues';

import * as DNF from './restrictdnf';

import * as naive from './restrictnaive';

import * as razborov from './restrictrazborov';

//I think I should be using some sort of argument parsing library for all this..
var myArgs = process.argv.slice(2).join(' ').split(/\s+/);

var readable = false
var failed = false
var restrictingGates = true
var maxDepth = 0
var fanin = 0
var dnf = false
var dpll = false
var naivever = false
var raz = false

var allowedGates = [ 0b0001, 0b0111, 0b1010 ]

if (myArgs.length<2 || !isNumeric(myArgs[0])) {
    console.log("Usage: reduce maxgates truthtable [flags]")
    failed = true
}

var i = 2
while(i < myArgs.length){
    const flag = myArgs[i]
    var next = ""
    switch(flag){
        case "-m":
        case "-monotonic":
            allowedGates = [ 0b0001, 0b0111 ]
            break;
        case "-d":
        case "-depth":
            next = myArgs[i+1] 
            if (isNumeric(next)){
                maxDepth = parseInt(next)
                if(maxDepth < 1) argError(flag, next)
                else i+=1
            } else {
                argError(flag, next)
            }
            break;
        case "-fanin":
            next = myArgs[i+1] 
            if (isNumeric(next)){
                fanin = parseInt(next)
                if(fanin < 2) argError(flag, next)
                else i+=1
            } else {
                argError(flag, next)
            }
            break;     
        case "-dnf":
            dnf = true
            break;        
        case "-dpll":
            dpll = true
            break;
        case "-readable":
            readable = true
            break;
        case "-naive":
            naivever = true
            break;
        case "-raz":
        case "-razborov":
            raz = true
            break;
        case "":
            break;
        default:
            flagError(flag)
    }

    i++
}

if(!restrictingGates && fanin > 2) {
    console.log("Haven't implemented general fanin above 2!")
    failed = true    
}

if(dnf && fanin == 0 && !naive) {
    console.log("Haven't implemented Kulikov DNF!")
    failed = true    
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
    //have you heard of a case statement...
    if (fanin > 0) {
        cnf = gen.restrict(params, cnf, fanin)
        cnf = values.restrictAON(params, cnf, fanin)
        if (dnf) cnf = DNF.restrict(params, cnf, fanin)
    } else if (!naivever) {
        cnf = gen.restrict(params, cnf, 2)
        cnf = values.restrict(params, cnf)
        if (restrictingGates) cnf = gates.restrict(params, cnf, allowedGates)
    } else if (!raz) {
        naive.restrict(params,cnf)
        if(dnf) naive.restrictDNF(params, cnf)
    } else {
        razborov.restrict(params,cnf)
    }

    if (maxDepth > 0) cnf = depth.restrict(params, cnf, maxDepth)


//output
    if (readable) {
        console.log(cnf.readable())
    } else if (!dpll){
        cnf.commentVarMap()
        console.log(cnf.dimacs())
    } else {
        if (DPLL.solve(cnf)){
            console.log("DPLL returns true")
            process.exit(10)
        } 
        else {
            console.log("DPLL returns false")
            process.exit(20)
        }
    }

} else {
    console.log("cat reducehelp for more details")
}