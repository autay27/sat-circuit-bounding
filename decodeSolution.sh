#!/usr/bin/sh

# expected inputs are <problem file with var names> <SAT solution>

PROB=$1
SAT=$2
echo "Problem file: ${PROB}"
echo "Solution file: ${SAT}"

VARVAL=$(tempfile -p varval_)
VARMAP=$(tempfile -p varmap_)

#format the sat output to one variable per line
cat ${SAT} | tr ' ' '\n' | grep -v SAT | egrep -v "^0$" > ${VARVAL}
#
cat ${PROB} | sed '1,/variable/ d' > ${VARMAP}

paste -d' ' ${VARMAP} ${VARVAL} | cut -d' ' -f4,5 | sed -E 's/ [0-9]+/ TRUE/' | sed 's/ -.*//'

#wat is going on why does the final variable's name not get printed in the comments
