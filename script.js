let dealerSum = 0;
let yourSum = 0;

let dealerA = 0;
let yourA = 0;

var hidden;
var deck;
var canHit = true;

window.onload = function () {
  build();
  shuffle();
  start();
};

// function reset() {
//   document.getElementById("gameContainer").innerHTML = "<p>Game content</p>";
// }
// let refreshButton = document.getElementById("refresh");
// refreshButton.addEventListener("click", refresh);
function build() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  let types = ["C", "D", "H", "S"];

  deck = [];
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
  // console.log(deck);
}

// shffle functtion

function shuffle() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function start() {
  hidden = deck.pop();
  dealerSum += getvalue(hidden);
  dealerA += checkAce(hidden);
  // console.log(hidden);
  // // console.log(hidden[0]);
  // console.log(dealerSum);

  while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    console.log(card);
    cardImg.src = "./img/" + card + ".png";

    dealerSum += getvalue(card);
    dealerA += checkAce(card);
    document.getElementById("dealer-images").append(cardImg);
  }
  console.log(dealerSum);

  for (var i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    console.log(card);
    cardImg.src = "./img/" + card + ".png";

    yourSum += getvalue(card);
    yourA += checkAce(card);
    document.getElementById("Your-images").append(cardImg);
  }
  console.log(yourSum);
  hitButton = document.getElementById("Hit");
  hitButton.addEventListener("click", hit);
  stayButton = document.getElementById("stay");
  stayButton.addEventListener("click", stay);
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerA);
  yourSum = reduceAce(yourSum, yourA);

  canHit = false;
  document.getElementById("back").src = "./img/" + hidden + ".png";
  let message = "";
  if (yourSum > 21) {
    message = "You Lose";
  } else if (dealerSum > 21) {
    message = "You Win";
  } else if (yourSum == dealerSum) {
    message = "tie";
  } else if (yourSum > dealerSum) {
    message = "You Win!";
  } else if (yourSum < dealerSum) {
    message = "You Lose";
  }
  document.getElementById("dealer-result").innerText = dealerSum;
  document.getElementById("your-result").innerText = yourSum;
  document.getElementById("result").innerText = message;
}

function hit() {
  if (!canHit) {
    return;
  }

  let cardImg = document.createElement("img");
  let card = deck.pop();
  console.log(card);
  cardImg.src = "./img/" + card + ".png";

  yourSum += getvalue(card);
  yourA += checkAce(card);
  document.getElementById("Your-images").append(cardImg);

  if (reduceAce(yourSum, yourA) > 21) {
    canHit = false;
  }
}

function reduceAce(playerSum, playerAce) {
  while (playerSum > 21 && playerAce > 0) {
    playerSum -= 10;
    playerAce -= 1;
  }
  return playerSum;
}
function getvalue(card) {
  let data = card.split("-");
  // let data = card.split(",");
  let cardValue = data[0];

  if (isNaN(cardValue)) {
    if (cardValue == "A") {
      return 11;
    }
    return 10;
  }

  return parseInt(cardValue);
  // parseInt(cardValue);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}
