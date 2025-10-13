import batPNG from "./bat.png";
import friendPNG from "./friends.png";
//art credits to https://www.instagram.com/neccodealer
import landPNG from "./land.png";
//build made by a friend of mine (i don't have a social for them)
//import farmPNG from "./farm.png";
//import scissorPNG from "./scissors.png";
//credit a friend of mine. The scissors belong to them
import bloodPNG from "./blood.webp";
import iconPNG from "./vampire_au.png";

let counter = 0;
let cps = 0;
//let batGrowthRate = 0;
//let numberOfBats: number = 0;
//let friendGrowthRate = 0;
//let numberOfFriends: number = 0;
//let landGrowthRate = 0;
//let numberOfLand: number = 0;

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
    #itsME {
      width: 120px;
      height: 100px;
    }
/* div sizes */
    #top {
      width: 100vw;
      height: 20vh;
    }
    .half {
      width: 50vw;
    }
    .biggestQuarter {
      width: 68vw
    }
    .biggerQuarter {
      width: 33vw;
    }
    .smallerQuarter {
      width: 16vw;
    }

/* icon player clicks on */
    #increment {
      background: none;
      border: none;
    }
    .icon {
      width: 300px;
      height: 300px;
    }
    .icon:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
    .icon:active {
      transform: scale(0.9);
      cursor: pointer;
    }

/* shop items (display) */
    .flex {
      display: flex
    }
    #autoClickerInfo {
      display: none;
    }
    #extraHandsInfo {
      display: none;
    }
    #DesecrationInfo {
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
  </style>
