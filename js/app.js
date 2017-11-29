/*
 * Create a list that holds all of your cards
 */

let lastCard, lastIndex, cardStatus, matches, cardPick, moveCount;
let noclick = false;
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
    matches = 0;
    cardPick = 0;
    moveCount = 0;
    shuffle(cards);
    $('.deck').empty();
    $('.stars').empty();
    $('body > div > section > span').text('0');

    for (var index = 0; index < cards.length; index++){
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

initGame();
mainLoop();

function clearLastCards(last,curcard) {
    noclick = true;
    setTimeout('$(\"li:nth-child(' + last + ') > i\").parent().toggleClass(\"open show\");',2000);
    setTimeout('$(\"li:nth-child(' + curcard + ') > i\").parent().toggleClass(\"open show\");',2000);
    setTimeout("noclick = false;",2000);
}


function mainLoop() {

    $('.restart').click(function(){
        initGame();
        mainLoop();
    });

    $('body > div > ul > li').click(function(){
        console.log(cardPick);
        if (noclick) {return};
        cardIndex = parseInt( $(this).index() ) + 1;
        cardPick++;
        moveCount++;
        if ($('li:nth-child(' + cardIndex + ') > i').parent().hasClass('open')) {
            return;
        } else $('li:nth-child(' + cardIndex + ') > i').parent().toggleClass('open show');

        $('body > div > section > span').text(moveCount);
        //console.log(cardIndex + ' ' + cards[cardIndex - 1]);
        //console.log('Picked card ' + cardPick + ' of 2');

        if ((cardPick === 2) && (cards[cardIndex - 1] === lastCard) && (cardIndex != lastIndex)) {console.log('Match!');
            $('.stars').append('<li><i class="fa fa-star"></li>');
            $('li:nth-child(' + cardIndex + ') > i').parent().toggleClass('match');
            $('li:nth-child(' + lastIndex + ') > i').parent().toggleClass('match');
            lastCard = '';
            lastIndex = -1;
            cardPick = 0;
            matches++;
        }

        lastCard = cards[cardIndex - 1];
        //lastIndex = cardIndex;

        if ((cardPick === 2) && (matches != 8)) {
            cardPick = 0;
            clearLastCards(lastIndex,cardIndex);
        }

        if (matches === 8) {
            cardPick = 0;
            alert('You Won');
            initGame();
            mainLoop();
        }

        lastIndex = cardIndex;

    });
}


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
