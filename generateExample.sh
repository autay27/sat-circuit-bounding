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
    prob=$(tempfile -p prob_)
    solution=$(tempfile -p solution_)
    echo ts-node ${RED} $i ${TAB} > ${prob}
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
mkdir examples/${NAME}/

ts-node ${RED} $((i-1)) ${TAB} > examples/${NAME}/prob_unsat

ts-node ${RED} $i ${TAB} > examples/${NAME}/prob_sat

cat ${solution} > examples/${NAME}/solution_sat

./decodeSolution.sh examples/${NAME}/prob_sat examples/${NAME}/solution_sat > examples/${NAME}/solution_readable

else
echo "No solution found with up to ${MAX} gates"
fi