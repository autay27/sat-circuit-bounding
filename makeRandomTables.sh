MAX=$1
CPY=$2
OUTPTH=$3

echo "${CPY}x Even tables up to ${MAX} output to ./${OUTPTH}/random/"

mkdir -p ${OUTPTH}/random/

i=2
while [[ "$i" -le "${MAX}" ]] 
do
    j=1
    while [[ "$j" -le "${CPY}" ]] 
    do
        ts-node makeRandomTable.ts ${i} > ${OUTPTH}/random/${i}random${j}.table
        j=$((j+1))
    done
    i=$((i+2))
done