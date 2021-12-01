#arg1 title
#arg2 correct number of gates
#arg3-5 file names

set terminal png size 600, 500
set output ("%d.png",ARG1)

set title ARG1
set xlabel 'Gates'
set ylabel 'Times (s)' 

#show correct # gates
set arrow from ARG2, graph 0 to ARG2, graph 1 nohead lc rgb "red"

set key left

plot ARG3 using ($4):($5+$6+$7)/3 with linespoints title 'maplesat', \
    ARG4 using ($4):($5+$6+$7)/3 with linespoints title 'minisat', \
    ARG5 using ($4):($5+$6+$7)/3 with linespoints title 'picosat' 