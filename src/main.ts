import batPNG from "./bat.png";
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";

let counter = 0;
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
    }
    #increment {
      background: none;
      border: none;
    }
    #top {
      background: #000000;
      width: 100vw;
      height: 15vh;
    }
    .half {
      background: #ffffff;
      width: 50vw;
      height: 85vh;
    }
    .icon {
      width: 100px;
      height: 100px;
    }
    .icon:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
    .icon:active {
      transform: scale(0.9);
      cursor: pointer;
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
  <div id = "top">
    <h1>Blood Drive</h1>
    <h3>You're a vampire! Get more blood to become stronger!</h3>
  </div>
  <div class = "half">
    <p>Drops of Blood: <span id="counter">${counter}</span></p>
    <div id="increment"><img src="${exampleIconUrl}" class="icon" /></div>
  </div>
  <div id="autoClickerInfo">
    <p>🦇: <span id="batCounter">${numberOfBats}</span></p>
    <p>You can buy Vampire Bat to help!!!</p>
    <p>Just click below when you have <span id="price">${
  10 * growthRate + 10
}</span> drops of blood!</p>
    <div id="purchase"><img src="${batPNG}" class="buy" /></div>
  </div>
  `;

// Add click handler
const clickMeButton = document.getElementById("increment")!;
const autoClickButton = document.getElementById("purchase")!;
const counterElement = document.getElementById("counter")!;
const batElement = document.getElementById("batCounter")!;
const priceElement = document.getElementById("price")!;

clickMeButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});

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
    priceElement.textContent = (Math.floor(clickerPrice)).toString();
  }
});

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
  requestAnimationFrame(autoClicker);
}
requestAnimationFrame(autoClicker);
