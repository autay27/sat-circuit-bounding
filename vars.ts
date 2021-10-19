import { newvar } from './variabledict';

import { Literal } from './literal';

export function c(i: number, j: number, k: number): Literal {
    return newvar("c_" + i + "_" + j + "_" + k)
}

export function o(i: number, j: number): Literal {
    return newvar("o_" + i + "_" + j)
}

export function v(i: number, t: number): Literal {
    return newvar("v_" + i + "_" + t)
}

export function t(i: number, b1: number, b2: number): Literal {
    return newvar("t_" + i + "_" + b1 + "_" + b2)
}

export function d(i: number, l: number): Literal {
    return newvar("d_" + i + "_" + l)
}