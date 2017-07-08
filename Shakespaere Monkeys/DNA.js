/**
 * Created by himanshuahuja on 27/05/17.
 */


function newChar() {
    var c = floor(random(63, 122));
    if (c === 63) c = 32; //replace ? with <space>
    if (c === 64) c = 46; //replace @ with .

    return String.fromCharCode(c);
    //This is one of the methods of the string class where
    //it returns the respective character to the integer
}

//Constructor - creates a random DNA sequence
function DNA(num) {
    //We receive the length of the DNA Sequence
    this.genes = [];
    this.fitness = 0;
    for (var i = 0; i < num; i++){
        this.genes[i] = newChar(); //Put a random sequence of 'num' characters
    }

    this.getPhrase = function () {
        return this.genes.join(""); //we perform the join function on the genes array
    }

    this.calcFitness = function(target) {
        var score = 0;
        for (var i = 0; i < this.genes.length; i++) {
            if(this.genes[i] == target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score / target.length;
        this.fitness = this.fitness * this.fitness;
    }

    this.crossover = function(partner) {
        // A new Child

        var child = new DNA(this.genes.length);

        /*var midpoint = floor(random(this.genes.length)); //Pick a random midpoint

        for (var i = 0; i < this.genes.length; i++){
            if (i > midpoint)
                child.genes[i] = this.genes[i];
            else
                child.genes[i] = partner.genes[i];
        }
        */

        //This performs much better.
        for (var i = 0; i < this.genes.length; i++) {
            var x = floor(random(2));
            if(x === 0) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }



        return child;
    }


    this.mutate = function(mutationRate) {
        for (var i = 0; i < this.genes.length; i++) {
            if(random(1) < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }
}