`;

document.body.innerHTML = `
  <div id = "top" class = "flex">
    <div class = "smallerQuarter">
    <img src="${iconPNG}" id = "itsME"/>
    </div>
    <div class = "biggestQuarter">
      <h1>Blood Drive</h1>
      <h3>You're a vampire! Get more blood to become stronger!</h3>
    </div>
    <div class = "smallerQuarter">
      <p>🦇: <span id="batCounter">0</span>
       🧛: <span id="friendCounter">0</span>
       🏰: <span id="landCounter">0</span></p>
    </div>
  </div>
  <div class = "flex">
    <div class = "half">
      <p>Drops of Blood: <span id="counter">${counter}</span></br> 
      Drops per Second: <span id="cps">${cps}</span></br>...</p>
      <div id="increment"><img src="${bloodPNG}" class="icon" /></div>
    </div>
    <div id = "shopArea" class = "half">
      <div id="autoClickerInfo">
        <div class = "biggerQuarter"><p>You can buy Vampire Bat for
        <strong><span id="batPrice">10</span></strong> drops of blood!</br>
        Each bat gives you +1 drop of blood per second!</p></div>
        <div id="purchaseBat" class = "smallerQuarter"><img src="${batPNG}" class="buy" /></div>
      </div>
      <div id="extraHandsInfo">
        <div class = "biggerQuarter"><p>Invite a Vampire Friend for
        <strong><span id="friendPrice">100</span></strong> drops of blood!</br>
        Each friend gives you +10 drop of blood per second!</p></div>
        <div id="purchaseFriend" class = "smallerQuarter"><img src="${friendPNG}" class="buy" /></div>
      </div>
      <div id="DesecrationInfo">
        <div class = "biggerQuarter"><p>Desecrate sacred land for 
        <strong><span id="landPrice">250</span></strong> drops of blood!</br>
        Each piece on land gives you +100 drop of blood per second!</p></div>
        <div id="purchaseLand" class = "smallerQuarter"><img src="${landPNG}" class="buy" /></div>
      </div>
    </div>
  </div>
  `;

// Add shop clicking handlers
const counterElement = document.getElementById("counter")!; // total drops of blood
const cpsElement = document.getElementById("cps")!; // drops of blood per second

const clickMeButton = document.getElementById("increment")!; // main vampire icon (the one the user clicks on)
const autoInfoButton = document.getElementById("autoClickerInfo")!; // vampire bat section
const handsInfoButton = document.getElementById("extraHandsInfo")!; // friends shop section
const landInfoButton = document.getElementById("DesecrationInfo")!; // land shop section

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

/*
const autoBatButton = document.getElementById("purchaseBat")!; // buy button (needs to be changed for each item)
const batElement = document.getElementById("batCounter")!; // numberOfBats
const batPriceElement = document.getElementById("batPrice")!; // starts at 10

const autoFriendButton = document.getElementById("purchaseFriend")!; // buy button (needs to be changed for each item)
const friendElement = document.getElementById("friendCounter")!; // numberOfFriends
const friendPriceElement = document.getElementById("friendPrice")!; // starts at 100

const autoLandButton = document.getElementById("purchaseLand")!; // buy button (needs to be changed for each item)
const landElement = document.getElementById("landCounter")!; // numberOfFriends
const landPriceElement = document.getElementById("landPrice")!; // starts at 250

//where to buy the vampire bats
let batClickerPrice = 10;
autoBatButton.addEventListener("click", () => {
  if (counter >= Math.floor(batClickerPrice)) {
    counter -= Math.floor(batClickerPrice);
    batGrowthRate++;
    numberOfBats += 1;
    cps += 1;
    cpsElement.textContent = cps.toString();
    batElement.textContent = numberOfBats.toString();
    batClickerPrice += 1.15 * (10 * batGrowthRate);
    console.log(batClickerPrice);
    counterElement.textContent = counter.toString();
    batPriceElement.textContent = (Math.floor(batClickerPrice)).toString();
  }
});

//where to buy the vampire friends
let friendClickerPrice = 100;
autoFriendButton.addEventListener("click", () => {
  if (counter >= Math.floor(friendClickerPrice)) {
    counter -= Math.floor(friendClickerPrice);
    friendGrowthRate++;
    numberOfFriends += 1;
    cps += 10;
    cpsElement.textContent = cps.toString();
    friendElement.textContent = numberOfFriends.toString();
    friendClickerPrice += 1.15 * (100 * friendGrowthRate);
    console.log(friendClickerPrice);
    counterElement.textContent = counter.toString();
    friendPriceElement.textContent = (Math.floor(friendClickerPrice))
      .toString();
  }
});

//where to buy the vampire friends
let landClickerPrice = 250;
autoLandButton.addEventListener("click", () => {
  if (counter >= Math.floor(landClickerPrice)) {
    counter -= Math.floor(landClickerPrice);
    landGrowthRate++;
    numberOfLand += 1;
    cps += 100;
    cpsElement.textContent = cps.toString();
    landElement.textContent = numberOfLand.toString();
    landClickerPrice += 1.15 * (250 * landGrowthRate);
    console.log(landClickerPrice);
    counterElement.textContent = counter.toString();
    landPriceElement.textContent = (Math.floor(landClickerPrice))
      .toString();
  }
});
*/

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
    displayInfo: autoInfoButton,
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
    displayInfo: handsInfoButton,
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
    displayInfo: landInfoButton,
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
          : "land"
      ].currentPrice().toString();
    }
  });
});

//unlock the shop items
clickMeButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();

  // Unlock on click (redundant but safe)
  Object.values(shopItems).forEach((item) => {
    if (counter >= item.unlockThreshold) {
      item.displayInfo.style.display = "flex";
    }
  });
});

//auto clicker
let t0: number = performance.now();
console.log(t0);
function autoClicker() {
  const t1 = performance.now();
  if (t1 - t0 >= 1000) {
    // Passive income
    counter += shopItems.bat.growthRate * shopItems.bat.count;
    counter += shopItems.friend.growthRate * shopItems.friend.count;
    counter += shopItems.land.growthRate * shopItems.land.count;
    counterElement.textContent = counter.toString();
    t0 = t1;
  }

  // Unlock shops based on counter
  Object.values(shopItems).forEach((item) => {
    if (counter >= item.unlockThreshold) {
      item.displayInfo.style.display = "flex";
    }
  });

  requestAnimationFrame(autoClicker);
}

requestAnimationFrame(autoClicker);
