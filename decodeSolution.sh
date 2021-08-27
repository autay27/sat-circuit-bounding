#!/usr/bin/sh

# expected inputs are <problem file with var names and map> <SAT solution>

PROB=$1
SAT=$2
echo "Problem file : ${PROB}"
echo "Solution file: ${SAT}"

VARVAL=$(tempfile -p varval_)
VARMAP=$(tempfile -p varmap_)

cat ${SAT} | tr ' ' '\n' | grep -v SAT | egrep -v "^0$" > ${VARVAL}
cat ${PROB} | sed '1,/index to name/ d' > ${VARMAP}

paste -d' ' ${VARMAP} ${VARVAL} | cut -d' ' -f4,5 | sed -E 's/ [0-9]+/ TRUE/' | sed 's/ -.*//'
