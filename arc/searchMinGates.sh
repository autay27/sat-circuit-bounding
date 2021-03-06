#!

SAT=$1
FOLDER=$2
shift 2
FLAGS=$*


outname="${SAT}"_$(echo "${FOLDER}" | sed -r 's#/#_#g')$(date +%Y%m%d_%H%M%S)


#minisat exit codes: 10=SAT, 20=UNSAT
i=1
msresult=20
#result="${TMPDIR}/tmpresult"
result="$(mktemp)"


echo "searching for smallest sat. problem in ${FOLDER}; Using ${SAT}; results output to ${outname}"

readarray -d '' entries < <(printf '%s\0' ./${FOLDER}/*.problem | sort -zV)
for f in "${entries[@]}"; do
    echo "Checking ${i}th file"

    #outputting the current solver / problem / gates

    echo -n "${SAT} $(echo "${f}" | \
        sed -r 's#gates\.problem##g' | \
        cut -d'/' -f3-6 --output-delimiter=' ' )" | \
        sed -r 's#  # #' >> "${outname}"

    #run, get result and time 

    start=`date +%s.%N`

    if [[ "$SAT" = "glucose-syrup" ]]
    then
        #"${SAT}" -model "${f}" | sed -n '/\(SATISFIABLE\|UNSATISFIABLE\)/,$p' > $result
        "/home/august/Downloads/glucose-syrup-4.1/glucose-syrup-4.1/parallel/glucose-syrup" -model "${f}" | \
            sed -n '/\(SATISFIABLE\|UNSATISFIABLE\)/,$p' | \
            sed -r 's/s //' > $result
        msresult=${PIPESTATUS[0]}

    else
        "${SAT}" "${f}" $result
        msresult=$?

    fi


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