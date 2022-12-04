pragma circom 2.0.0;

include "./../node_modules/circomlib/circuits/comparators.circom";
template historySelector() {
    
    signal input historyVector;
    signal input keywords;
    signal input treshold;
    signal output out;
    var temp;
    temp = historyVector * keywords;

    component comp = LessThan(252);
    comp.in[0] <== temp;
    comp.in[1] <== treshold;
    out <== comp.out;
}
component main { public[historyVector, keywords] } = historySelector();
