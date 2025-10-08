import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";

let counter = 0;
let growthRate = 0;

document.head.innerHTML = `
  <title>Adira's D1 Project</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      text-align: center;
      margin-top: 5rem;
      background: #deadaf;
    }
    .icon {
      width: 100px;
      height: 100px;
    }
    #increment {
      background: none;
      border: none;
    }
    .icon:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
    .icon:active {
      transform: scale(0.9);
      cursor: pointer;
    }
  </style>
`;

document.body.innerHTML = `
  <h1>Adira's D1 Project</h1>
  <p>Boops: <span id="counter">${counter}</span></p>
  <div id="increment"><img src="${exampleIconUrl}" class="icon" /></div>
  <div id="autoClickerInfo">
    <p>You can buy an AutoCLicker!!!\nJust click below when you have <span id="price">${
  10 * growthRate + 10
}</span> boops!</p>
    <div id="purchase"><img src="${exampleIconUrl}" class="icon" /></div>
  </div>
  `;

// Add click handler
const clickMeButton = document.getElementById("increment")!;
const autoClickButton = document.getElementById("purchase")!;
const counterElement = document.getElementById("counter")!;
const priceElement = document.getElementById("price")!;

clickMeButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});

autoClickButton.addEventListener("click", () => {
  if (counter >= 10 * growthRate + 10) {
    counter -= 10 * growthRate + 10;
    growthRate++;
    counterElement.textContent = counter.toString();
    priceElement.textContent = (10 * growthRate + 10).toString();
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
