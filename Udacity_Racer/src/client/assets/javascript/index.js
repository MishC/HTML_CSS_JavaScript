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
      }

      // Podracer form field
      if (target.matches(".card.podracer")) {
        handleSelectPodRacer(target);
      }

      // Submit create race form
      if (target.matches("#submit-create-race")) {
        event.preventDefault();

        // start race
        handleCreateRace();
      }

      // Handle acceleration click
      if (target.matches("#gas-peddle")) {
        handleAccelerate();
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
  store.player_id = 1;
  // TODO - Get player_id and track_id from the store
  const player_id = store.player_id;
  const track_id = store.track_id;
  let race_id = store.race_id - 1;
  console.log(race_id);

  // const race = TODO - invoke the API call to create the race, then save the result

  const race = await createRace(player_id, race_id);
  console.log(race);
  // render starting UI
  renderAt("#race", renderRaceStartView(race.Track));
  store.race_id = race.ID - 1;
  race_id = store.race_id;
  console.log(race_id);
  //?
  await getRace(race_id).then((race) => {
    store = Object.assign(store, { race });
    console.log(store.race);
  });

  // TODO - call the async function runCountdown
  await runCountdown();
  // TODO - call the async function startRace
  await startRace(race_id, track_id);
  // TODO - call the async function runRace
}

async function runRace(raceID) {
  return new Promise((resolve) => {
    // TODO - use Javascript's built in setInterval method to get race info every 500ms
    const interval = setInterval(() => {}, 500);
    /* 
		TODO - if the race info status property is "in-progress", update the leaderboard by calling:

		renderAt('#leaderBoard', raceProgress(res.positions))
	*/
    /* 
		TODO - if the race info status property is "finished", run the following:

		clearInterval(raceInterval) // to stop the interval from repeating
		renderAt('#race', resultsView(res.positions)) // to render the results view
		resolve(res) // resolve the promise
	*/
  });
  // remember to add error handling for the Promise
}

async function runCountdown() {
  let timer = 3;
  const interval = setInterval(() => {
    document.getElementById("big-numbers").innerHTML = timer;

    timer--; // Decrement the countdown

    // Check if countdown reached zero
    if (timer < 0) {
      clearInterval(interval); // Stop the interval
      console.log("Countdown finished!");
    }
  }, 1000);
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
  store.race_id = target.id;
  //console.log(store.race_id);
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
  store.track_id = target.id;
}

function handleAccelerate(id) {
  console.log("accelerate button clicked");
  // TODO - Invoke the API call to accelerate
  accelerate(id);
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
		<header>
			<h1>Race: ${track.name}</h1>
		</header>
		<main id="two-columns">
			<section id="leaderBoard">
				${renderCountdown(3)}
			</section>

			<section id="accelerate">
				<h2>Directions</h2>
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
		<header>
			<h1>Race Results</h1>
		</header>
		<main>
			${raceProgress(positions)}
			<a href="/race">Start a new race</a>
		</main>
	`;
}

function raceProgress(positions) {
  let userPlayer = positions.find((e) => e.id === store.player_id);
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
			<h3>Leaderboard</h3>
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
    return console.log("Problem with getRace request::", err);
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
    return res.json();
  } catch (err) {
    return console.log("Problem with getRace request::", err);
  }
}
