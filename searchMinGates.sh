#!

MAX=$1
TABLE=$2
shift 2
FLAGS=$*

dpll=0
if [[ "$1" == "-dpll" ]]
then
    dpll=1
fi
#minisat exit codes: 10=SAT, 20=UNSAT
i=1
msresult=20

echo "searching for circuit for ${TABLE}"

while [[ "$i" -le "${MAX}" ]] && [[ "$msresult" -eq 20 ]]
do
    echo "Checking $i gates"
    if [[ "$dpll" -eq 0 ]]
    then
        ts-node reduce.ts $i "${TABLE}" "${FLAGS}" | minisat > /dev/null
    else
        ts-node reduce.ts $i "${TABLE}" "${FLAGS}" > /dev/null
    fi
    msresult=$?
    i=$((i+1))
    
done

if [[ "$msresult" -eq 10 ]]
then
    i=$((i-1))
    echo "Smallest circuit has $i gates"
else
    echo "No solution found with up to ${MAX} gates"
fi
