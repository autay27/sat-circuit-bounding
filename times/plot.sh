#gnuplot -c gatestimes.gnu "8and naive" 7 maplesat_stdprobs_naive_7and_20211122_223136 minisat_stdprobs_naive_7and_20211122_223341 picosat_stdprobs_naive_7and_20211122_223606 
#gnuplot -c gatestimes.gnu "7and naive" 6 maplesat_stdprobs_naive_8and_20211123_021340 minisat_stdprobs_naive_8and_20211123_022210 picosat_stdprobs_naive_8and_20211123_023145 
#gnuplot -c gatestimes.gnu "3parity naive" 8 maplesat_stdprobs_naive_3parity_20211122_222518 minisat_stdprobs_naive_3parity_20211122_222524 picosat_stdprobs_naive_3parity_20211122_222531 
#gnuplot -c gatestimes.gnu "4parity naive" 0 maplesat_stdprobs_naive_4parity_20211123_000157 minisat_stdprobs_naive_4parity_20211123_000433 picosat_stdprobs_naive_4parity_20211123_003311 
#gnuplot -c gatestimes.gnu "3mod3 naive" 6 maplesat_stdprobs_naive_3mod3_20211122_222549 minisat_stdprobs_naive_3mod3_20211122_222550 picosat_stdprobs_naive_3mod3_20211122_222551
#gnuplot -c gatestimes.gnu "4mod3 naive" 0 maplesat_stdprobs_naive_4mod3_20211123_054438 minisat_stdprobs_naive_4mod3_20211123_054833 picosat_stdprobs_naive_4mod3_20211123_063957 

ls minisat*raz* | xargs -n1 cat > minisat_raz_total
ls minisat*kulikov* | xargs -n1 cat > minisat_kulikov_total
ls minisat*naive* | xargs -n1 cat > minisat_naive_total

ls picosat*raz* | xargs -n1 cat > picosat_raz_total
ls picosat*kulikov* | xargs -n1 cat > picosat_kulikov_total
ls picosat*naive* | xargs -n1 cat > picosat_naive_total