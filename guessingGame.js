/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber = generateWinningNumber();
var prevGuesses = [];

$(document).ready(function() {
	$("#submit").on("click", function() {
		playersGuessSubmission();
	});
});


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor(99 * Math.random()) + 1;
	
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	playersGuess = +$('#guess').val();
	checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	if (playersGuess < winningNumber) {
		return "lower";
	}
	return "higher";
}

// Generate message to player based on whether guess is higher/lower
// and how close to winning number the guess is

function guessMessage(){
	var messageText = "Your guess is ";
	messageText += lowerOrHigher() + " and ";

	var distanceFrom = Math.abs(winningNumber - playersGuess);
	if (distanceFrom > 20) {
		messageText += "more than 20 digits away from ";
	}
	else if (distanceFrom > 10) {
		messageText += "within 20 digits of ";
	}
	else if (distanceFrom > 5) {
		messageText += "within 10 digits of ";
	}
	else {
		messageText += "within 5 digits of ";
	}

	messageText += "the winning number";
	return messageText;
}


// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	var statusText = "";
	if (playersGuess === winningNumber) {
		statusText = "You won!";
	}
	else {
		for (var i = 0; i < prevGuesses.length; i++) {
			if (playersGuess === prevGuesses[i]) {
				statusText = "You already guessed that number.";
			}
		}
		if (statusText === "") {
			prevGuesses.push(playersGuess);
			statusText = guessMessage();
		}
	}

	$('#status').text(statusText);
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */

