#arg1 no. of bits input to functions

set terminal png size 800, 600
set output sprintf("%srand_sizes.png",ARG1)

graphtitle = sprintf('Minimal sizes of circuits for a sample of 16 %s-bit random functions', ARG1)

set title graphtitle
set xlabel 'Gates'
set ylabel 'Number of functions' 

set style histogram 
set boxwidth 0.75 absolute
#set xrange [6:11]

plot ARG1."rand_histogram" using 1:2 with boxes notitle
