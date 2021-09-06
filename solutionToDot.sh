#!/usr/bin/sh

SOLN=$1

echo "digraph {"

cat ${SOLN} | grep TRUE | grep c | sed 's/TRUE//' | awk -F'_' '{ print $4 "-> " $2 ";"}'

cat ${SOLN} | grep t_ | \
    sed 's/$/ FALSE/' | sed 's/TRUE FALSE/TRUE/' | \
    paste - - - - | \
    sed 's/^t_\([0-9]*\)/\1 [ label = "/' | \
    sed 's#t_[0-9]*_##g' | \
    sed 's/_//' | sed 's/$/"];/' | sed 's/\t/\\n/g'


echo "}"
