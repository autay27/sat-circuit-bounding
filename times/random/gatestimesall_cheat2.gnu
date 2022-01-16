#arg1 title
#arg2 table type

set terminal png size 600, 500
set output ("%d.png",ARG1)

set title ARG1
set xlabel 'Gates'
set ylabel 'Time (s)' 

set key left

plot 'maplesat_stdprobs_kulikov_random_4rand1020220103_194932' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand1120220103_194935' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand120220103_194557' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand1220220103_195515' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand1320220103_195808' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand1420220103_195819' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand1520220103_200217' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand1620220103_200233' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand220220103_200259' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand320220103_200746' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand420220103_201137' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand520220103_201453' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand620220103_201929' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand720220103_201935' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand820220103_202252' using ($0):($5+$6+$7)/3 with linespoints, 'maplesat_stdprobs_kulikov_random_4rand920220103_202518' using ($0):($5+$6+$7)/3 with linespoints

