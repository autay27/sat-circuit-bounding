"use strict";
//truth table input
exports.__esModule = true;
var fs = require('fs');
function parseTable(filename) {
    var file = fs.readFileSync('./' + filename, 'utf-8');
    var notcomment = /^[01 ]+ [01]$/;
    return file.split('\n').filter(function (line) { return line.match(notcomment); })
        .map(function (str) {
        var rows = str.split(' ');
        return { "in": parseInt(rows[0], 2), out: parseInt(rows[1], 2) };
    });
}
exports.parseTable = parseTable;
//dimacs output
//prefer to pass cs as arg
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
//take truth table as arg
function commentTruthTable(t) {
    addComment("target truth table");
    t.forEach(function (row) {
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
    console.log(cs.map(function (clause) {
        if (clause[0][0] == 'c')
            return clause.join(" ");
        else
            return (clause.join(" ") + " 0");
    }).join("\n"));
}
exports.emitClauses = emitClauses;
