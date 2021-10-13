# sat-circuit-bounding

<<<<<<< HEAD
Finding if a circuit for a 3and truth table using 2 gates exists 

<pre><code>
ts-node reduce_gen.ts examples/3and.table 2 > prob && minisat prob out ; cat out
</code></pre>

Searching for the number of gates needed to make a circuit for a truth table
& outputting solution (with some details) to examples/

<pre><code>
./generateExample.sh tables/3and.table reduce_gen.ts 3 
</code></pre>


### Reductions used

#### reduce_gen

as described [here](https://logic.pdmi.ras.ru/~arist/papers/sat09.pdf).

#### reduce_AON

modified to only allow AND, OR, NOT gates. We add 4-clauses requiring that each gate's t-variables do not match any other type of gate.

#### reduce_depth: 

AON with limited circuit depth - note: it's not AON right now

explain the thing about simply having a variable for each gate x level and only allowing you to move down the levels

### Terminology

Source - produces a value corresponding to one input to the overall circuit

Sink - consumes a value corresponding to one output of the overall circuit

Value/result of a gate - the gate's boolean output given a certain pair of input values.

Port - where a gate takes a boolean input from another gate. Each gate has two ports.

