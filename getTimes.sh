#!/bin/bash

FOLDER=$1
SAT=$2

outname="${SAT}"_$(echo "${FOLDER}" | sed -r 's#/#_#g')$(date +%Y%m%d_%H%M%S)

touch "${outname}"

echo "Trying all problems in ${FOLDER}/; Using ${SAT}; Times output to ${outname}"

result="$(mktemp)"

readarray -d '' entries < <(printf '%s\0' ./${FOLDER}/*.problem | sort -zV)
for f in  "${entries[@]}"; do

    echo -n "${SAT} $(echo "${f}" | \
        sed -r 's#gates\.problem##g' | \
        cut -d'/' -f3- --output-delimiter=' ' )" >> "${outname}"
    i=1
    
    while [[ "$i" -le 3 ]] 
    do 
        start=`date +%s.%N`
        if [[ "$SAT" = "picosat" ]]
        then
            cat "${f}" | "${SAT}" > $result
        else
            "${SAT}" -verb=0 "${f}" $result
        fi
        
        end=`date +%s.%N`
        runtime=$( echo "$end - $start" | bc -l )

        echo -n " $runtime" >> "${outname}"

        i=$((i+1))

    done

    echo -n " " >> "${outname}"

    cat $result >> "${outname}"

    echo ""  >> "${outname}"

done

rm -f "$result"