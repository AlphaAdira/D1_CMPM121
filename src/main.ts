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
      width: 100vw;
      height: 25vh;
    }
    .half {
      width: 50vw;
      height: 75vh;
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
    #autoInfoButton {
      height: 0vh;
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
    .sparkle {
    position: absolute;
    width: 10px;
    height: 10px;
    background: red;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    animation: sparkle-animation 2s ease-in-out infinite;
    pointer-events: none;
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
    <div id="autoClickerInfo">
      <p>You can buy Vampire Bat to help!!!</br>
      Just click below when you have <span id="price">${
  10 * growthRate + 10
}</span> drops of blood!</p>
      <div id="purchase"><img src="${batPNG}" class="buy" /></div>
    </div>
  </div>
  `;

// Add click handler
const clickMeButton = document.getElementById("increment")!;
const autoInfoButton = document.getElementById("autoClickerInfo")!;
const autoClickButton = document.getElementById("purchase")!;
const counterElement = document.getElementById("counter")!;
const batElement = document.getElementById("batCounter")!;
const priceElement = document.getElementById("price")!;

clickMeButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
  if (counter >= 10) {
    autoInfoButton.style.height = "30vh";
    autoInfoButton.classList.add("half");
  }
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
