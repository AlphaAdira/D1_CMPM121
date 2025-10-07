import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter = 0;
let growthRate = 1;

document.head.innerHTML = `
  <title>Adira's D1 Project</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      text-align: center;
      margin-top: 5rem;
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
  `;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
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
