const generateModalOnClick = async (event) => {
  event.preventDefault;
  const clickedElement = event.target;
  const elementName = clickedElement.tagName;
  const elementId = clickedElement.id;
  console.log(clickedElement);
  const imagesGrid = document.querySelectorAll(".grid-item img");

  const modalGrid = document.createElement("div");
  modalGrid.classList.add("modal", "modal-tile");

  const dinos = await dinoArr(getJSON(), lenJSON + 1);
  const itemArrNames = getNameImg();

  imagesGrid.forEach((item, i) => {
    addEventListener("click", () => {
      grid.appendChild(modalGrid);
      const modalContent = document.querySelector(".modal-tile");
      const index = dinos.findIndex(
        (dino) =>
          dino.name.replace(/\s/g, "").toLowerCase() ===
          itemArrNames[i].replace(/\s/g, "").toLowerCase()
      );
      const dino = dinos[index];
      itemArrNames[i] !== "human"
        ? (modalContent.innerHTML += `
          <div class="modal-content">
            <h2>${dino.species}</h2>
            <div class="modal-item">
              <img src="./images/${dino.name.toLowerCase()}.png" />
              <ul>
                <li>Height: ${dino.height} lbs</li>
                <li>Weight: ${dino.weight} inch</li>
                <li>Diet: ${dino.diet} </li>
              </ul>
            </div></div>`)
        : (modalContent.innerHTML += `<div class="modal-content">
            <div class="modal-item">
              <img src="./images/human.png" />
                ${human.defList()}
            </div>
          </div>
        `);
    });
  });
};
