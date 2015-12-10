/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

function game(num) {
	// Initialize game with new winning number
	this.playersGuess = undefined;
	this.winningNumber = this.generateWinningNumber();
	this.prevGuesses = [];

	if (num === undefined) {
		this.totTurns = 5;
	}
	else {
		this.totTurns = num;
	}
}

game.prototype.maxTurns = function() {
	return this.totTurns;
}

/* **** Guessing Game Functions **** */

// Generate the Winning Number

game.prototype.generateWinningNumber = function() {
	// add code here
	return Math.floor(99 * Math.random()) + 1;
}

game.prototype.setGuess = function(num) {
		this.playersGuess = num;
}

game.prototype.getGuess = function () {
		return this.playersGuess;
}

game.prototype.getWinningNum = function() {
		return this.winningNumber;
}

game.prototype.getPrevious = function() {
		return this.prevGuesses;
}

game.prototype.addGuess = function(num) {
		this.prevGuesses.push(num);
}

// Fetch the Players Guess

game.prototype.playersGuessSubmission = function(){
	// add code here
	this.setGuess(+$('#guess').val());
	this.checkGuess();
}

// Determine if the next guess should be a lower or higher number

game.prototype.lowerOrHigher = function(){
	// add code here
	if (this.getGuess() < this.getWinningNum()) {
		return "lower";
	}
	return "higher";
}

// Generate message to player based on whether guess is higher/lower
// and how close to winning number the guess is

game.prototype.guessMessage = function(){
	var messageText = "Your guess is ";
	messageText += this.lowerOrHigher() + " and ";

	var distanceFrom = Math.abs(this.getWinningNum() - this.getGuess());
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

game.prototype.guessesRemaining = function() {
	return 5 - this.getPrevious().length;
}

// Check if the Player's Guess is the winning number 

game.prototype.checkGuess = function(){
	// add code here
	var statusText = "";
	if (this.getGuess() === this.getWinningNum()) {
		statusText = "You won!";
	}
	else {
		for (var i = 0; i < this.getPrevious().length; i++) {
			if (this.getGuess() === this.getPrevious()[i]) {
				statusText = "You already guessed that number.";
			}
		}
		if (statusText === "") {
			this.addGuess(this.getGuess());
			this.remainingMessage("You have " + this.guessesRemaining() + " more guess(es)...")
			statusText = this.guessMessage();
		}
	}

	this.statusMessage(statusText);
}

// Create a provide hint button that provides additional clues to the "Player"

game.prototype.provideHint = function(){
	// add code here
	var hintArray = [], statusText = "";
	// amount of numbers to suggest based on how many guesses are left
	var numHints = {
		1: 2,
		2: 4,
		3: 6,
		4: 8
	}

	if (this.getPrevious().length === 0) {
		statusText = "Please try to guess at least once!"
	}

	else {

		// add random numbers to array
		for (var i = 0; i < numHints[this.guessesRemaining()] - 1; i++) {
			hintArray.push(this.generateWinningNumber());
		}

		// add winning number to array
		hintArray.push(this.getWinningNum());

		// sort array
		sort(hintArray);

		statusText = "One of these values is the winning number: [" + hintArray + "]. Submit a guess!";
	}

	this.statusMessage(statusText);

}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here

}

// Update status line with message

game.prototype.statusMessage = function(text) {
	$(".messages").slideDown();
	$('#status').text(text);
}

game.prototype.remainingMessage = function(text) {
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
	var guessGame = new game();

	$("#submit").on("click", function() {
		guessGame.playersGuessSubmission();
	});

	$("#hint").on("click", function() {
		$(".messages").slideDown();
		guessGame.provideHint();
	});

	$("#playAgain").on("click", function () {
		guessGame = new game();
		$('.messages').slideUp();
		$('#guess').val('');
		$('#numTurns').text('You have ' + guessGame.maxTurns() + ' more guesses...');
	});

	$("button").on("mouseover", function() {
		$(this).addClass("highlighted");
	});

	$("button").on("mouseout", function() {
		$(this).removeClass("highlighted");
	});

});
