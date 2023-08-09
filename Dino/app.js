const grid = document.getElementById("grid");

const form = document.getElementById("dino-compare");
const btn = document.getElementById("btn");
const modal = document.getElementById("dinoModal");
const modalContent = document.getElementsByClassName("modal-content")[0];
const factDino = document.getElementsByClassName("grid-element");

const lenJSON = 7; //8 is length of dinos array in JSON file, but one of them is a pigeon
//GET DATA

// Create Dino Constructor
function Dino(data) {
  this.name = data.species;
  this.weight = data.weight;
  this.height = data.height;
  this.diet = data.diet;
}

// Create Dino Objects
const dinoArr = async (data, len = lenJSON) => {
  data = await data;
  data.splice(len); //we will not compare a pigeon
  const dinos = await data.map(function (item) {
    return new Dino(item);
  });
  return dinos;
};
// Create Human Object
function Human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

// Use IIFE to get human data from form

let human = new Human();

(function () {
  let userName, height, weight, diet;

  btn.addEventListener("click", () => {
    userName = document.querySelector("#name").value;
    const feet = document.querySelector("#feet").value;
    const inches = document.querySelector("#inches").value;
    height = Math.round(feet * 12 + inches);
    weight = document.querySelector("#weight").value;
    diet = document.querySelector("#diet").value;
    human.update(userName, height, weight, diet);
  });
})();
//Human prototype function update
Human.prototype.update = function (name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
};
Human.prototype.list = function (height, weight, diet) {
  return `<ul style="list-style:none;">
        <li>${this.weight} lbs</li>
        <li>${this.height} inch</li>
        <li>${this.diet} </li>
      </ul>`;
};
Human.prototype.check = function (x) {
  if (this[x] !== "") {
    const newDiv = document.createElement("div");
    form.parentNode.insertBefore(newDiv, form.nextSibling);
    newDiv.innerHTML += `Please fill the form.`;
  }
  return null;
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
//8 is length of dinos array in JSON file, but one of them is a pigeon
const randomDino = async (data = getJSON()) => {
  const randomNum = Math.floor(Math.random() * lenJSON);

  const dinos = await dinoArr(data);

  return dinos[randomNum];
};

const compareWeight = {
  randomfactW: async function () {
    this.weightH = human.weight;
    this.name = await randomDino().then((dino) => dino.name);
    this.weightD = await randomDino().then((dino) => dino.weight);
    if (
      !isNaN(this.weightH) &&
      this.weightH !== 0 &&
      this.weight != undefined
    ) {
      if (this.weightD > this.weightH) {
        return `The ${this.name} is ${Math.round(
          this.weightD / this.weightH
        )} times heavier than you!`;
      } else if (Math.round(this.weightD) === Math.round(this.weightH)) {
        return `You and ${this.name} weigh approx. the same! `;
      } else if (this.weightD < this.weightH) {
        return `You are heavier than a dinosaur ${this.name}!`;
      }
    } else {
      return `Smallest dinosaurs had weight like a human baby.`;
    }
  },
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

const compareHeight = {
  randomfactH: async function () {
    this.heightH = parseInt(human.height);
    this.name = await randomDino().then((dino) => dino.name);
    this.heightD = await randomDino().then((dino) => dino.weight);
    if (
      !isNaN(this.heightH) &&
      this.heightH != 0 &&
      this.heightH !== undefined
    ) {
      if (this.heightD > this.heightH) {
        return `The ${this.name} is ${Math.round(
          this.heightD / this.heightH
        )} times taller than you!`;
      } else if (Math.round(this.heightD) === Math.round(this.heightH)) {
        return `Dino ${this.name} is tall as you `;
      } else if (this.heightD < this.heightH) {
        return `You are taller than a dinosaur ${this.name}!`;
      }
    } else {
      return `Some dinosaurs are just 1 meter tall, shorter than most of the adult humans`;
    }
  },
};
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareDiet = {
  randomfactD: async function () {
    this.dietH = human.diet.toLowerCase();
    this.name = await randomDino().then((dino) => dino.name);
    this.dietD = await randomDino().then((dino) => dino.diet);
    if (this.dietD === this.dietH) {
      if (this.dietD === "herbavor") {
        return `You and ${this.name}, you both eat grass!`;
      }
      if (this.dietD === "carnivor") {
        return `You and ${this.name}, you both love fresh meat!`;
      }
      if (this.dietD === "omnivor") {
        `You and ${this.name}, you eat everything!`;
      }
    } else {
      return `Most of the human are omnivores and most of the dinosaurs were herbivores`;
    }
  },
};
//Random fact being displayed on human tile
const randomFact = {
  generateFact: async function () {
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        return await compareWeight.randomfactW();
      case 1:
        return await compareHeight.randomfactH();
      case 2:
        return await compareDiet.randomfactD();
      default:
        return `Dinosaurs were dominant and spread all around the world as humans do.`;
    }
  },
};

//Onclick method for each tile
//This should be onclick Modal Window for each tile
const close = () => {
  document.querySelector(".modal-close").onclick = function () {
    modal.style.display = "none";
  };
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

// Generate Tiles for each Dino in Array
// On button click, prepare and display infographic
// Add tiles to DOM +
// Remove form from screen

const GridOutput = async (data) => {
  const arr = await data;
  arr.splice(8);
  const randomIndex = (len = 9) => {
    let num = Math.floor(Math.random() * len);
    if (num !== 4) {
      return num;
    } else {
      return randomIndex(len);
    }
  };

  arr.sort(() => Math.random() - 0.5);

  arr.splice(4, 0, "human");
  if (!arr.some((obj) => obj.species === "Pigeon")) {
    arr.splice(randomIndex(), 1, data[7]);
  }

  //Generate human fact;
  const fact = await human.generateFact();
  //Generates tiles for the array of images (JSON)
  arr.forEach((item, index) => {
    if (index === 4) {
      grid.innerHTML += `
    <div class="grid-item">
    <h3>${human.name ? human.name : "Human"}</h3>
<img src="./images/human.png" name=${index} >
<p class="random-fact" name="human" style="background:none;"></p>
</div>
`;
    } else {
      grid.innerHTML += `
    <div class="grid-item">
    <h3>${item.species}</h3>
<img src="./images/${item.species.toLowerCase()}.png" name=${index}  />
<p class="random-fact" name=${item.species.replace(/\s/g, "")}> ${
        item.fact
      } </p>
`;
    }
  });
};
async function getfactsP() {
  return document.getElementsByClassName("random-fact");
}

//Modal Window with findClosestDino at the beginning
const ModalOutput = async (human) => {
  const dino = await findClosestDino(
    parseInt(human.weight),
    parseInt(human.height),
    human.diet.toLowerCase()
  ).then((dino) => dino);

  human.weight === "" ? (human.weight = 0) : human.weight;
  modalContent.innerHTML += `
                  <h2>Your Closest Match: <span class="modal-close">&times;</span></h2>
    <div class="modal-item"> <h2>You</h2><img src="./images/human.png" />
${human.list()}
    </div>
    <div class="modal-item"><h2>${dino.name}</h2>
    <img src="./images/${dino.name}.png" /
    ><ul><li>${dino.height} lbs</li>
    <li>${dino.weight} inch</li>
        <li>${dino.diet} </li></ul>
</div>`;
  close();
};
//This connects all functions when onclicked
async function hideForm() {
  form.style.display = "none";
  grid.style.display = "flex";
  modal.style.display = "block";
  document.querySelectorAll(".icon")[1].style.display = "inline-block";

  Object.assign(human, compareDiet, compareHeight, compareWeight, randomFact);
  await GridOutput(getJSON());
  await ModalOutput(human);
  await factaOnHover();
  const images = document.querySelectorAll(".grid-item>img");
  images.forEach((item) =>
    item.addEventListener("click", generateModalOnClick)
  );
}

btn.addEventListener("click", hideForm);

const icon = document.querySelectorAll(".icon");
icon.forEach((el) =>
  el.addEventListener("click", () => {
    location.reload();
  })
);
