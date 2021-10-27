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

as described [here](https://logic.pdmi.ras.ru/~arist/papers/sat09.pdf) excluding the 6-clauses.
Also extended to higher fan-in.

#### restrictvalues

restrict: Kulikov's 6-clauses. Only suitable when fan-in=2.

restrictAON: Encode type of gate by two bits regardless of fan-in.

Don't use the t-variables from Kulikov. Introduce new variables mi0 and mi1 for each gate i. Total of 2N<sup>2</sup> variables. (note: would like to change to f for fanin and t for type, as in Razborov)

if mi0, i is a NOT gate (which negates its first input and ignores the rest) - leads to O(N<sup>2</sup>2<sup>n</sup>) 4-clauses.

else, if mi1, i is an OR gate, else an AND gate. Achieve by:

1) making the value of i equal to the value of the first input bit whenever inputs to i are homogenous - leads to O(N<sup>k+1</sup>2<sup>n</sup>k<sup>2</sup>) k+5-clauses.

2) making the value of i equal to the value of mi1 whenever inputs to i are not homogenous - leads to O(N<sup>k+1</sup>2<sup>n</sup>) k+1-clauses.

#### restrictdnf

Suitable when restrictAON is used. 

For each pair of connectible gates i,j, if i is an AND gate, only allow it to connect to ports on AND or OR gates. If i is an OR gate, only allow it to connect to ports on other OR gates. 

Leads to O(fN<sup>2</sup>) 4-clauses and O(fN<sup>2</sup>) 5-clauses.

#### restrictgates

Suitable when Kulikov's 6-clauses are used. Restrict to only allow a given set of gates (eg AND, OR, NOT). We add O(1) 4-clauses requiring that each gate's t-variables do not match any other type of gate.

#### restrictdepth: 

Introduce maxDepth 'depth levels' with an indicator variable d<sub>il</sub> true iff gate i is on level l. A gate must be on exactly 1 level. If gates A and B are on levels l1 and l2, a connection may only exist from A to B if l1 < l2.

explain the number and size of clauses

### Terminology

Source - produces a value corresponding to one input to the overall circuit

Sink - consumes a value corresponding to one output of the overall circuit

Value/result of a gate - the gate's boolean output given a certain pair of input values.

Port - where a gate takes a boolean input from another gate. Each gate has two ports.

f - fanin of gates

n - # sources

N - # gates

m - # sinks