// imports
import "./style.css";
import slashSound from "./slash.mp3";
// images
import batImage from "./bat.png";
import bloodImage from "./blood.webp";
import farmImage from "./farm.png";
import friendImage from "./friends.png";
import landImage from "./land.png";
import scissorImage from "./scissors.png";
import iconImage from "./vampire_au.png";
// Asset credits in CREDITS.md

// pre-set changable variables
let counter = 0;
let cps = 0;

document.body.innerHTML = `
  <div id = "top" class = "flex">
    <div class = "smallerQuarter">
    <img src="${iconImage}" id = "vampireIcon"/>
    </div>
    <div class = "biggestQuarter">
      <h1>Blood Drive</h1>
      <h3>You're a vampire! Get more blood to become stronger!</h3>
    </div>
    <div class = "smallerQuarter">
      <p>🦇: <span id="batCounter">0</span>
       🧛: <span id="friendCounter">0</span></br>
       🏰: <span id="landCounter">0</span>
       🚜: <span id="farmCounter">0</span></br>
       ✂️: <span id="humanCounter">0</span></p>
    </div>
  </div>
  <div class = "flex">
    <div class = "half">
      <p>Drops of Blood: <span id="counter">${counter}</span></br> 
      Drops per Second: <span id="cps">${cps}</span></br>...</p>
      <div id="increment"><img src="${bloodImage}" class="icon" /></div>
    </div>
    <div id = "shopArea" class = "half">
      <div id="SpawnBatInfo" class="InfoBox locked">
        <div class = "biggerQuarter"><p>Spawn a Vampire Bat for
        <strong><span id="batPrice">10</span></strong> drops of blood!</br>
        Each bat gives you +1 drop of blood per second!</p></div>
        <div class = "smallerQuarter"><img src="${batImage}" id="purchaseBat" class="shop nobuy" /></div>
      </div>
      <div id="extraHandsInfo" class="InfoBox locked">
        <div class = "biggerQuarter"><p>Invite a Vampire Friend for
        <strong><span id="friendPrice">100</span></strong> drops of blood!</br>
        Each friend gives you +10 drop of blood per second!</p></div>
        <div class = "smallerQuarter"><img src="${friendImage}" id="purchaseFriend" class="shop nobuy" /></div>
      </div>
      <div id="DesecrationInfo" class="InfoBox locked">
        <div class = "biggerQuarter"><p>Desecrate sacred land for 
        <strong><span id="landPrice">250</span></strong> drops of blood!</br>
        Each piece on land gives you +100 drop of blood per second!</p></div>
        <div class = "smallerQuarter"><img src="${landImage}" id="purchaseLand" class="shop nobuy" /></div>
      </div>
      <div id="FarmInfo" class="InfoBox locked">
        <div class = "biggerQuarter"><p>Catch and farm animals for
        <strong><span id="farmPrice">1000</span></strong> drops of blood!</br>
        Each farm gives you +250 drops of blood per second!</p></div>
        <div class = "smallerQuarter"><img src="${farmImage}" id="purchaseFarm" class="shop nobuy" /></div>
      </div>
      <div id="HumanInfo" class="InfoBox locked">
        <div class = "biggerQuarter"><p>Acquired human sacrifices for
        <strong><span id="humanPrice">2500</span></strong> drops of blood!</br>
        Each human gives you +500 drops of blood per second!</p></div>
        <div class = "smallerQuarter"><img src="${scissorImage}" id="purchaseHuman" class="shop nobuy" /></div>
      </div>
    </div>
  </div>
  `;

// call element using pre-set variables
const counterElement = document.getElementById("counter")!; // total count
const cpsElement = document.getElementById("cps")!; // clicks per second

// different shops' elements
const clickMeButton = document.getElementById("increment")!; // main vampire icon (the one the user clicks on)
const batsInformation = document.getElementById("SpawnBatInfo")!; // vampire bat section
const handsInformation = document.getElementById("extraHandsInfo")!; // friends shop section
const landInformation = document.getElementById("DesecrationInfo")!; // land shop section
const farmInformation = document.getElementById("FarmInfo")!; // farm shop section
const humanInformation = document.getElementById("HumanInfo")!; // human shop section
// audio
const slashAudio = new Audio(slashSound);

///////////////////////
// SOURCES OF INCOME //
///////////////////////

// shops' interfaces
interface ShopItem {
  basePrice: number;
  growthRate: number;
  count: number;
  priceIncreaseFactor: number;
  element: HTMLElement;
  priceElement: HTMLElement;
  button: HTMLElement;
  unlockThreshold: number;
  displayInfo: HTMLElement;
  currentPrice: () => number;
}

