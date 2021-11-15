#!

echo 4parity
date; timeout 2h bash -c './searchMinGates.sh 20 stdtables/parity/4parity.table -raz'; date

echo 4mod3
date; timeout 2h bash -c './searchMinGates.sh 20 stdtables/mod3/4mod3.table -raz'; date

echo 10parity2bit
date; timeout 2h bash -c './searchMinGates.sh 20 stdtables/partialparity/10parity2bit.table -raz'; date

echo 5majority
date; timeout 2h bash -c './searchMinGates.sh 20 stdtables/majority/5majority.table -raz'; date