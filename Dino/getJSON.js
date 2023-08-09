const getJSON = async () => {
  try {
    const response = await fetch("dino.json");
    const data = await response.json();
    return data.Dinos;
  } catch (error) {
    console.error("Error:", error);
  }
};
