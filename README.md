# sat-circuit-bounding

Checking if a circuit for a truth table using n gates exists 

<pre><code>
ts-node reduce_gen.ts examples/3and.table 3 > prob && minisat prob out ; cat out
</code></pre>

Searching for the number of gates needed to make a circuit for a truth table
& outputting solution (with some details) to examples/

<pre><code>
./generateExample.sh tables/3and.table reduce_gen.ts 3 
</code></pre>

--

Reductions used:

reduce_gen: as described [here](https://logic.pdmi.ras.ru/~arist/papers/sat09.pdf).
reduce_AON: modified to only allow AND, OR, NOT gates
reduce_depth: AON with limited circuit depth *note: it's absolutely not this right now