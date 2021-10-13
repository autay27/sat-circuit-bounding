TAB=$1
RED=$2
MAX=$3

NAME=$(echo "${TAB}" | grep -o /[0-9a-Z]* | sed s#/##)

echo "Results output to ./examples/${NAME}/"

#minisat exit codes: 10=SAT, 20=UNSAT
i=1
msresult=20

while [[ "$i" -le "${MAX}" ]] && [[ "$msresult" -eq 20 ]]
do
    echo "Checking $i gates"
    prob=$(tempfile -p prob_)
    solution=$(tempfile -p solution_)
    ts-node ${RED} $i ${TAB} > ${prob}
    i=$((i+1))

    minisat "${prob}" ${solution} > /dev/null
    msresult=$?
done

if [[ "$msresult" -eq 10 ]]
then
i=$((i-1))
echo "Smallest circuit has $i gates"

#output evidence files
mkdir -p examples/${NAME}/

ts-node ${RED} $((i-1)) ${TAB} > examples/${NAME}/prob_unsat

cat ${prob} > examples/${NAME}/prob_sat

cat ${solution} > examples/${NAME}/solution_sat

./decodeSolution.sh examples/${NAME}/prob_sat examples/${NAME}/solution_sat > examples/${NAME}/solution_readable

./solutionToDotAON.sh examples/${NAME}/solution_readable > examples/${NAME}/solution.dot

dot -Tpng examples/${NAME}/solution.dot > examples/${NAME}/solution.png

else
echo "No solution found with up to ${MAX} gates"
fi
