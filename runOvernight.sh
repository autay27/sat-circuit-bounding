#!

#timeout 4h bash -c './getTimes.sh stdprobs/raz/4mod3 maplesat'

#start=`date +%s.%N`

#cat stdprobs/raz/4mod3/9gates.problem | picosat

#end=`date +%s.%N`

#runtime=$( echo "$end - $start" | bc -l )
 
#echo "took time: " $runtime


#./makeProblems.sh 9 stdtables/partialparity/4rows8parity1.table stdprobs/kulikov/partialparity/4rows8parity1

#./makeProblems.sh 9 stdtables/partialparity/4rows8parity2.table stdprobs/kulikov/partialparity/4rows8parity2

#./makePrd oblems.sh 9 stdtables/partialparity/4rows8parity3.table stdprobs/kulikov/partialparity/4rows8parity3

#./makeProblems.sh 9 stdtables/partialparity/4rows8parity4.table stdprobs/kulikov/partialparity/4rows8parity4

#ts-node reduce.ts 8 stdtables/parity/4parity.table -extvars 50000 > stdprobs/kulikov/extvars/4parity/8gates_50kvars.problem

#./getTimes.sh stdprobs/kulikov/extvars/8and maplesat


./getTimes.sh stdprobs/kulikov/extvars2/4mod3_50k maplesat

./getTimes.sh stdprobs/kulikov/extvars2/4mod3_100k maplesat

./getTimes.sh stdprobs/kulikov/extvars2/4mod3_200k maplesat

./getTimes.sh stdprobs/kulikov/extvars2/4parity_50k maplesat

./getTimes.sh stdprobs/kulikov/extvars2/4parity_100k maplesat

./getTimes.sh stdprobs/kulikov/extvars2/4parity_200k maplesat

