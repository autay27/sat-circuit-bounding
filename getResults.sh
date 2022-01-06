#!/bin/bash
FOLDER=$1
SAT=$2

outname="${SAT}"_$(echo "${FOLDER}" | sed -r 's#/#_#g')$(date +%Y%m%d_%H%M%S)

touch "${outname}"

echo "Trying all problems in ${FOLDER}/; Using ${SAT}; Times output to ${outname}"

result="$(mktemp)"

for f in ./${FOLDER}/*.problem; do
    echo -n "${SAT} $(echo "${f}" | \
        sed -r 's#gates\.problem##g' | \
        cut -d'/' -f1-6 --output-delimiter=' ' \
        | sed -r 's#knuthmod3 ##g' | sed -r 's#\. ##g' )" >> "${outname}"

    start=`date +%s.%N`
    if [[ "$SAT" = "picosat" ]]
    then
        cat "${f}" | "${SAT}" > $result
    else
        "${SAT}" "${f}" $result
    fi
    
    end=`date +%s.%N`
    runtime=$( echo "$end - $start" | bc -l )

    echo -n " $runtime" >> "${outname}"

    echo -n " " >> "${outname}"

    cat $result >> "${outname}"

    echo ""  >> "${outname}"

done

rm -f "$result"