/*
truth table file format: eg with 2 inputs 1 output

comment
00 0
01 1
10 1
11 1

*/

const fs = require('fs');

import { table } from './parameters';

export function parseTable(filename: string): table {

    let file: string = fs.readFileSync('./'+filename, 'utf-8')

    const notcomment = /^[01 ]+ [01]+$/

    const rs = file.split('\n').filter(line => line.match(notcomment)).map(str => str.split(' '))
    const t = rs.map(row => {
            return {in: parseInt(row[0], 2), out: parseInt(row[1], 2)}
        })

    return {rows: t, ins: rs[0][0].length, outs: rs[0][1].length}

}

export function seq(min: number, max: number): number[] {
    let a = []
    for(var i=min; i<max; i++){
        a.push(i)
    }
    return a
}

export function ith_bit(num: number, i: number): number {
    return ((num>>i) & 1)
}