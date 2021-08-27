"use strict";
//Time to make it read from file
exports.__esModule = true;
var utils = require("./utils.js");
var N = 2; // gates
var n = 3; // inputs
var m = 1; // outputs
//translate variable names
function c(i, j, k) {
    return utils.variable("c_" + i + "_" + j + "_" + k);
}
function o(i, j) {
    return utils.variable("o_" + i + "_" + j);
}
function v(i, t) {
    return utils.variable("v_" + i + "_" + t);
}
function tt(i, b1, b2) {
    return utils.variable("t_" + i + "_" + b1 + "_" + b2);
}
//helper functions
function not(name) {
    return "-" + name;
}
function ith_bit(num, i) {
    return ((num >> i) & 1);
}
//generate reduction
utils.addComment("one port of a gate receives one connection");
for (var i = n; i < n + N; i++) {
    for (var j = 0; j < i; j++) {
        for (var k = 0; k < j; k++) {
            utils.addClause([not(c(i, 0, j)), not(c(i, 0, k))]);
            utils.addClause([not(c(i, 1, j)), not(c(i, 1, k))]);
        }
        //first input has smaller index than second
        for (var k = j; k < i; k++) {
            utils.addClause([not(c(i, 0, j)), not(c(i, 1, k))]);
        }
    }
}
for (var i = n; i < n + N; i++) {
    var newClause0 = [];
    var newClause1 = [];
    for (var j = 0; j < i; j++) {
        newClause0.push(c(i, 0, j));
        newClause1.push(c(i, 1, j));
    }
    utils.addClause(newClause0);
    utils.addClause(newClause1);
}
utils.addComment("one output of the circuit receives one connection");
for (var i = 0; i < m; i++) {
    for (var j = 0; j < n + N; j++) {
        for (var l = 0; l < j; l++) {
            utils.addClause([not(o(j, i)), not(o(l, i))]);
        }
    }
}
for (var i = 0; i < m; i++) {
    var newClause = [];
    for (var j = 0; j < n + N; j++) {
        newClause.push(o(j, i));
    }
    utils.addClause(newClause);
}
utils.addComment("input gate has input value");
for (var i = 0; i < n; i++) {
    for (var t = 0; t < Math.pow(2, n); t++) {
        if (ith_bit(t, i)) {
            utils.addClause([v(i, t).toString()]);
        }
        else {
            utils.addClause([not(v(i, t))]);
        }
    }
}
function sixClauseGateValue(c0, c1, v0, v1, vir, t, i0, i1) {
    return [
        [not(c0), not(c1), i0 ? v0 : not(v0), i1 ? v1 : not(v1), not(vir), t],
        [not(c0), not(c1), i0 ? v0 : not(v0), i1 ? v1 : not(v1), vir, not(t)]
    ];
}
utils.addComment("internal gates produce calculated value");
for (var i = n; i < N + n; i++) {
    for (var j0 = 0; j0 < i; j0++) {
        for (var j1 = 0; j1 < j0; j1++) {
            for (var r = 0; r < Math.pow(2, n); r++) {
                for (var i0 = 0; i0 < 2; i0++) {
                    for (var i1 = 0; i1 < 2; i1++) {
                        utils.addClauses(sixClauseGateValue(c(i, 0, j0), c(i, 1, j1), v(j0, r), v(j1, r), v(i, r), tt(i, i0, i1), i0, i1));
                    }
                }
            }
        }
    }
}
utils.addComment("outputs match truth table");
function tableMatch(o, v, vl) {
    if (vl) {
        return [[not(o), v]];
    }
    else {
        return [[not(o), not(v)]];
    }
}
for (var k = 0; k < m; k++) {
    table.forEach(function (row) {
        for (var i = 0; i < n + N; i++) {
            cs = cs.concat(tableMatch(o(i, k), v(i, row["in"]), ith_bit(row.out, k)));
        }
    });
}
utils.commentTruthTable();
utils.commentVariableMapping();
utils.emitClauses();
