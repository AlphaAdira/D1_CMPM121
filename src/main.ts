import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Boops: <span id="counter">${counter}</span></p>
  <button id="increment"><img src="${exampleIconUrl}" class="icon" /></button>
  `;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

function addCookie() {
  counter++;
  counterElement.textContent = counter.toString();
}

button.addEventListener("click", () => {
  addCookie();
});

setInterval(addCookie, 1000);
