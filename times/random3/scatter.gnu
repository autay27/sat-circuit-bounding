set terminal png size 800, 600
set output "4bit_scatter.png"

set xlabel 'Minimum size'
set ylabel 'Total time to check for sizes 1-11' 

plot 'sizes_totaltimes' using 2:3 with points pt 7 ps 1 notitle

#set output "4bit_scatter_small.png"

#set yrange [0:400]

#plot 'sizes_totaltimes' using 2:3 with points pt 7 ps 1 notitle
