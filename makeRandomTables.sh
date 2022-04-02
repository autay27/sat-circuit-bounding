MAX=$1
SIZE=$2
OUTPTH=$3

echo "${MAX} random tables for ${SIZE} bit inputs output to ./${OUTPTH}/"

mkdir -p ${OUTPTH}/

i=1
while [[ "$i" -le "${MAX}" ]] 
do

    ts-node makeRandomTable.ts ${SIZE} > ${OUTPTH}/${SIZE}bits${i}.table

    i=$((i+1))
done