#!

echo and
time ./searchMinGates.sh 15 stdtables/and/3and.table -naive -dnf
time ./searchMinGates.sh 15 stdtables/and/4and.table -naive -dnf
time ./searchMinGates.sh 15 stdtables/and/5and.table -naive -dnf
time ./searchMinGates.sh 15 stdtables/and/6and.table -naive -dnf
time ./searchMinGates.sh 15 stdtables/and/7and.table -naive -dnf
time ./searchMinGates.sh 15 stdtables/and/8and.table -naive -dnf
echo parity
time ./searchMinGates.sh 15 stdtables/parity/2parity.table -naive -dnf
time ./searchMinGates.sh 15 stdtables/parity/3parity.table -naive -dnf
echo mod3
time ./searchMinGates.sh 15 stdtables/mod3/2mod3.table -naive -dnf
time ./searchMinGates.sh 15 stdtables/mod3/3mod3.table -naive -dnf
echo majority
time ./searchMinGates.sh 15 stdtables/majority/3majority.table -naive -dnf
time ./searchMinGates.sh 15 stdtables/majority/4majority.table -naive -dnf


#date; timeout 2h bash -c './searchMinGates.sh 15 stdtables/parity/3parity.table -dnf'; date
