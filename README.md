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

#### reduce_gen

as described [here](https://logic.pdmi.ras.ru/~arist/papers/sat09.pdf).

#### reduce_AON

modified to only allow AND, OR, NOT gates. Done by changing the t-variables (explain) modifying the 'six-clause' to:

¬c<sub>i0j<sub>0</sub></sub> v ¬c<sub>i1j<sub>1</sub></sub> v ¬(t<sub>i0</sub> = i<sub>0</sub>) v ¬(t<sub>i1</sub> = i<sub>1</sub>) v ( ((¬v<sub>j<sub>0</sub>r</sub> ^ ¬v<sub>j<sub>1</sub>r</sub>) -> v<sub>ir</sub> = TT_i0i1_00) etc)

Guess which gates j<sub>0</sub> and j<sub>1</sub> are connected to gate i; determine the values of vars t<sub>i0</sub> and t<sub>i1</sub>; use these to restrain v<sub>ir</sub> according to the corresponding truth table.

#### reduce_depth: 

AON with limited circuit depth - note: it's not AON right now

explain the thing about simply having a variable for each gate x level and only allowing you to move down the levels


### Terminology

Hopefully to stop me confusing myself

Input gate - not a logic gate, produces a value corresponding to one input to the overall circuit

Output gate - not a logic gate, consumes a value corresponding to one output of the overall circuit

Value/result of a gate - the gate's boolean output given a certain pair of input values.

Port - where a gate takes a boolean input from another gate. Each gate has two ports.

