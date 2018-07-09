/*
 * Create a list that holds all of your cards
 */
 var cards = ["fa fa-diamond" , "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
              "fa fa-anchor" , "fa fa-anchor" , "fa fa-bolt" , "fa fa-bolt",
              "fa fa-cube" , "fa fa-cube" , "fa fa-leaf", "fa fa-leaf",
              "fa fa-bicycle" , "fa fa-bicycle" , "fa fa-bomb" , "fa fa-bomb"
            ];
  const arr =  document.querySelectorAll(".card");
  let num_of_move = document.querySelector(".moves");
  const restart = document.querySelector(".restart");
  const stars = document.querySelector(".stars")
  let counter = 0;
  let show = '';
  let win = 0;
  var timer = 0;
  let second = 0;
  let interval = 0;

function clock(){
  document.querySelector('.timer').innerHTML = 0;
  second = 0;
  timer = function() {
  second++;
  document.querySelector('.timer').innerHTML = second;
  }
interval = setInterval(timer, 1000);
}


start();

function start(){
  clock();
  cards = shuffle(cards);
  for(let i = 0 ; i < cards.length; i++){
    const elm = arr[i].firstElementChild;
    elm.className = cards[i];
    arr[i].className ='card';
    arr[i].appendChild(elm);
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

restart.addEventListener('click', reset);

function reset(){
  num_of_move.innerHTML = 0;
  clearInterval(interval);
  start();
  add_stars();
  // stars
}

function add_stars(){
  let num_of_star = document.getElementsByClassName("fa fa-star").length;
  while(num_of_star < 3 ){
    const li = document.createElement('li');
    const i = document.createElement('i');
    i.className = 'fa fa-star';
    li.appendChild(i);
    stars.appendChild(li);
    num_of_star++;
  }
}

for(var i=0; i < cards.length; i++)
  arr[i].addEventListener('click', duplicated );



function duplicated(evt){
  if(evt.target.className !== "card open show" && evt.target.className !== "card match" && evt.target.parentNode.className === 'deck' )
      display_symbol(evt);
}

function display_symbol(symbol){
   if(counter < 1){
     show = symbol;
     show.target.className = "card open show";
     counter ++;
     }
     //for thh second press
     else{
      open(symbol, show);
     }
}

function open(symbol,first_card){
  symbol.target.className = "card open show";
  counter = 0;
  num_of_move.innerHTML++;
  if(num_of_move.innerHTML == 15 || num_of_move.innerHTML == 30){
    delete_star();
  }
  compare(first_card, symbol);
}

function delete_star(){
  stars.removeChild(stars.getElementsByTagName('li')[0]);
}

function compare(first, second){
  setTimeout(function show_second(){
    if(first.target.firstElementChild.className === second.target.firstElementChild.className ){
     first.target.className = "card match";
     second.target.className = "card match";
     win++;
     if(win === 8)
     you_win();
   }
  else{
    first.target.className = "card";
    second.target.className = "card";
  }
 }, 200);
}

function you_win(){
  clearInterval(interval);
  pop_up();
}

function pop_up() {
  let num_of_star = document.getElementsByClassName("fa fa-star").length;
    const r = confirm("Congratulations, You Won! \n  \n you took  " + second + "s to win \n number of Stars : "+ num_of_star +"\n Do you want to play again? press ok " );
    if (r == true) {
      reset();
    } else {
      console.log("Thank YOU ! ");
    }
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
