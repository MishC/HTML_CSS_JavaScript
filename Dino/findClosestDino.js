//Find Closest Dino to human (YOU). Function for entering modal window
async function findClosestDino(weightH, heightH, dietH, data = getJSON()) {
  let closestDino = null;
  let closestDifference = Infinity;
  let weightDiff;
  let heightDiff;

  const dinos = await dinoArr(data);
  dinos.forEach((dino) => {
    //=> Calculate the difference between the inputted dinosaur and the current dinosaur
    if (!isNaN(weightH)) {
      weightDiff = Math.abs(weightH - dino.weight) * 0.1;
    } else {
      weightDiff = 1;
    }
    if (!isNaN(heightH)) {
      heightDiff = Math.abs(heightH - dino.height) * 0.1;
    } else {
      heightDiff = 1;
    }

    let dietDiff = dietH !== dino.diet ? 10 : 0;
    let totalDiff = heightDiff + weightDiff + dietDiff;
    //=> If the current dinosaur is closer than the previous closest dinosaur, update the closest dinosaur
    if (totalDiff < closestDifference) {
      closestDino = dino;

      closestDifference = totalDiff;
    }
  });

  return closestDino;
}
