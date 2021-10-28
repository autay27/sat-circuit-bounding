# sat-circuit-bounding

Finding if a circuit for a 3and truth table using 2 gates exists 

<pre><code>
ts-node reduce.ts 2 examples/3and.table | minisat
</code></pre>

Searching for the number of gates needed to make a circuit for a 3and truth table, up to 5 gates 

<pre><code>
./searchMinGates.sh 5 tables/3and.table 
</code></pre>

Flags can be used - for a list 

<pre><code>
cat helpreduce
</code></pre>

### Reductions used

#### restrictgen

as described [here](https://logic.pdmi.ras.ru/~arist/papers/sat09.pdf) excluding the 6-clauses.
Also extended to higher fan-in.

#### restrictvalues

restrict: Kulikov's 6-clauses. Only suitable when fan-in=2.

restrictAON: Encode type of gate by two bits regardless of fan-in.

Don't use the t-variables from Kulikov. Introduce new variables m<sub>i0</sub> and m<sub>i1</sub> for each gate i. Total of 2N<sup>2</sup> variables. (note: would like to change to fa for fanin and ty for type, as in Razborov)

if m<sub>i0</sub>, i is a NOT gate (which negates its first input and ignores the rest) - leads to O(N<sup>2</sup>2<sup>n</sup>) 4-clauses.

else, if m<sub>i1</sub>, i is an OR gate, else an AND gate. Achieve by:

1) making the value of i equal to the value of the first input bit whenever inputs to i are homogenous - leads to O(N<sup>f+1</sup>2<sup>n</sup>) 2f+2-clauses.

2) making the value of i equal to the value of m<sub>i1</sub> whenever inputs to i are not homogenous - leads to O(N<sup>f+1</sup>2<sup>n</sup>f<sup>2</sup>) f+5-clauses. The f+5-clauses are derived from:

for i, j<sub>0</sub>...j<sub>f</sub>, r in [0..2<sup>n</sup>) l1 < l0 < f,

(¬c<sub>i0j<sub>0</sub></sub> v ¬c<sub>i1j<sub>1</sub></sub> ... ¬c<sub>ifj<sub>f</sub></sub>) v m<sub>i0</sub> v (v<sub>j<sub>l0</sub></sub> <-> ¬v<sub>j<sub>l1</sub></sub>) v (v<sub>ir</sub> <-> m<sub>i1</sub>)

#### restrictdnf

Suitable when restrictAON is used. 

For each pair of connectible gates i,j, if i is an AND gate, only allow it to connect to ports on AND or OR gates. If i is an OR gate, only allow it to connect to ports on other OR gates. 

Leads to O(fN<sup>2</sup>) 4-clauses and O(fN<sup>2</sup>) 5-clauses.

#### restrictgates

Suitable when Kulikov's 6-clauses are used. Restrict to only allow a given set of gates (eg AND, OR, NOT). We add O(1) 4-clauses requiring that each gate's t-variables do not match any other type of gate.

#### restrictdepth: 

Introduce d 'depth levels' with an indicator variable d<sub>il</sub> true iff gate i is on level l. Total of Nd variables.

A gate must be on exactly 1 level. Leads to O(N<sup>2</sup>d) 2-clauses and O(d) N-clauses.

If gates A and B are on levels l1 and l2, a connection may only exist from A to B if l1 < l2. Leads to O(N<sup>2</sup>d<sup>2</sup>) 3-clauses.

### Terminology

Source - produces a value corresponding to one input to the overall circuit

Sink - consumes a value corresponding to one output of the overall circuit

Value/result of a gate - the gate's boolean output given a certain pair of input values.

Port - where a gate takes a boolean input from another gate. Each gate has two ports.

n - # sources

N - # gates

m - # sinks

f - fanin of gates

d - max depth of circuit