var myArgs = process.argv.slice(2);

const ins = parseInt(myArgs[0])
console.log("AND function with " + ins + " bit input")


function pad(str:string, size: number):string {
    while (str.length < size) str = "0" + str
    return str
}

for (var i = 0; i<Math.pow(2,ins) - 1; i++){
    console.log(pad(i.toString(2), ins) + " " + 0)
}

console.log(pad(i.toString(2), ins) + " " + 1)
