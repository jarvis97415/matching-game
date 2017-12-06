/*jshint esversion: 6 */
/*jslint browser: true, devel: true */
// Define main game variable
let cardIndex, lastIndex, matches, clickCount, moveCount, cardPick, stars;
let noclick = false;
let startTimer = false;
// Define game sound effects
const shuffleSound = new sound('cardshuffle.mp3');
const wonSound = new sound('applause.mp3');
const loseSound = new sound('youlose.mp3');
const flipSound = new sound('quickflip.mp3');
const matchSound = new sound('coin.mp3');
const wrongSound = new sound('wrong.mp3');
// Define game music
const musicTracks = [
    "bensound-littleidea.mp3",
    "bensound-memories.mp3",
    "bensound-thelounge.mp3"
];
// Pick random background music
const music = new sound(musicTracks[Math.floor(Math.random()*3)]);
// Randomly set color for gradient
let r1 = [Math.floor(Math.random()*255)];
let g1 = [Math.floor(Math.random()*255)];
let b1 = [Math.floor(Math.random()*255)];
let r2 = [Math.floor(Math.random()*255)];
let g2 = [Math.floor(Math.random()*255)];
let b2 = [Math.floor(Math.random()*255)];
// Define game backgrounds
const backGrounds = [
    "rainbow.jpg",
    "redwoods.jpg",
    "sunset.jpg"
];
// Get the modal
const modal = document.getElementById('theModal');
// Get the timer and set interval
const timer = document.getElementById('timer');
let timerVar = setInterval(gameTimer, 1000);
// Define game timer variables
let seconds, minutes;
// Define picked cards list
let openCards = [];
// Define all available playing cards
let allCards = [
    "em-avocado",
    "em-alarm_clock",
    "em-8ball",
    "em-baby_chick",
    "em-banana",
    "em-barber",
    "em-bat",
    "em-bee",
    "em-bicyclist",
    "em-biohazard_sign",
    "em-cake",
    "em-crab",
    "em-computer",
    "em-rocket",
    "em-water_buffalo",
    "em-bouquet",
    "em-cat",
    "em-chipmunk",
    "em-mushroom",
    "em-old_key",
    "em-pie",
    "em-diamonds",
    "em-airplane",
    "em-anchor",
    "em-camera",
    "em-apple",
    "em em-four_leaf_clover",
    "em-octopus",
    "em-palm_tree",
    "em-penguin",
    "em-owl",
    "em-peach",
    "em-nerd_face",
    "em-musical_score",
    "em-lightning",
    "em-hot_pepper",
    "em-guitar",
    "em-hammer",
    "em-footprints",
    "em-frog",
    "em-gear",
    "em-fish",
    "em-fire",
    "em-evergreen_tree",
    "em-carrot"
];
// Define list for used playing cards
let cards = [];
// Declare function to init game
function initGame() {
    // Randomly pick and draw background image
    $('body').css('background','url("\img/' + backGrounds[Math.floor(Math.random()*3)] + '"\) no-repeat center');
    // Randomly pick colors for gradient
    $('.deck').css('background','linear-gradient(160deg, rgba(' + r1 + ',' + g1 + ',' + b1 +',255), rgba(' + r2 + ',' + g2 + ',' + b2 +',255))');
    // Stop timer if not running
    clearInterval(timerVar);
    // Reset variables in prep to begin game
    stars = 3;
    minutes = 0;
    seconds = 0;
    startTimer = false;
    matches = 0;
    cardPick = 0;
    moveCount = 0;
    clickCount = 0;
    // Play shuffle sound
    shuffleSound.play();
    // Call function to shuffle all playing cards
    shuffle(allCards);
    // Pick first 8 cards after shuffle
    for (let index = 0; index < 8; index++) {
        cards[index] = allCards[index];
    }
    // Duplicate cards list
    cards = cards.concat(cards);
    // shuffle playing cards
    shuffle(cards);
    // Clear score board
    $('.deck').empty();
    $('#timer').html('0:00');
    $('body > div > section > span').text('0');
    // Add 3 stars to start out
    $('.stars').html('<li><i class="em em-star"></li><li><i class="em em-star"></li><li><i class="em em-star"></li>');
    // Draw shuffled cards in play field
    for (let index = 0; index < cards.length; index++){
        $('.deck').append('<li class="card"><i class="em ' + cards[index] + '"></i></li>');
    }
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// Declare function for the game timer
function gameTimer() {
        // increment seconds
        seconds++;
        // after 60 seconds clear seconds and increment minutes
        if (seconds===60) {
            seconds=0;
            minutes++;
        }
        // add extra "0" for less than 10 seconds
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        // Display timer in window
        timer.innerHTML = minutes + ":" + seconds;
        // Remove stars according to play or lose game if time is 2 minutes
        if ((minutes === 0) && (seconds === 30) || (moveCount === 5)) {
            stars = 2;
            $('.stars').html('<li><i class="em em-star"></li><li><i class="em em-star"></li>');
        }
        if ((minutes === 1) && (seconds === 0) || (moveCount === 10)) {
            stars = 1;
            $('.stars').html('<li><i class="em em-star"></li>');
        }
        if (minutes === 2) {youLost();}
}
// Declare function for not a match
function clearLastCards(lastcard,curcard) {
    // Increment move counter
    moveCount++;
    // Play wrong match sound
    setTimeout(function () {
        "use strict";
        wrongSound.play();
    }, 250);
    // Disable play during false match
    noclick = true;
    // Clear picked cards list
    openCards = [];
    // Display wrong match with red card background
    $('li:nth-child(' + lastcard + ')').toggleClass("open wrong");
    $('li:nth-child(' + curcard + ')').toggleClass("open wrong");
    // Unhappy little animation
    setTimeout('$(\"li:nth-child(' + lastcard + ')\").css(\"transform\",\"rotate(10deg)\");',100);
    setTimeout('$(\"li:nth-child(' + curcard + ')\").css(\"transform\",\"rotate(10deg)\");',100);
    setTimeout('$(\"li:nth-child(' + lastcard + ')\").css(\"transform\",\"rotate(-10deg)\");',300);
    setTimeout('$(\"li:nth-child(' + curcard + ')\").css(\"transform\",\"rotate(-10deg)\");',300);
    setTimeout('$(\"li:nth-child(' + lastcard + ')\").css(\"transform\",\"rotate(0deg)\");',500);
    setTimeout('$(\"li:nth-child(' + curcard + ')\").css(\"transform\",\"rotate(0deg)\");',500);
    // Return wrong match to original state after 1 second
    setTimeout('$(\"li:nth-child(' + lastcard + ')\").toggleClass(\"open wrong\");',1000);
    setTimeout('$(\"li:nth-child(' + curcard + ')\").toggleClass(\"open wrong\");',1000);
    // Hide wrong match
    setTimeout('$(\"li:nth-child(' + lastcard + ')\").toggleClass(\"open show\");',1000);
    setTimeout('$(\"li:nth-child(' + curcard + ')\").toggleClass(\"open show\");',1000);
    // Allow game play to continue
    setTimeout(function () {
        "use strict";
        noclick = false;
    }, 1000);
}
// Declare function to display clicked card
function displayCard(cardIndex) {
    // Play flip card sound
    flipSound.play();
    // Display clicked card
    $('li:nth-child(' + cardIndex + ')').toggleClass('open show');
}
// Declare function to add clicked card to the picked cards list
function addOpenCardList(cardIndex) {
    openCards.push(cards[cardIndex - 1]);
}
// Declare function to Reveal matched pair
function lockMatch(lastcard,curcard) {
    // Play matched pair sound
    setTimeout(function () {
        "use strict";
        matchSound.play();
    }, 250);
    // Indicate cards match with green background
    $('li:nth-child(' + curcard + ')').toggleClass('match');
    $('li:nth-child(' + lastcard + ')').toggleClass('match');
    // Happy little animation - I know its ugly! I agree.
    setTimeout('$(\"li:nth-child(' + lastcard + ')\").css(\"transform\",\"scale(1.1,0.9)\");',100);
    setTimeout('$(\"li:nth-child(' + curcard + ')\").css(\"transform\",\"scale(1.1,0.9)\");',100);
    setTimeout('$(\"li:nth-child(' + lastcard + ')\").css(\"transform\",\"scale(0.9,1.1)\");',300);
    setTimeout('$(\"li:nth-child(' + curcard + ')\").css(\"transform\",\"scale(0.9,1.1)\");',300);
    setTimeout('$(\"li:nth-child(' + lastcard + ')\").css(\"transform\",\"scale(1.0,1.0)\");',500);
    setTimeout('$(\"li:nth-child(' + curcard + ')\").css(\"transform\",\"scale(1.0,1.0)\");',500);
    // Increment matches
    matches++;
    // Clear picked cards list
    openCards = [];
}
// Declare function to count moves
function countMove() {
    // Display move counter in window
    $('body > div > section > span').text(moveCount);
}
// Declare function for winning game
function youWon() {
    // Stop game timer
    clearInterval(timerVar);
    // Play you won sound
    wonSound.play();
    // Clear modal body text
    $('#theModal > div > div.modal-body').empty();
    // Display time and move counter information
    $('#theModal > div > div.modal-body').html('<p>Your time was ' + minutes + ':' + seconds + '</p><p>You made ' + moveCount + ' mismatched moves.</p><p>Your Star rating is ' + stars + '!');
    // Display modal
    modal.style.display = "block";
    // Detect close button click in modal to continue game
    $('#theModal > div > div.modal-header > span').click(function(){
        // Hide the modal
        modal.style.display = "none";
        // Reload page
        location.reload();
    });
    // Detect click outside of modal to continue game
    window.onclick = function(event) {
        if (event.target == modal) {
            // Hide the modal
            modal.style.display = "none";
            // Reload page
            location.reload();
        }
    };
}
// Declare function for losing game
function youLost() {
    // Stop game timer
    clearInterval(timerVar);
    // Play you lost sound
    loseSound.play();
    // Clear modal body text
    $('#theModal > div > div.modal-body').empty();
    // Clear modal header h1 text
    $('#theModal > div > div.modal-header > h1').empty();
    // Change modal header for losing game
    $('#theModal > div > div.modal-header > h1').text('Game Over - Times Up!');
    // Change color of modal for losing game
    $('#theModal > div > div.modal-header').css('background', '#ff0000');
    $('#theModal > div > div.modal-footer').css('background', '#ff0000');
    // Change modal body text for losing game
    $('#theModal > div > div.modal-body').html('<p>Sorry!</p><p>Please try again.</p>');
    // Display modal
    modal.style.display = "block";
    // Detect close button click in modal to continue game
    $('#theModal > div > div.modal-header > span').click(function(){
        // Hide the modal
        modal.style.display = "none";
        // Reload page
        location.reload();
    });
    // Detect click outside of modal to continue game
    window.onclick = function(event) {
        if (event.target == modal) {
            // Hide the modal
            modal.style.display = "none";
            // Reload page
            location.reload();
        }
    };
}
// Declare function for handling all sound events
function sound(src) {
    // Create audio element in html
    this.sound = document.createElement("audio");
    // Set pointer to sound file
    this.sound.src = src;
    // Set sound attributes
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    // Add new audio element to html
    document.body.appendChild(this.sound);
    // Declare function for playing sound
    this.play = function(){
        this.sound.play();
    };
    // Declare function to stop playback
    this.stop = function(){
        this.sound.pause();
    };
}
// Reload page if restart icon is clicked
$('.restart').click(function(){
    location.reload();
});
// Declare main function for game logic
function mainLoop() {
    // set up the event listener for a card. If a card is clicked:
    $('body > div > ul > li').click(function(){
        if (noclick) {return;}
        cardIndex = parseInt( $(this).index() ) + 1;
        // Check to make sure card isn't already open else display the card's symbol
        if ($('li:nth-child(' + cardIndex + ')').hasClass('open')) {
            return;
        } else displayCard(cardIndex);
        // Increment click counter
        clickCount++;
        // Start timer and play music on first card click
        if (clickCount === 1) {
            timerVar = setInterval(gameTimer, 1000);
            setTimeout(function () {
                "use strict";
                music.play();
            }, 1000);
        }
        // add the card to a *list* of "open" cards
        addOpenCardList(cardIndex);
        // if the list already has another card, check to see if the two cards match
        // if the cards do match, lock the cards in the open position
        if ((openCards.length === 2) && (openCards[1] === openCards[0])) {
            lockMatch(lastIndex,cardIndex);
        }
        // if the cards do not match, remove the cards from the list and hide the card's symbol
        if ((openCards.length === 2) && (matches != 8)) {
            clearLastCards(lastIndex,cardIndex);
        }
        // increment the move counter and display it on the page
        countMove();
        // if all cards have matched, display a message with the final score
        if (matches === 8) {
            youWon();
        }
        // Done with cardIndex, set it to lastIndex
        lastIndex = cardIndex;
    });
}
initGame();
mainLoop();