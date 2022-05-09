#!/bin/bash

#SBATCH --job-name=mod3_32threads
#SBATCH --time=300:00:00
#SBATCH --partition=long
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=32
#SBATCH --mail-type=BEGIN,END
#SBATCH --mail-user=august.taylor@univ.ox.ac.uk

module load Glucose

./searchMinGates.sh glucose-syrup 4mod3probs/ 32




