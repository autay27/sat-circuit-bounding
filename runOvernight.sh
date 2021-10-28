#!

date; timeout 2h bash -c './searchMinGates.sh 15 stdtables/majority/5majority.table -fanin 2'; date

date; timeout 2h bash -c './searchMinGates.sh 15 stdtables/and/8and.table'; date

date; timeout 2h bash -c './searchMinGates.sh 15 stdtables/parity/3parity.table -dnf'; date