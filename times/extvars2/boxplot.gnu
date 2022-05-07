#arg1 title

set terminal png size 800, 600
set output "boxplot_".ARG1.".png"

#graphtitle = 'Times taken to'

#set title graphtitle
set ylabel 'Seconds'
set xlabel 'Number of extension axioms added' 

set style data boxplot

#set yrange [0:13]
#set ytics 0,1,12

set yrange [20:160]
set xtics ('0' 1, '50,000' 2, '100,000' 3, '200,000' 4)

plot for [i=1:3] ARG1 using (i+1):i notitle, ARG1 using (1):4 notitle
