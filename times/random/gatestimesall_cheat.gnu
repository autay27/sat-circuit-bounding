#arg1 title
#arg2 table type

set terminal png size 600, 500
set output ("%d.png",ARG1)

set title ARG1
set xlabel 'Gates'
set ylabel 'Time (s)' 
set yrange [0:1.5]

set key left

plot 'maplesat_stdprobs_kulikov_random_3rand1020220103_194541' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand1120220103_194548' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand120220103_194540' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand1220220103_194548' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand1320220103_194549' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand1420220103_194549' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand1520220103_194550' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand1620220103_194551' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand220220103_194551' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand320220103_194552' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand420220103_194552' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand520220103_194553' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand620220103_194555' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand720220103_194556' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand820220103_194556' using ($0):($5+$6+$7)/3 with linespoints, \
 'maplesat_stdprobs_kulikov_random_3rand920220103_194557'  using ($0):($5+$6+$7)/3 with linespoints

