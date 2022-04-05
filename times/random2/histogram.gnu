set terminal png size 800, 600
set output "4bit_sizes.png"

#graphtitle = 'Number of 4-bit Boolean functions sampled with minimal circuit size'

#set title graphtitle
set xlabel 'Gates'
set ylabel 'Number of functions' 

set style data histogram 
set style fill solid

set yrange [0:12]
set ytics 0,1,12

plot "min_histogram" using 2:xtic(1) notitle linecolor 'black'
