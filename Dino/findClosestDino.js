//Find Closest Dino to human (YOU). Function for entering modal window
export async function findClosestDino(weightH, heightH, dietH, data, dinoArr) {
  let closestDino = null;
  let closestDifference = Infinity;

  const dinos = await dinoArr(data);
  dinos.forEach((dino) => {
    //=> Calculate the difference between the inputted dinosaur and the current dinosaur
    if (!isNaN(weightH)) {
      weightDiff = Math.abs(weightH - dino.weight);
    } else {
      weightDiff = 1;
    }
    if (!isNaN(heightH)) {
      heightDiff = Math.abs(heightH - dino.height);
    } else {
      heightDiff = 1;
    }

    let dietDiff = dietH !== dino.diet ? 1 : 0;
    let totalDiff = heightDiff + weightDiff + dietDiff;
    //=> If the current dinosaur is closer than the previous closest dinosaur, update the closest dinosaur
    if (totalDiff < closestDifference) {
      closestDino = dino;

      closestDifference = totalDiff;
    }
  });

  return closestDino;
}
