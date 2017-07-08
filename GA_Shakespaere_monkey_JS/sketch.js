/**
 * Created by himanshuahuja on 27/05/17.
 */

var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;


function setup() {
    bestPhrase = createP("Best phrase:");
    bestPhrase.class("best");

    allPhrases = createP("All phrases:");
    allPhrases.position(600, 10);
    allPhrases.class("all");

    stats = createP("Stats");
    stats.class("stats");

    target = "To be or not to be.";
    popmax = 200;
    mutationRate = 0.02;

    //Creating a population with a target phrase, mutation rate, population max
    population = new Population(target, mutationRate, popmax);
}


function draw(){
    //Generate mating Pool
    population.naturalSelection();
    //Create next generation
    population.generate();
    //Calculate the fitness of the population
    population.calcFitness();

    population.evaluate();

    if (population.isFinished()) {
        noLoop();
    }

    displayInfo();
}


function displayInfo() {
    var answer = population.getBest();
    bestPhrase.html("Best phrase:<br>" + answer);

    var statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext +=    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext +=    "total population:      " + popmax + "<br>";
    statstext +=    "mutation rate:         " + floor(mutationRate * 100) + "%";

    stats.html(statstext);

    allPhrases.html("All phrases:<br>" + population.allPhrases());
}
