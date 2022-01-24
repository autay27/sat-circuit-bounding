var fs = require('fs');


var myArgs = process.argv

const folder = myArgs[2]

console.log(`trying all problems in ${folder}`)

var files = fs.readdirSync(`./${folder}/`);

for(const f of files){
    console.log(`trying ${f}`)

    for(const i of [1,2,3]){
        
    }
    
}