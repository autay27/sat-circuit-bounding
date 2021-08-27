"use strict";
//io and dimacs generation
exports.__esModule = true;
//help with the truth table input
var table = [
    { "in": 0, out: 0 },
    { "in": 1, out: 0 },
    { "in": 2, out: 0 },
    { "in": 3, out: 0 },
    { "in": 4, out: 0 },
    { "in": 5, out: 0 },
    { "in": 6, out: 0 },
    { "in": 7, out: 1 }
];
//help with the dimacs output
var cs = [];
var vars = [];
function variable(name) {
    if (vars.indexOf(name) == -1) {
        vars.push(name);
    }
    return 1 + vars.indexOf(name);
}
exports.variable = variable;
function addComment(x) {
    cs.push(["c #### " + x]);
}
exports.addComment = addComment;
function addClause(x) {
    cs.push(x);
}
exports.addClause = addClause;
function addClauses(x) {
    cs = cs.concat(x);
}
exports.addClauses = addClauses;
function commentTruthTable() {
    addComment("target truth table");
    table.forEach(function (row) {
        addComment(JSON.stringify(row));
    });
}
exports.commentTruthTable = commentTruthTable;
function commentVariableMapping() {
    addComment("variable");
    vars.forEach(function (name, index) {
        addComment(name + " " + index);
    });
}
exports.commentVariableMapping = commentVariableMapping;
function emitClauses() {
    var realclauses = cs.filter(function (x) { return ("" + x[0]).substring(0, 2) != "c "; });
    console.log("p cnf " + vars.length + " " + realclauses.length);
    console.log(cs.map(function (terms) { return (terms.join(" ") + " 0"); }).join("\n"));
}
exports.emitClauses = emitClauses;
