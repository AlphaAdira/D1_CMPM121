import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <p>Example image asset:</p>
  <p>Boops: <span id="counter">${counter}</span></p>
  <button id="increment"><img src="${exampleIconUrl}" class="icon" /></button>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});
