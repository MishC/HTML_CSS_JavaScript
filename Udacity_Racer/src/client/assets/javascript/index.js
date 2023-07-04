// PROVIDED CODE BELOW (LINES 1 - 80) DO NOT REMOVE

// The store will hold all information needed globally
let store = {
  track_id: undefined,
  player_id: undefined,
  race_id: undefined,
  race: {},
};

// We need our javascript to wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  onPageLoad();
  setupClickHandlers();
});

async function onPageLoad() {
  try {
    getTracks().then((tracks) => {
      const html = renderTrackCards(tracks);
      renderAt("#tracks", html);
    });

    getRacers().then((racers) => {
      const html = renderRacerCars(racers);
      renderAt("#racers", html);
    });
  } catch (error) {
    console.log("Problem getting tracks and racers ::", error.message);
    console.error(error);
  }
}

function setupClickHandlers() {
  document.addEventListener(
    "click",
    function (event) {
      const { target } = event;
      // Race track form field
      if (target.matches(".card.track")) {
        handleSelectTrack(target);
      } else if (target.matches(".card.podracer")) {
        // Podracer form field
        handleSelectPodRacer(target);
      } else if (target.matches("#submit-create-race")) {
        // Submit create race form
        event.preventDefault();
        // start race
        handleCreateRace();
      } else if (target.matches("#gas-peddle")) {
        // Handle acceleration click
        handleAccelerate(target);
      }
    },
    false
  );
}

async function delay(ms) {
  try {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  } catch (error) {
    console.log("an error shouldn't be possible here");
    console.log(error);
  }
}
// ^ PROVIDED CODE ^ DO NOT REMOVE
//+++New function -chek user input

function checkUserInput(player_id, track_id) {
  const startButton = document.getElementById("submit-create-race");
  const paragraph = document.createElement("p");

  //event.preventDefault(); // Prevent form submission

  if (!player_id || !track_id) {
    let textNode = "Please choose the track and the racer!";
    const paragraph = document.createElement("p");
    paragraph.textContent = textNode;
    paragraph.style.color = "red";
    paragraph.style.fontSize = "20px";
    const startButton = document.getElementById("submit-create-race");
    startButton.parentNode.insertBefore(paragraph, startButton);
    return false;
  } else {
    console.log("ok");
    return true;
  }
}

//***End of the checking
// This async function controls the flow of the race, add the logic and error handling
async function handleCreateRace() {
  // ____________________________________________________________________________________________________________//
  // TODO - Get player_id and track_id from the store

  // const race = TODO - invoke the API call to create the race, then save the result

  // TODO - update the store with the race id
  // For the API to work properly, the race id should be race id - 1

  // The race has been created, now start the countdown
  // TODO - call the async function runCountdown

  // TODO - call the async function startRace

  // TODO - call the async function runRace
  // ____________________________________________________________________________________________________________//
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
  // TODO - Get player_id and track_id from the store

  try {
    // const race = TODO - invoke the API call to create the race, then save the result
    const race = await createRace(store.player_id, store.track_id); // Invoke the API call to create the race, then save the result

    // TODO: render starting UI
    renderAt("#race", renderRaceStartView(race.Track));

    // Update the store with the race id
    store.race_id = race.ID - 1;

    await getRace(store.race_id).then((race) => {
      store = Object.assign(store, { race });
    });

    // TODO - call the async function runCountdown
    await runCountdown();
    // TODO - call the async function startRace
    await startRace(store.race_id);
    // TODO - call the async function runRace
    await runRace(store.race_id);
  } catch (error) {
    console.log(`handleCreateRace Error: ${error}`);
  }
}

function runRace(raceID) {
  try {
    return new Promise((resolve) => {
      // use Javascript's built in setInterval method to get race info every 500ms
      const raceInterval = setInterval(async () => {
        try {
          let res = await getRace(raceID);

          if (res.status === "in-progress") {
            // If the race info status property is "in-progress", update the leaderboard by calling:
            renderAt("#leaderBoard", raceProgress(res.positions));
          } else {
            // If the race info status property is "finished", run the following:
            clearInterval(raceInterval); // to stop the interval from repeating
            renderAt("#race", resultsView(res.positions)); // to render the results view
            resolve(res); // resolve the promise
          }
        } catch (error) {
          console.log(`runRace error: ${error}`);
        }
      }, 500);
    });
  } catch (error) {
    // remember to add error handling for the Promise
    console.log(`runRace error: ${error}`);
  }
}

async function runCountdown() {
  try {
    // wait for the DOM to load
    await delay(1000);
    let timer = 3;

    return new Promise((resolve) => {
      // TODO - use Javascript's built in setInterval method to count down once per second
      let stopInterval = setInterval(() => {
        // run this DOM manipulation to decrement the countdown for the user
        document.getElementById("big-numbers").innerHTML = --timer;

        // TODO - if the countdown is done, clear the interval, resolve the promise, and return
        if (timer <= 0) {
          console.log(`Timer: ${timer}`);
          clearInterval(stopInterval);
          resolve();
        }
      }, 1000);
    });
  } catch (error) {
    console.log(`runCountdown error: ${error}`);
  }
}

function handleSelectPodRacer(target) {
  console.log("selected a pod", target.id);

  // remove class selected from all racer options
  const selected = document.querySelector("#racers .selected");
  if (selected) {
    selected.classList.remove("selected");
  }

  // add class selected to current target
  target.classList.add("selected");

  // TODO - save the selected racer to the store
  store.player_id = parseInt(target.id);
}

