import {getRandomInt, seq} from "./utils";

var myArgs = process.argv.slice(2);

const ins = parseInt(myArgs[0])
//const subset = parseInt(myArgs[1])

console.assert(ins > 2)

function chooseRandomRows(n: number){

    var rows: number[] = []
    var possibles : number[] = seq(0,Math.pow(2, ins))

    while(rows.length < n){

        const i = getRandomInt(0,possibles.length)
        rows.push(possibles[i])
        possibles.splice(i, 1)
    }

    return rows.sort((x,y) => x - y)
}

console.log("Pseudorandom (approx uniform) 4 rows of parity function with " + ins + " bit input")

function pad(str:string, size: number):string {
    while (str.length < size) str = "0" + str
    return str
}

const rows = chooseRandomRows(4)

for (const i of rows){

    let j = i 
    let set_bits = 0
  
    while(j>0){
        set_bits += j & 1
        j = j>>1
    }

    console.log(pad(i.toString(2), ins) + " " + (set_bits % 2)) 
}
