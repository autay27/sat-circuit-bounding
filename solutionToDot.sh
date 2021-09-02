#!/usr/bin/sh

SOLN=$1

echo "Solution file: ${SOLN}"

cat ${SOLN} | grep TRUE | tr -d 'TRUE ' 

#time to learn how to use dot.
