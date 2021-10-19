# sat-circuit-bounding

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

#### restrictgen

as described [here](https://logic.pdmi.ras.ru/~arist/papers/sat09.pdf).
Plan to add higher fan-in.

#### restrictgates

modified to only allow a given set of gates (eg AND, OR, NOT). We add 4-clauses requiring that each gate's t-variables do not match any other type of gate.

#### restrictdepth: 

Introduce maxDepth 'depth levels' with an indicator variable d<sub>il</sub> true iff gate i is on level l. A gate must be on exactly 1 level. If gates A and B are on levels l1 and l2, a connection may only exist from A to B if l1 < l2.

### Terminology

Source - produces a value corresponding to one input to the overall circuit

Sink - consumes a value corresponding to one output of the overall circuit

Value/result of a gate - the gate's boolean output given a certain pair of input values.

Port - where a gate takes a boolean input from another gate. Each gate has two ports.

