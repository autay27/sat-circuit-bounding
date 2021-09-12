digraph {
0 [ label = "input0"]
1 [ label = "input1"]
2 [ label = "input2"]
3 [ label = "input3"]
4 [ label = "input4"]
5 [ label = "input5"]
0 -> 2;
1 -> 2;
0 -> 3;
1 -> 3;
2 -> 4;
3 -> 4;
3 -> 5;
4 -> 5;
2 [ label = "AND"];
3 [ label = "OR"];
4 [ label = "NOT"];
5 [ label = "AND"];
5 -> output0 
}

