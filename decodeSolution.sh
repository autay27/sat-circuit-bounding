#!/usr/bin/sh

# expected inputs are <problem file with var names> <SAT solution>

PROB=$1
SAT=$2
echo "Problem file: ${PROB}"
echo "Solution file: ${SAT}"

VARVAL=$(tempfile -p varval_)
VARMAP=$(tempfile -p varmap_)

#take just the variable name list from the problem file
cat ${PROB} | sed '1,/variable names/ d' > ${VARMAP}
#format the sat output to one variable per line
cat ${SAT} | tr ' ' '\n' | grep -v SAT | egrep -v "^0$" > ${VARVAL}
#create list of variables names marked true
paste -d' ' ${VARMAP} ${VARVAL} | cut -d' ' -f2,4 | sed -E 's/ [0-9]+/ TRUE/' | sed 's/ -.*//'

