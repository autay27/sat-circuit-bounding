#!

MAX=$1
TABLE=$2
shift 2
FLAGS=$*

#minisat exit codes: 10=SAT, 20=UNSAT
i=1
msresult=20

while [[ "$i" -le "${MAX}" ]] && [[ "$msresult" -eq 20 ]]
do
    echo "Checking $i gates"
    ts-node reduce.ts $i "${TABLE}" "${FLAGS}" | minisat > /dev/null
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
