import {pad} from "./utils";

var myArgs = process.argv.slice(2);

const ins = parseInt(myArgs[0])
const target = parseInt(myArgs[1])

console.log("Mod3 function with " + ins + " bit input, 1 when congruent to " + target )

for (var i = 0; i<Math.pow(2,ins); i++){
    let j = i
    let set_bits = 0
    while(j>0){

        set_bits += j & 1
        j = j>>1
    }

    console.log(pad(i.toString(2), ins) + " " + (set_bits % 3 == target ? 1 : 0)) 
}
