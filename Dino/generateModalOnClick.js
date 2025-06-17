export async function generateModalOnClick(event) {
  const clickedElement = event.target;

  const targetName = clickedElement.src
    .split("/")
    .pop()
    .split(".")[0]
    .replace("%20", "");
  const dinos = await dinoArr(getJSON(), lenJSON + 1);

  const modalContent = document.querySelector(".modal-content");
  modal.style.display = "block";
  human.list();

  const index = dinos.findIndex(
    (dino) => dino.name.replace(/\s/g, "").toLowerCase() === targetName
  );
  const dino = dinos[index];
  targetName !== "human"
    ? (modalContent.innerHTML = `
            <div><span class="modal-close">&#10006;</span></h2>
            <div class="modal-item"><h2>${dino.name} </div>
              <img src="./images/${dino.name.toLowerCase()}.png" />
              <ul>
                <li>Height: ${dino.height} lbs</li>
                <li>Weight: ${dino.weight} inch</li>
                <li>Diet: ${dino.diet} </li>
              </ul>
            </div>
            <div class="modal-item">
            <h2>${human.name ? human.name : "Human"} </h2>
              <img src="./images/human.png" />
                ${human.defList()}
          </div>`)
    : (modalContent.innerHTML = ` 
                <h2><span class="modal-close">&#10006;</span></h2>

            <div class="modal-item">
            <h2>${human.name ? human.name : "Human"}</h2>
              <img src="./images/human.png" />
                ${human.defList()}
          </div>
        `);
  close();
}
