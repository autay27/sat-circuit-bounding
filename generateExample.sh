TAB=$1
RED=$2
MAX=$3
echo "Table: ${TAB}"
echo "Code used to generate problem: ${RED}"
echo "Search up to #gates: ${MAX}"
echo "Results output to ./examples/"

#minisat exit codes: 10=SAT, 20=UNSAT
i=1
msresult=20

while [[ "$i" -le "${MAX}" ]] && [[ "$msresult" -eq 20 ]]
do
    #It would be nice to binary search for the min. gates in the future
    PROB=$(tempfile -p prob_)
    echo ts-node ${RED} $i ${TAB} > ${PROB}
    ts-node ${RED} $i ${TAB} > ${PROB}
    i=$((i+1))

    minisat "${PROB}" > /dev/null
    msresult=$?
done

if [[ "$msresult" -eq 10 ]]
then
j=$((i-1))
echo "Smallest circuit has $j gates"
else
echo "No solution found with up to ${MAX} gates"
fi