#!

MAX=$1
TABLES=$2
shift 2
FLAGS=$*

if [ -d "./$TABLES" ]
then
    shopt -s globstar
    for file in ./"$TABLES"/**/*; do
            echo "Checking $file up to $MAX gates"
            SECONDS=0
            timeout 2h bash -c "./searchMinGates.sh $MAX $file $FLAGS"
            duration=$SECONDS
            echo "$duration seconds elapsed"
    done
else
    echo "Usage: timeStdTables.sh maxGates tableFolder [flags for reduce]"
fi