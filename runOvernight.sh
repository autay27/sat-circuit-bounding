#!

date; timeout 2h bash -c './searchMinGates.sh 15 stdtables/parity/4parity.table -fanin 2'; date

date; timeout 2h bash -c './searchMinGates.sh 15 stdtables/and/8and.table -fanin 2'; date

date; timeout 2h bash -c './searchMinGates.sh 15 stdtables/majority/6majority.table -fanin 3'; date

date; timeout 2h bash -c './searchMinGates.sh 15 stdtables/majority/6majority.table -fanin 3'; date