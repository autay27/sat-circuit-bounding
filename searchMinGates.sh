#!

SAT=$1
FOLDER=$2
shift 2
FLAGS=$*


outname="${SAT}"_$(echo "${FOLDER}" | sed -r 's#/#_#g')$(date +%Y%m%d_%H%M%S)


#minisat exit codes: 10=SAT, 20=UNSAT
i=1
msresult=20
result="$(mktemp)"

echo "searching for smallest sat. problem in ${FOLDER}; Using ${SAT}; results output to ${outname}"

readarray -d '' entries < <(printf '%s\0' ./${FOLDER}/*.problem | sort -zV)
for f in "${entries[@]}"; do
    echo "Checking $i gates"

    #outputting the current solver / problem / gates

    echo -n "${SAT} $(echo "${f}" | \
        sed -r 's#gates\.problem##g' | \
        cut -d'/' -f3-6 --output-delimiter=' ' )" | \
        sed -r 's#random2 #random2_#' >> "${outname}"

    #run, get result and time 

    start=`date +%s.%N`

    if [[ "$SAT" = "picosat" ]]
    then
        cat "${f}" | "${SAT}" > $result
    else
        "${SAT}" "${f}" $result
    fi

    msresult=$?

    end=`date +%s.%N`

    runtime=$( echo "$end - $start" | bc -l )


    #output to file

    echo -n " $runtime" >> "${outname}"

    echo -n " " >> "${outname}"

    cat $result >> "${outname}"

    echo ""  >> "${outname}"

    #stop if sat

    if [[ "$msresult" -eq 10 ]]; then
        break
    fi

    i=$((i+1))
    
done

rm -f "$result"