function handleSelectTrack(target) {
  console.log("selected a track", target.id);

  // remove class selected from all track options
  const selected = document.querySelector("#tracks .selected");
  if (selected) {
    selected.classList.remove("selected");
  }

  // add class selected to current target
  target.classList.add("selected");

  // TODO - save the selected track id to the store
  store.track_id = parseInt(target.id);
}

function handleAccelerate() {
  try {
    console.log("accelerate button clicked");
    // Invoke the API call to accelerate
    document
      .getElementById("gas-peddle")
      .addEventListener("click", accelerate(store.race_id));
  } catch (error) {
    console.log(`handleAccelerate error: ${error}`);
  }
}

// HTML VIEWS ------------------------------------------------
// Provided code - do not remove

function renderRacerCars(racers) {
  if (!racers.length) {
    return `
			<h4>Loading Racers...</4>
		`;
  }

  const results = racers.map(renderRacerCard).join("");

  return `
		<ul id="racers">
			${results}
		</ul>
	`;
}

function renderRacerCard(racer) {
  const { id, driver_name, top_speed, acceleration, handling } = racer;

  return `
		<li class="card podracer" id="${id}">
			<h3>Name: ${driver_name}</h3>
			<p>Top Speed: ${top_speed}</p>
			<p>Acceleration: ${acceleration}</p>
			<p>Handling: ${handling}</p>
		</li>
	`;
}

function renderTrackCards(tracks) {
  if (!tracks.length) {
    return `
			<h4>Loading Tracks...</4>
		`;
  }

  const results = tracks.map(renderTrackCard).join("");

  return `
		<ul id="tracks">
			${results}
		</ul>
	`;
}

function renderTrackCard(track) {
  const { id, name } = track;

  return `
		<li id="${id}" class="card track">
			<h3>${name}</h3>
		</li>
	`;
}

function renderCountdown(count) {
  return `
		<h2>Race Starts In...</h2>
		<p id="big-numbers">${count}</p>
	`;
}

function renderRaceStartView(track, racers) {
  return `
		<header id="progress">
			<h1>Race: ${track.name}</h1>
		</header>
		<main id="two-columns">
			<section id="leaderBoard">
				${renderCountdown(3)}
			</section>

			<section id="accelerate">
				<h3>Directions</h3>
				<p>Click the button as fast as you can to make your racer go faster!</p>
				<button id="gas-peddle">Click Me To Win!</button>
			</section>
		</main>
		<footer></footer>
	`;
}

function resultsView(positions) {
  positions.sort((a, b) => (a.final_position > b.final_position ? 1 : -1));

  return `
		<header id="results">
			<h1>Race Results</h1>
		</header>
		<main>
			${raceProgress(positions)}
			<a href="/race">Start a new race</a>
      <footer></footer>
		</main>
	`;
}

function raceProgress(positions) {
  const userPlayer = positions.find(
    (e) => parseInt(e.id) === parseInt(store.player_id)
  );
  userPlayer.driver_name += " (you)";

  positions = positions.sort((a, b) => (a.segment > b.segment ? -1 : 1));
  let count = 1;

  const results = positions.map((p) => {
    return `
			<tr>
				<td>
					<h3>${count++} - ${p.driver_name}</h3>
				</td>
			</tr>
		`;
  });

  return `
		<main>
    <br/>
			<h3 id="title-leaderboard">Leaderboard</h3>
			<section id="leaderBoard">
				${results}
			</section>
		</main>
	`;
}

function renderAt(element, html) {
  const node = document.querySelector(element);

  node.innerHTML = html;
}

// ^ Provided code ^ do not remove

// API CALLS ------------------------------------------------

const SERVER = "http://localhost:3001";

function defaultFetchOpts() {
  return {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": SERVER,
    },
  };
}

// TODO - Make a fetch call (with error handling!) to each of the following API endpoints

// TODO - Make a fetch call (with error handling!) to each of the following API endpoints

async function getTracks() {
  // GET request to `${SERVER}/api/tracks`
  try {
    const res = await fetch(`${SERVER}/api/tracks`);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error; // rethrow the error to propagate it to the caller
  }
}

async function getRacers() {
  // GET request to `${SERVER}/api/cars`
  try {
    const res = await fetch(`${SERVER}/api/cars`);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error; // rethrow the error to propagate it to the caller
  }
}

async function createRace(player_id, track_id) {
  player_id = parseInt(player_id);
  track_id = parseInt(track_id);
  const body = { player_id, track_id };

  try {
    const res = await fetch(`${SERVER}/api/races`, {
      method: "POST",
      ...defaultFetchOpts(),
      dataType: "jsonp",
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (err) {
    return console.log("Problem with createRace request::", err);
  }
}

async function getRace(id) {
  // GET request to `${SERVER}/api/races/${id}`
  try {
    const res = await fetch(`${SERVER}/api/races/${id}`);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error; // rethrow the error to propagate it to the caller
  }
}

async function startRace(id) {
  try {
    const res = await fetch(`${SERVER}/api/races/${id}/start`, {
      method: "POST",
      ...defaultFetchOpts(),
    });
    return res;
  } catch (err) {
    return console.log("Problem with startRace request::", err);
  }
}

async function accelerate(id) {
  // POST request to `${SERVER}/api/races/${id}/accelerate`
  // options parameter provided as defaultFetchOpts
  // no body or datatype needed for this request
  try {
    const res = await fetch(`${SERVER}/api/races/${id}/accelerate`, {
      method: "POST",
      ...defaultFetchOpts(),
    });

    return res;
  } catch (err) {
    return console.log("Problem with acceleration::", err);
  }
}
