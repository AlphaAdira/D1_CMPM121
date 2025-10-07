import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter = 0;
const t0 = performance.now();
//const t1 = performance.now();
console.log(t0);

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

let reanimate: number = 0;
function autoClicker() {
  reanimate++;
  requestAnimationFrame(autoClicker);
  if (reanimate >= 100) {
    counter++;
    counterElement.textContent = counter.toString();
    reanimate = 0;
  }
}
requestAnimationFrame(autoClicker);
