import { parseTable } from "./utils";

import {CNF} from './cnf';

import { Parameters } from './parameters';

import * as gen from './restrictgen';

import * as gates from './restrictgates';

var myArgs = process.argv.slice(2);

if (myArgs.length<2) console.log("Usage: max # gates, truth table file")

const params = new Parameters(parseInt(myArgs[0]), parseTable(myArgs[1]))

var cnf = new CNF()

cnf = gen.restrict(params, cnf, 2)

cnf = gates.restrict(params, cnf, [ 0b0001, 0b0111, 0b1010 ])

cnf.commentVarMap()
console.log(cnf.dimacs())
