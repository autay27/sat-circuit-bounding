var myArgs = process.argv.slice(2);

const ins = parseInt(myArgs[0])
const majority = Math.floor(ins / 2) + 1
console.log("Majority function with " + ins + " bit input")


function pad(str:string, size: number):string {
    while (str.length < size) str = "0" + str
    return str
}

for (var i = 0; i<Math.pow(2,ins); i++){
    let j = i
    let set_bits = 0
    while(j>0){

        set_bits += j & 1
        j = j>>1
    }

    console.log(pad(i.toString(2), ins) + " " + ((set_bits >= majority) ? 1 : 0)) 
}
