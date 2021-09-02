# sat-circuit-bounding

Finding if a circuit for a truth table using 3 gates exists 

<<<<<<< HEAD
<pre><code>
ts-node reduce_gen.ts examples/3and.table 3 > prob && minisat prob out ; cat out
</code></pre>

Searching for the number of gates needed to make a circuit for a truth table

<pre><code>
./generateExample.sh examples/3and.table reduce_gen.ts 3 
</code></pre>
=======
ts-node reduce_gen.ts truth.table > prob && minisat prob out ; cat out
>>>>>>> 48bec2cfd62a75ba8ed77260934cf62360bddd6c