const shopItems: Record<string, ShopItem> = {
  bat: {
    basePrice: 10,
    growthRate: 1,
    count: 0,
    priceIncreaseFactor: 2.1,
    element: document.getElementById("batCounter")!,
    priceElement: document.getElementById("batPrice")!,
    button: document.getElementById("purchaseBat")!,
    unlockThreshold: 10,
    displayInfo: batsInformation,
    currentPrice() {
      return Math.floor(
        this.basePrice * Math.pow(this.priceIncreaseFactor, this.count),
      );
    },
  },
  friend: {
    basePrice: 100,
    growthRate: 10,
    count: 0,
    priceIncreaseFactor: 2.1,
    element: document.getElementById("friendCounter")!,
    priceElement: document.getElementById("friendPrice")!,
    button: document.getElementById("purchaseFriend")!,
    unlockThreshold: 100,
    displayInfo: handsInformation,
    currentPrice() {
      return Math.floor(
        this.basePrice * Math.pow(this.priceIncreaseFactor, this.count),
      );
    },
  },
  land: {
    basePrice: 250,
    growthRate: 100,
    count: 0,
    priceIncreaseFactor: 2.1,
    element: document.getElementById("landCounter")!,
    priceElement: document.getElementById("landPrice")!,
    button: document.getElementById("purchaseLand")!,
    unlockThreshold: 250,
    displayInfo: landInformation,
    currentPrice() {
      return Math.floor(
        this.basePrice * Math.pow(this.priceIncreaseFactor, this.count),
      );
    },
  },
  farm: {
    basePrice: 1000,
    growthRate: 250,
    count: 0,
    priceIncreaseFactor: 2.1,
    element: document.getElementById("farmCounter")!,
    priceElement: document.getElementById("farmPrice")!,
    button: document.getElementById("purchaseFarm")!,
    unlockThreshold: 1000,
    displayInfo: farmInformation,
    currentPrice() {
      return Math.floor(
        this.basePrice * Math.pow(this.priceIncreaseFactor, this.count),
      );
    },
  },
  human: {
    basePrice: 2500,
    growthRate: 500,
    count: 0,
    priceIncreaseFactor: 2.1,
    element: document.getElementById("humanCounter")!,
    priceElement: document.getElementById("humanPrice")!,
    button: document.getElementById("purchaseHuman")!,
    unlockThreshold: 2500,
    displayInfo: humanInformation,
    currentPrice() {
      return Math.floor(
        this.basePrice * Math.pow(this.priceIncreaseFactor, this.count),
      );
    },
  },
};

Object.entries(shopItems).forEach(([id, item]) => {
  console.log(id);
  item.button.addEventListener("click", () => {
    const price = item.currentPrice();
    if (counter >= price) {
      counter -= price;
      item.count++;
      cps += item.growthRate;
      counterElement.textContent = counter.toString();
      cpsElement.textContent = cps.toString();
      item.element.textContent = item.count.toString();
      item.priceElement.textContent = shopItems[
        item === shopItems.bat
          ? "bat"
          : item === shopItems.friend
          ? "friend"
          : item === shopItems.land
          ? "land"
          : item === shopItems.farm
          ? "farm"
          : "human"
      ].currentPrice().toString();
    }
  });
});

// auto clicker
let t0: number = performance.now();
function autoClicker() {
  const t1 = performance.now();
  if (t1 - t0 >= 1000) {
    counter += shopItems.bat.growthRate * shopItems.bat.count;
    counter += shopItems.friend.growthRate * shopItems.friend.count;
    counter += shopItems.land.growthRate * shopItems.land.count;
    counter += shopItems.farm.growthRate * shopItems.farm.count;
    counter += shopItems.human.growthRate * shopItems.human.count;
    counterElement.textContent = counter.toString();
    t0 = t1;
  }
  shopUnlock();

  requestAnimationFrame(autoClicker);
}
requestAnimationFrame(autoClicker);

// manual click button
clickMeButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();

  shopUnlock();

  slashAudio.currentTime = 0;
  slashAudio.play();

  // create blood dripping effect
  const bloodSpill = document.createElement("p");
  bloodSpill.innerHTML = "🩸";
  bloodSpill.className = "dripping-blood";

  const img = clickMeButton.querySelector("img")!;
  const rect = img.getBoundingClientRect();

  // Calculate center position of the button
  const centerY = rect.top + (rect.bottom - rect.top) / 2;

  // Add some randomness to x-coordinate (between 25% and 75% of button width)
  const randomOffset = (rect.right - rect.left) * (0.25 + Math.random() * 0.5);
  const randomizedX = rect.left + randomOffset;

  // Position the blood drop at the center of the button with some horizontal randomness
  bloodSpill.style.left = randomizedX + "px";
  bloodSpill.style.top = centerY + "px";

  document.body.appendChild(bloodSpill);

  setTimeout(() => {
    bloodSpill.remove();
  }, 1000);
});

// animate the button
clickMeButton.animate(
  [
    { filter: "brightness(1) saturate(1)" },
    { filter: "brightness(1.2) saturate(1.4)" },
    { filter: "brightness(1) saturate(1)" },
  ],
  {
    duration: 1500,
    iterations: Infinity,
  },
);

// unlock the shop items
function shopUnlock() {
  Object.values(shopItems).forEach((item) => {
    if (counter >= item.currentPrice()) {
      item.displayInfo.className = "unlocked InfoBox";
      item.button.className = "shop buy";
    } else {
      item.displayInfo.className = "locked InfoBox";
      item.button.className = "shop nobuy";
    }
  });
}
