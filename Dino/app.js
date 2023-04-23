const gridHTML = document.getElementById("grid");
const formHTML = document.getElementById("dino-compare");
const btn = document.getElementById("btn");
const lenJSON = 7; //8 is length of dinos array in JSON file, but one of them is a pigeon

const getJSON = async () => {
  try {
    const response = await fetch("dino.json");
    const data = await response.json();
    return data.Dinos;
  } catch (error) {
    console.error("Error:", error);
  }
};
//console.log(getJSON());
// Create Dino Constructor
function Dino(data) {
  this.name = data.species;
  this.weight = data.weight;
  this.heiht = data.height;
  this.diet = data.diet;
}
// Create Dino Objects
const dinoArr = async (data) => {
  data = await data;
  data.splice(lenJSON); //we will not compare a pigeon
  const dinos = await data.map(function (item) {
    return new Dino(item);
  });
  //console.log(dinos.length);
  return dinos;
};
// Create Human Object
// Use IIFE to get human data from form

let human = (function () {
  let userName, height, weight, diet;

  btn.addEventListener("click", () => {
    userName = document.querySelector("#name").value;
    const feet = document.querySelector("#feet").value;
    const inches = document.querySelector("#inches").value;
    height = Math.round(feet * 12 + inches);
    weight = document.querySelector("#weight").value;
    diet = document.querySelector("#diet").value;
  });
  return {
    getUserName: function () {
      console.log(userName);
      return userName;
    },
    getHeight: function () {
      return height;
    },
    getWeight: function () {
      return weight;
    },
    getDiet: function () {
      return diet;
    },
  };
})();
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
//8 is length of dinos array in JSON file, but one of them is a pigeon
const randomDino = async (data = getJSON()) => {
  const randomNum = Math.floor(Math.random() * lenJSON);

  const dinos = await dinoArr(data);
  return dinos[randomNum];
};

const compareWeight = {
  weightH: 0,
  name: "",
  weightD: 0,
  randomfactW: async function () {
    this.weightH = parseInt(human.getWeight());
    this.name = await randomDino().then((dino) => dino.name);
    this.weightD = await randomDino().then((dino) => dino.weight);
    if (!isNaN(this.weightH)) {
      console.log(this.weightH);
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
      return `Small dinosaurs like compsognnathus weigh approx. like a human baby.`;
    }
  },
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

const compareHeight = {
  randomfactH: async function () {
    this.heightH = parseInt(human.getHeight());
    this.name = await randomDino().then((dino) => dino.name);
    this.heightD = await randomDino().then((dino) => dino.weight);
    if (this.heightH != 0 && this.heightH !== undefined) {
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
      return `Velciraptors are just 1 meter tall, shorter than most of the adult humans`;
    }
  },
};
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareDiet = {
  randomfactD: async function () {
    this.dietH = human.getDiet().toLowerCase();
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
// Generate Tiles for each Dino in Array
// On button click, prepare and display infographic

// Add tiles to DOM +
// Remove form from screen

const HTMLOutput = async (data) => {
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
  //console.log(arr);
  console.log(!arr.some((obj) => obj.species === "Pigeon"));
  if (!arr.some((obj) => obj.species === "Pigeon")) {
    arr.splice(randomIndex(), 1, data[7]);
  }

  const fact = await human.generateFact();
  arr.forEach((item, index) => {
    if (index === 4) {
      gridHTML.innerHTML += `
    <div class="grid-item">
    <h3>Human</h3>
<img src="./images/human.png">
<p>${fact}</p>
</div>
`;
    } else {
      gridHTML.innerHTML += `
    <div class="grid-item">
    <h3>${item.species}</h3>
<img src="./images/${item.species.toLowerCase()}.png">
<p>${item.fact}</p>
</div>
`;
    }
  });
};

function hideForm() {
  formHTML.style.display = "none";
  gridHTML.style.display = "flex";
  Object.assign(human, compareDiet, compareHeight, compareWeight, randomFact);

  HTMLOutput(getJSON());
}
btn.addEventListener("click", hideForm);

const icon = document.querySelectorAll(".icon");
icon.forEach((el) =>
  el.addEventListener("click", () => {
    location.reload();
  })
);
