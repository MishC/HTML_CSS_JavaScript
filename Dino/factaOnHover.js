async function factaOnHover(data = getJSON()) {
  const factsP = await getfactsP();

  const factsPArr = Array.from(factsP);
  const factsPVal = Array.from(factsP, (fact) => fact.outerText);
  const dinos = await dinoArr(data, lenJSON + 1);
  const dinosArr = dinos.map((item) => item.name);
  dinos.name = dinosArr;

  const dinoNames = Array.from(factsP, (fact) => fact.getAttribute("name"));
  factsPArr.forEach((item, i) => {
    item.addEventListener("mouseover", () => {
      const ul = document.createElement("ul");
      ul.style.listStyle = "none";

      const index = dinos.findIndex(
        (dino) => dino.name.replace(/\s/g, "") === dinoNames[i]
      );
      if (index !== -1) {
        const dino = dinos[index];

        const li1 = document.createElement("li");
        li1.textContent = `Weight:${dino.weight} lbs`;
        ul.appendChild(li1);

        const li2 = document.createElement("li");
        li2.textContent = `Height: ${dino.height} inch`;
        ul.appendChild(li2);

        const li3 = document.createElement("li");
        li3.textContent = `Diet: ${dino.diet}`;
        ul.appendChild(li3);

        item.innerHTML = "";
        item.appendChild(ul);
      }
      if (dinoNames[i] === "human") {
        item.innerHTML = `${human.list()}`;
        item.style.background = "rgba(000, 000, 000, 0.3)";
      }
    });
  });

  factsPArr.forEach((item, i) => {
    item.addEventListener("mouseout", () => {
      item.innerHTML = `${factsPVal[i]}`;
      if (dinoNames[i] === "human") {
        item.style.background = "none";
      }
    });
  });
}
