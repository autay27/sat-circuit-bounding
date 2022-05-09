#arg1 title
#arg2 correct number of gates
#arg3-5 file names

set terminal png size 600, 500
set output ("%d.png",ARG1)

set xlabel 'Gates'
set ylabel 'Time (s)' 

#show correct # gates
if(ARG2 > 0) {
  set arrow from ARG2, graph 0 to ARG2, graph 1 nohead lc rgb "red"
}

set key left

max(x, y) = (x > y ? x : y)
median(x,y,z) = (x > y ? (x < z ? x : max(z,y)) : (y < z ? y : max(x,z)))
    
plot ARG3 using ($4):(median($5,$6,$7)) with linespoints title 'maplesat', \
    ARG4 using ($4):(median($5,$6,$7)) with linespoints title 'minisat', \
    ARG5 using ($4):(median($5,$6,$7)) with linespoints title 'picosat' 
