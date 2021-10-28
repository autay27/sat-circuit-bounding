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

import { Literal, not } from './literal';

export function parseTable(filename: string): table {

    let file: string = fs.readFileSync('./'+filename, 'utf-8')

    const notcomment = /^[01 ]+ [01]+$/

    const rs = file.split('\n').filter(line => line.match(notcomment)).map(str => str.split(' '))
    const t = rs.map(row => {
            return {in: parseInt(row[0], 2), out: parseInt(row[1], 2)}
        })

    return {rows: t, ins: rs[0][0].length, outs: rs[0][1].length}

}

export function isNumeric(xs: string) {
    return /^\d+$/.test(xs);
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

export function getRandomInt(min: number, max: number): number {
    //from docs
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export function pad(str:string, size: number):string {
    while (str.length < size) str = "0" + str
    return str
}

export function flatMap<A,B>(xs: A[], f: (x: A)=>B[] ): B[] {
    return xs.map(f).reduce((x,y) => x.concat(y))
}

export function* kGatesSeq(k: number, max: number) {
    console.assert(max >= k)
    var c = seq(0, k)

    while(true){
    
        yield c

        while(c[0]+1 < c[1]){
            c[0]++
            yield c
        }

        var i = 0
        while(i < k-1 && c[i]+1 == c[i+1]) i++
        
        c[i]++

        if(i == k-1 && c[k-1] == max) return
        else {
            while(i > 0) {
                i--
                c[i] = i
            }
        }
    }
}

export function orImplication(c: Literal[], l1: Literal, l2: Literal): Literal[][] {
    return([
        c.concat([not(l1), l2]),
        c.concat([l1, not(l2)])
        ])
}

export function orConjunction(c: Literal[], l1: Literal, l2: Literal): Literal[][] {
    return([
        c.concat([l1]),
        c.concat([l2])
        ])
}