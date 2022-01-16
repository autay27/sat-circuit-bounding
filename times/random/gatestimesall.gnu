#arg1 title
#arg2 table type

array files = ['maplesat_stdprobs_kulikov_random_3rand1020220103_194541', 'maplesat_stdprobs_kulikov_random_3rand1120220103_194548',  'maplesat_stdprobs_kulikov_random_3rand120220103_194540',  'maplesat_stdprobs_kulikov_random_3rand1220220103_194548',  'maplesat_stdprobs_kulikov_random_3rand1320220103_194549',  'maplesat_stdprobs_kulikov_random_3rand1420220103_194549',  'maplesat_stdprobs_kulikov_random_3rand1520220103_194550',  'maplesat_stdprobs_kulikov_random_3rand1620220103_194551',  'maplesat_stdprobs_kulikov_random_3rand220220103_194551',  'maplesat_stdprobs_kulikov_random_3rand320220103_194552',  'maplesat_stdprobs_kulikov_random_3rand420220103_194552',  'maplesat_stdprobs_kulikov_random_3rand520220103_194553',  'maplesat_stdprobs_kulikov_random_3rand620220103_194555',  'maplesat_stdprobs_kulikov_random_3rand720220103_194556',  'maplesat_stdprobs_kulikov_random_3rand820220103_194556',  'maplesat_stdprobs_kulikov_random_3rand920220103_194557' ]

set terminal png size 600, 500
set output ("%d.png",ARG1)

set title ARG1
set xlabel 'Gates'
set ylabel 'Times (s)' 
set yrange [0:0.1]

set key left

set multiplot

do for [i=1:|files|] {
plot files[i] using ($0):($5+$6+$7)/3 with linespoints notitle
}

unset multiplot
