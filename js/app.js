let cardIndex, lastIndex, matches, moveCount;
let noclick = false;

// Get the modal
var modal = document.getElementById('myModal');

// Get the timer
var timer = document.getElementById('timer');
var timerVar = setInterval(gameTimer, 1000);
let seconds, minutes;

let openCards = [];

let cards = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb"
];
cards = cards.concat(cards);

function initGame() {
    clearInterval(timerVar)
    minutes = 0;
    seconds = 0;
    startTimer = false;
    matches = 0;
    cardPick = 0;
    moveCount = 0;
    shuffle(cards);
    $('.deck').empty();
    $('.stars').empty();
    $('#timer').html('0:00');
    $('body > div > section > span').text('0');

    for (let index = 0; index < cards.length; index++){
        $('.deck').append('<li class="card"><i class="fa ' + cards[index] + '"></i></li>');
    }
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function gameTimer() {
        var d = new Date();
        seconds++;
        if (seconds===60) {
            seconds=0;
            minutes++;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
}

function clearLastCards(lastcard,curcard) {
    noclick = true;
    openCards = [];
    $('li:nth-child(' + lastcard + ') > i').parent().toggleClass("open wrong");
    $('li:nth-child(' + curcard + ') > i').parent().toggleClass("open wrong");
    setTimeout('$(\"li:nth-child(' + lastcard + ') > i\").parent().toggleClass(\"open wrong\");',1000);
    setTimeout('$(\"li:nth-child(' + curcard + ') > i\").parent().toggleClass(\"open wrong\");',1000);
    setTimeout('$(\"li:nth-child(' + lastcard + ') > i\").parent().toggleClass(\"open show\");',1000);
    setTimeout('$(\"li:nth-child(' + curcard + ') > i\").parent().toggleClass(\"open show\");',1000);
    setTimeout("noclick = false;",1000);
}

function displayCard(cardIndex) {
    $('li:nth-child(' + cardIndex + ') > i').parent().toggleClass('open show');
}

function addOpenCardList(cardIndex) {
    openCards.push(cards[cardIndex - 1]);
}

function lockMatch(lastcard,curcard) {
    $('.stars').append('<li><i class="fa fa-star"></li>');
    $('li:nth-child(' + curcard + ') > i').parent().toggleClass('match');
    $('li:nth-child(' + lastcard + ') > i').parent().toggleClass('match');
    lastIndex = -1;
    matches++;
    openCards = [];
}

function countMove() {
    moveCount++;
    $('body > div > section > span').text(moveCount);
    if (moveCount === 1) {timerVar = setInterval(gameTimer, 1000);}
}

function youWon() {
    clearInterval(timerVar);
    $('#myModal > div > div.modal-body').empty();
    $('#myModal > div > div.modal-body').html('<p>Your time was ' + minutes + ':' + seconds + '</p><p>It took you ' + moveCount + ' moves to complete the game</p>');
    modal.style.display = "block";
    $('#myModal > div > div.modal-header > span').click(function(){
        modal.style.display = "none";
        location.reload();
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            location.reload();
        }
    }
}

function mainLoop() {

    $('.restart').click(function(){
        location.reload();
    });

//* set up the event listener for a card. If a card is clicked:
    $('body > div > ul > li').click(function(){
        if (noclick) {return};
        cardIndex = parseInt( $(this).index() ) + 1;

//*  - display the card's symbol (put this functionality in another function that you call from this one)
        if ($('li:nth-child(' + cardIndex + ') > i').parent().hasClass('open')) {
            return;
        } else displayCard(cardIndex);

//*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
        addOpenCardList(cardIndex);

//*  - if the list already has another card, check to see if the two cards match
//*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

        if ((openCards.length === 2) && (openCards[1] === openCards[0])) {
            lockMatch(lastIndex,cardIndex);
        }

//*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
        if ((openCards.length === 2) && (matches != 8)) {
            clearLastCards(lastIndex,cardIndex);
        }

//*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
        countMove();

//*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
        if (matches === 8) {
            youWon();
        }
        lastIndex = cardIndex;
    });
}

initGame();
mainLoop();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
