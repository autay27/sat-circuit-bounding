import { newvar } from './variabledict';

import { Literal } from './literal';

export function y(a: number, v: number): Literal {
    return newvar("y_" + a + "_" + v)
}

//y in paper
export function e(a: number, i: number, v: number): Literal {
    return newvar("e_" + a + "_" + i + "_" + v)
}

export function fanin(v: number): Literal {
    return newvar("Fanin(" + v + ")")
}

export function type(v: number): Literal {
    return newvar("Type(" + v + ")")
}

//InputType in paper
export function gatein(i: number, v: number): Literal {
    return newvar("GateIn_" + i + "(" + v + ")")
}

//InputType' in paper
export function varin(i: number, v: number): Literal {
    return newvar("VarIn_" + i + "(" + v + ")")
}

//InputType'' in paper
export function whichconst(i: number, v: number): Literal {
    return newvar("WhichConst_" + i + "(" + v + ")")
}

export function inputvar(i: number, v: number, j: number): Literal {
    return newvar("InputVar_" + i + "(" + v + ", " + j + ")")
}

//INPUTVAR in paper
export function varor(i: number, v: number, j: number): Literal {
    return newvar("VAROR_" + i + "(" + v + ", " + j + ")")
}

export function inputnode(i: number, v: number, u: number): Literal {
    return newvar("InputNode_" + i + "(" + v + ", " + u + ")")
}

//INPUTNODE in paper
export function nodeor(i: number, v: number, j: number): Literal {
    return newvar("NODEOR_" + i + "(" + v + ", " + j + ")")
}