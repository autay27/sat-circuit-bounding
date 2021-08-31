"use strict";
//truth table input
exports.__esModule = true;
var fs = require('fs');
function parseTable(filename) {
    var file = fs.readFileSync('./' + filename, 'utf-8');
    var notcomment = /^[01 ]+ [01]+$/;
    var rs = file.split('\n').filter(function (line) { return line.match(notcomment); }).map(function (str) { return str.split(' '); });
    var t = rs.map(function (row) {
        return { "in": parseInt(row[0], 2), out: parseInt(row[1], 2) };
    });
    return { rows: t, ins: rs[0][0].length, outs: rs[0][1].length };
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
    t.rows.forEach(function (row) {
        addComment(JSON.stringify(row));
    });
}
exports.commentTruthTable = commentTruthTable;
function commentVariableMapping() {
    addComment("variable names");
    vars.forEach(function (name, index) {
        addComment(name + " " + (index + 1));
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
