import { newvar } from './variabledict';

import { Literal } from './literal';

export function e(i: number, a: number): Literal {
    return newvar("e_" + i + "_" + a)
}

export function x(i: number, j: number): Literal {
    return newvar("x_" + i + "_" + j)
}

export function g(i: number, index: number): Literal {
    console.assert(index < 2)
    return newvar("g_" + i + "_" + index)
}