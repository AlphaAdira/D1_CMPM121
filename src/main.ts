import batPNG from "./bat.png";
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";

let counter = 9;
let growthRate = 0;
let numberOfBats: number = 0;

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
    #increment {
      background: none;
      border: none;
    }
    #top {
      width: 100vw;
      height: 25vh;
    }
    .half {
      width: 50vw;
    }
    .biggerQuarter {
      width: 33vw;
    }
    .smallerQuarter {
      width: 16vw;
    }
    .icon {
      width: 250px;
      height: 250px;
    }
    .icon:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
    .icon:active {
      transform: scale(0.9);
      cursor: pointer;
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
    .flex {
      display: flex
    }
  </style>
`;

document.body.innerHTML = `
  <div id = "top">
    <h1>Blood Drive</h1>
    <h3>You're a vampire! Get more blood to become stronger!</h3>
  </div>
  <div class = "flex">
    <div class = "half">
      <p>Drops of Blood: <span id="counter">${counter}</span></p>
      <div class="sparkle"></div>
      <div id="increment"><img src="${exampleIconUrl}" class="icon" /></div>
      <p>🦇: <span id="batCounter">${numberOfBats}</span></p>
    </div>
    <div id = "shopArea" class = "half">
      <div id="autoClickerInfo">
        <div class = "biggerQuarter"><p>You can buy Vampire Bat to help!!!</br>
        Each bat gives you +1 drop of blood per second!</br>
        Click this bat when you have <span id="batPrice">
        ${10 * growthRate + 10}</span> drops of blood!</p></div>
        <div id="purchase" class = "smallerQuarter"><img src="${batPNG}" class="buy" /></div>
      </div>
      <div id="extraHandsInfo">
        <div class = "biggerQuarter"><p>Why don't we invite some friends to help</br>
        Click this bat when you have <span id="friendPrice">
        ${20 * growthRate + 100}</span> drops of blood!</p></div>
        <div id="purchase" class = "smallerQuarter"><img src="${batPNG}" class="buy" /></div>
      </div>
    </div>
  </div>
  `;

// Add shop clicking handlers
const clickMeButton = document.getElementById("increment")!;
const autoInfoButton = document.getElementById("autoClickerInfo")!;
const handsInfoButton = document.getElementById("extraHandsInfo")!;
const autoClickButton = document.getElementById("purchase")!;
const counterElement = document.getElementById("counter")!;
const batElement = document.getElementById("batCounter")!;
const batPriceElement = document.getElementById("batPrice")!;

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

//where to buy the auto clicker aka vampire bats
let clickerPrice = 10 * growthRate + 10;
autoClickButton.addEventListener("click", () => {
  if (counter >= Math.floor(clickerPrice)) {
    counter -= Math.floor(clickerPrice);
    growthRate++;
    numberOfBats += 1;
    batElement.textContent = numberOfBats.toString();
    clickerPrice += 1.15 * (10 * growthRate);
    console.log(clickerPrice);
    counterElement.textContent = counter.toString();
    batPriceElement.textContent = (Math.floor(clickerPrice)).toString();
  }
});

//auto clicker aka vampire bats
let t0: number = performance.now();
console.log(t0);
let t1: number = -1;
function autoClicker() {
  t1 = performance.now();
  if (t1 - t0 >= 1000) {
    counter += growthRate;
    counterElement.textContent = counter.toString();
    t0 = t1;
  }
  if (counter >= 100) {
    handsInfoButton.style.display = "flex";
  }
  requestAnimationFrame(autoClicker);
}
requestAnimationFrame(autoClicker);
