#!

#timeout 4h bash -c './getTimes.sh stdprobs/raz/4mod3 maplesat'

#start=`date +%s.%N`

#cat stdprobs/raz/4mod3/9gates.problem | picosat

#end=`date +%s.%N`

#runtime=$( echo "$end - $start" | bc -l )
 
#echo "took time: " $runtime


#./makeProblems.sh 9 stdtables/partialparity/4rows8parity1.table stdprobs/kulikov/partialparity/4rows8parity1

#./makeProblems.sh 9 stdtables/partialparity/4rows8parity2.table stdprobs/kulikov/partialparity/4rows8parity2

#./makeProblems.sh 9 stdtables/partialparity/4rows8parity3.table stdprobs/kulikov/partialparity/4rows8parity3

#./makeProblems.sh 9 stdtables/partialparity/4rows8parity4.table stdprobs/kulikov/partialparity/4rows8parity4

./getTimes.sh stdprobs/kulikov/partialparity/4rows7parity1 maplesat
./getTimes.sh stdprobs/kulikov/partialparity/4rows7parity2 maplesat
./getTimes.sh stdprobs/kulikov/partialparity/4rows7parity3 maplesat
./getTimes.sh stdprobs/kulikov/partialparity/4rows7parity4 maplesat