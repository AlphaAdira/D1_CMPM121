import batPNG from "./bat.png";
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";

let counter = 0;
let batGrowthRate = 0;
let numberOfBats: number = 0;
let friendGrowthRate = 0;
let numberOfFriends: number = 0;

document.head.innerHTML = `
  <title>Adira's D1 Project</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      color: #6b0004ff;
      text-align: center;
      margin-top: 5rem;
      background: #737373ff;
      overflow: hidden;
    }
    p {
      font-size: 1.2rem;
    }
    #itsME {
      width: 100px;
      height: 100px;
    }
/* div sizes */
    #top {
      width: 100vw;
      height: 20vh;
    }
    .half {
      width: 50vw;
    }
    .biggestQuarter {
      width: 68vw
    }
    .biggerQuarter {
      width: 33vw;
    }
    .smallerQuarter {
      width: 16vw;
    }

/* icon player clicks on */
    #increment {
      background: none;
      border: none;
    }
    .icon {
      width: 300px;
      height: 300px;
    }
    .icon:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
    .icon:active {
      transform: scale(0.9);
      cursor: pointer;
    }

/* shop items (display) */
    .flex {
      display: flex
    }
    #autoClickerInfo {
      display: none;
    }
    #extraHandsInfo {
      display: none;
    }
    .buy {
      width: 100px;
      height: 100px;
    }
    .buy:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
    .buy:active {
      transform: scale(0.9);
      cursor: pointer;
    }
  </style>
`;

document.body.innerHTML = `
  <div id = "top" class = "flex">
    <div class = "smallerQuarter">
    <img src="${exampleIconUrl}" id = "itsME"/>
    </div>
    <div class = "biggestQuarter">
      <h1>Blood Drive</h1>
      <h3>You're a vampire! Get more blood to become stronger!</h3>
    </div>
    <div class = "smallerQuarter">
      <p>🦇: <span id="batCounter">${numberOfBats}</span>
       🧛: <span id="friendCounter">${numberOfFriends}</span></p>
    </div>
  </div>
  <div class = "flex">
    <div class = "half">
      <p>Drops of Blood: <span id="counter">${counter}</span></br>...</p>
      <div id="increment"><img src="${exampleIconUrl}" class="icon" /></div>
    </div>
    <div id = "shopArea" class = "half">
      <div id="autoClickerInfo">
        <div class = "biggerQuarter"><p>You can buy Vampire Bat for
        <strong><span id="batPrice">10</span></strong> drops of blood!</br>
        Each bat gives you +1 drop of blood per second!</p></div>
        <div id="purchaseBat" class = "smallerQuarter"><img src="${batPNG}" class="buy" /></div>
      </div>
      <div id="extraHandsInfo">
        <div class = "biggerQuarter"><p>Invite a Vampire Friend for
        <strong><span id="friendPrice">100</span></strong> drops of blood!</br>
        Each friend gives you +10 drop of blood per second!</p></div>
        <div id="purchaseFriend" class = "smallerQuarter"><img src="${exampleIconUrl}" class="buy" /></div>
      </div>
    </div>
  </div>
  `;

// Add shop clicking handlers
const clickMeButton = document.getElementById("increment")!; // main vampire icon (the one the user clicks on)
const autoInfoButton = document.getElementById("autoClickerInfo")!; // vampire bat section
const handsInfoButton = document.getElementById("extraHandsInfo")!; // friends shop section
//const landInfoButton = document.getElementById(DesecrationInfo)!; // land shop section

const counterElement = document.getElementById("counter")!; // total drops of blood

const autoBatButton = document.getElementById("purchaseBat")!; // buy button (needs to be changed for each item)
const batElement = document.getElementById("batCounter")!; // numberOfBats
const batPriceElement = document.getElementById("batPrice")!; // starts at 10

const autoFriendButton = document.getElementById("purchaseFriend")!; // buy button (needs to be changed for each item)
const friendElement = document.getElementById("friendCounter")!; // numberOfFriends
const friendPriceElement = document.getElementById("friendPrice")!; // starts at 100

//unlock the shop items
clickMeButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
  if (counter >= 10) {
    autoInfoButton.style.display = "flex";
  }
  if (counter >= 100) {
    handsInfoButton.style.display = "flex";
  }
});

//where to buy the vampire bats
let batClickerPrice = 10;
autoBatButton.addEventListener("click", () => {
  if (counter >= Math.floor(batClickerPrice)) {
    counter -= Math.floor(batClickerPrice);
    batGrowthRate++;
    numberOfBats += 1;
    batElement.textContent = numberOfBats.toString();
    batClickerPrice += 1.15 * (10 * batGrowthRate);
    console.log(batClickerPrice);
    counterElement.textContent = counter.toString();
    batPriceElement.textContent = (Math.floor(batClickerPrice)).toString();
  }
});

//where to buy the vampire friends
let friendClickerPrice = 100;
autoFriendButton.addEventListener("click", () => {
  if (counter >= Math.floor(friendClickerPrice)) {
    counter -= Math.floor(friendClickerPrice);
    friendGrowthRate++;
    numberOfFriends += 1;
    friendElement.textContent = numberOfFriends.toString();
    friendClickerPrice += 1.15 * (100 * friendGrowthRate);
    console.log(friendClickerPrice);
    counterElement.textContent = counter.toString();
    friendPriceElement.textContent = (Math.floor(friendClickerPrice))
      .toString();
  }
});

//auto clicker
let t0: number = performance.now();
console.log(t0);
let t1: number = -1;
function autoClicker() {
  t1 = performance.now();
  if (t1 - t0 >= 1000) {
    counter += batGrowthRate;
    counter += friendGrowthRate * 10;
    counterElement.textContent = counter.toString();
    t0 = t1;
  }
  if (counter >= 100) {
    handsInfoButton.style.display = "flex";
  }
  requestAnimationFrame(autoClicker);
}
requestAnimationFrame(autoClicker);
