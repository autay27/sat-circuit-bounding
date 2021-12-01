#!
FOLDER=$1
SAT=$2

outname="${SAT}"_$(echo "${FOLDER}" | sed -r 's#/#_#g')$(date +%Y%m%d_%H%M%S)

touch "${outname}"

echo "Trying all problems in ${FOLDER}; Using ${SAT}; Times output to ${outname}"

for f in ./${FOLDER}*.problem; do
    echo -n "${SAT} $(echo "${f}" | \
        sed -r 's#gates\.problem##g' | \
        cut -d'/' -f3-5 --output-delimiter=' ' )" >> "${outname}"
    i=1
    while [[ "$i" -le 3 ]] 
    do 
        start=`date +%s.%N`
        
        cat "${f}" | "${SAT}" > /dev/null
        
        end=`date +%s.%N`
        runtime=$( echo "$end - $start" | bc -l )

        echo -n " $runtime" >> "${outname}"

        timedout=$?
        #if timed out, will equal 124

        if [[ "$timedout" -eq 124 ]]
        then
            echo -n "timed out after 2h; moving on"  >> "${outname}"
            i=4
        else
            i=$((i+1))
        fi
    done

    echo ""  >> "${outname}"

done