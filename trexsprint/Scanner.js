var robot = require('robotjs')

//Chache screen size
var screenSize = robot.getScreenSize();

// Indexes
var X = 0
var Y = 1


// Create the "class" wrapper Scanner object
var Scanner = {}


Scanner.isOutOfBounds = function (pos) {
  if (  pos[X] < 0 || pos[Y] < 0 ||
      pos[X] >= screenSize.width ||
      pos[Y]  >= screenSize.height) {

        return true;
      }

      return false;
}


Scanner.makeInBounds = function (pos) {
  if ( pos[X] < 0 ) {
    pos[X] = 0;
  }

  if (pos[X] >= screenSize.width) {
    pos[X] = screenSize.width - 1;
  }

  if ( pos[Y] < 0 ) {
    pos[Y] = 0;
  }

  if (pos[Y] >= screenSize.height) {
    pos[Y] = screenSize.height - 1;
  }

  return pos;
}


Scanner.scanUntil = function (start, delta, matchColor, inverted, iterLimit) {

  var color, current, iterations = 0;

  // (CLONE instead of using the real one)
  current = Scanner.makeInBounds([start[X], start[Y]]);

  if(delta[X] == 0 && delta[Y] == 0) {
    return null;
  }

  while (!Scanner.isOutOfBounds(current)) {
    color = robot.getPixelColor(current[X], current[Y]);

    if (!inverted && color.toString() == matchColor) {
      return current;
    }

    if(inverted && color.toString() != matchColor) {
      return current;
    }

    current[X] += delta[X];
    current[Y] += delta[Y];
    iterations++;

    if (iterations > iterLimit) {
      return null;
    }
  }
  return null;
};

//Export the module
module.exports = Scanner;
