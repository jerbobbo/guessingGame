/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var gameStatus = {
	playersGuess: 0,
	winningNumber: 0,
	prevGuesses: [],
	getGuess: function () {
		return playersGuess;
	},
	getWinningNum: function() {
		return winningNumber;
	},
	getPrevious: function() {
		return prevGuesses;
	},
	setGuess: function(num) {
		playersGuess = num;
	},
	setWinner: function(num) {
		winningNumber = num;
	},
	setGuessHist: function(arr) {
		prevGuesses = arr;
	},
	addGuess: function(num) {
		prevGuesses.push(num);
	}
}

initialize();

/* **** Guessing Game Functions **** */

// Set new winning number, clear prevGuesses, and reset DOM
function initialize() {
	gameStatus.setWinner(generateWinningNumber());
	gameStatus.setGuessHist([]);
	$('.messages').slideUp();
	$('#guess').val('');
	$('#numTurns').text('You have 5 more guesses...');
}

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor(99 * Math.random()) + 1;
	
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	gameStatus.setGuess(+$('#guess').val());
	checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	if (gameStatus.getGuess() < gameStatus.getWinningNum()) {
		return "lower";
	}
	return "higher";
}

// Generate message to player based on whether guess is higher/lower
// and how close to winning number the guess is

function guessMessage(){
	var messageText = "Your guess is ";
	messageText += lowerOrHigher() + " and ";

	var distanceFrom = Math.abs(gameStatus.getWinningNum() - gameStatus.getGuess());
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

// Check how many guesses are remaining

function guessesRemaining() {
	return 5 - gameStatus.getPrevious().length;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	var statusText = "";
	if (gameStatus.getGuess() === gameStatus.getWinningNum()) {
		statusText = "You won!";
	}
	else {
		for (var i = 0; i < gameStatus.getPrevious().length; i++) {
			if (gameStatus.getGuess() === gameStatus.getPrevious()[i]) {
				statusText = "You already guessed that number.";
			}
		}
		if (statusText === "") {
			gameStatus.addGuess(gameStatus.getGuess());
			remainingMessage("You have " + guessesRemaining() + " more guess(es)...")
			statusText = guessMessage();
		}
	}

	statusMessage(statusText);
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	var hintArray = [], statusText = "";
	// amount of numbers to suggest based on how many guesses are left
	var numHints = {
		1: 2,
		2: 4,
		3: 6,
		4: 8
	}

	if (gameStatus.getPrevious().length === 0) {
		statusText = "Please try to guess at least once!"
	}

	else {

		// add random numbers to array
		for (var i = 0; i < numHints[guessesRemaining()] - 1; i++) {
			hintArray.push(generateWinningNumber());
		}

		// add winning number to array
		hintArray.push(gameStatus.getWinningNum());

		// sort array
		sort(hintArray);

		statusText = "One of these values is the winning number: [" + hintArray + "]. Submit a guess!";
	}

	statusMessage(statusText);

}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here

}

// Update status line with message

function statusMessage(text) {
	$(".messages").slideDown();
	$('#status').text(text);
}

function remainingMessage(text) {
	$('#numTurns').text(text);
}

// swap function to be used by sort function below
function swap(arr,index1,index2) {
		
	var val1 = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = val1;
	
}

// Function to sort array in alphanumeric order
function sort(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[i]) {
				swap(arr,i,j);
			}
		} 
	}
}

/* **** Event Listeners/Handlers ****  */

$(document).ready(function() {
	$("#submit").on("click", function() {
		playersGuessSubmission();
	});

	$("#hint").on("click", function() {
		$(".messages").slideDown();
		provideHint();
	});

	$("#playAgain").on("click", function () {
		initialize();
	});

	$("button").on("mouseover", function() {
		$(this).addClass("highlighted");
	});

	$("button").on("mouseout", function() {
		$(this).removeClass("highlighted");
	});

});
