array files = ['maplesat_kulikov_total', 'maplesat_naive_total', 'maplesat_raz_total', 'minisat_kulikov_total', 'minisat_naive_total', 'minisat_raz_total', 'picosat_kulikov_total', 'picosat_naive_total', 'picosat_raz_total']

array labels = ['Maplesat Kulikov', 'Maplesat naive', 'Maplesat Razborov', 'Minisat kulikov', 'Minisat naive', 'Minisat Razborov', 'Picosat Kulikov', 'Picosat naive', 'Picosat Razborov']

max(x, y) = (x > y ? x : y)
median(x,y,z) = (x > y ? (x < z ? x : max(z,y)) : (y < z ? y : max(x,z)))

array SUM[|files|]
do for [i=1:|files|] {
  stats files[i] using (median($5,$6,$7)/3600) nooutput
  SUM[i] = STATS_sum
}

set style histogram 
set boxwidth 0.75 relative
set ylabel 'Total times to solve all problems (hours)' 

set terminal png size 800, 600
set yrange [0:10]

set output ("totals2.png")

set xtics rotate

plot SUM using 1:2:xticlabels(labels[$1]) with boxes notitle
