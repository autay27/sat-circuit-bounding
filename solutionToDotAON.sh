#!/usr/bin/sh

SOLN=$1

echo "digraph {"

cat ${SOLN} | grep TRUE | grep c | sed 's/TRUE//' | awk -F'_' '{ print $4 "-> " $2 ";"}'

cat ${SOLN} | grep t_ | \
    sed 's/$/ FALSE/' | sed 's/TRUE FALSE/TRUE/' | \
    paste - - | \
    sed 's/^t_\([0-9]*\)/\1 [ label = "/' | \
    sed 's#t_[0-9]*_##g' | \
    sed 's/_//' | sed 's/$/"];/' | sed 's/\t//g' | \
    sed 's/..FALSE..FALSE/AND/' | \
    sed 's/..FALSE..TRUE/OR/' | \
    sed 's/..TRUE..FALSE/NOT/' | \
    sed 's/..TRUE..TRUE/NOT/'

cat ${SOLN} | grep o | grep TRUE | tr -s 'o_TRUE' ' ' | sed 's#^ \([0-9]*\) #\1 -> output#'

echo "}"
