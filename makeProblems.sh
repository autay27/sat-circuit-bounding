MAX=$1
TABLE=$2
OUTPTH=$3
shift 3
FLAGS=$*

echo "SAT problems for ${TABLE} circuit existence up to ${MAX} gates outputting to ./${OUTPTH}/"

mkdir -p ${OUTPTH}/

i=1
while [[ "$i" -le "${MAX}" ]] 
do
        ts-node reduce.ts ${i} "${TABLE}" "${FLAGS}" > ${OUTPTH}/${i}gates.problem
        i=$((i+1))
done