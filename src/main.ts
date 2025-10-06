import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <h1>Adira's D1 Project</h1>
  <p>Boops: <span id="counter">${counter}</span></p>
  <button id="increment"><img src="${exampleIconUrl}" class="icon" /></button>
  `;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

let reanimate = 0;
function addCookie() {
  reanimate++;
  requestAnimationFrame(addCookie);
  if (reanimate >= 100) {
    counter++;
    counterElement.textContent = counter.toString();
    reanimate = 0;
  }
}

button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});

requestAnimationFrame(addCookie);
