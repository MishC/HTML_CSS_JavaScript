// PROVIDED CODE BELOW (LINES 1 - 80) DO NOT REMOVE

// The store will hold all information needed globally
let store = {
  track_id: undefined,
  player_id: undefined,
  race_id: undefined,
  race: undefined
  ,
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
        checkUserInput(store.player_id, store.track_id);
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

async function runRace(raceID) {
  const maxDuration = 20000; // 20 seconds in milliseconds
  const startTime = Date.now();
  const raceInterval = setInterval(async () => {
    const elapsedTime = Date.now() - startTime;

    
    let res;
    try {
      res = await getRace(raceID);
      if (elapsedTime >= maxDuration) {
      clearInterval(raceInterval);
      console.log('Maximum duration reached');
      renderAt("#race", resultsView(res.positions));


    }

    } catch (error) {
      clearInterval(raceInterval);
      console.log(`runRace error: ${error}`);
      renderAt("#race", "<h2>Error retrieving race results</h2>");
      return; // Stop further execution if an error occurs
    }

    if (res.status === "in-progress") {
      try{
      renderAt("#leaderBoard", raceProgress(res.positions));}
      catch(error) {      clearInterval(raceInterval);
        console.log(`Racer is over! `)};
    } else {
      clearInterval(raceInterval);
      renderAt("#race", resultsView(res.positions));
    }
  }, 500);
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
  document.querySelectorAll(".card.podracer.selected").forEach(option => {
    option.classList.remove("selected");
  });
  target.classList.add("selected");

  console.log("selected a pod", target.id);


  // TODO - save the selected racer to the store
  store.player_id = parseInt(target.id);
}

function handleSelectTrack(target) {
  document.querySelectorAll(".card.track.selected").forEach(option => {
    option.classList.remove("selected");
  });
target.classList.add("selected");
  console.log("selected a track", target.id);
  // remove class selected from all track options

  // TODO - save the selected track id to the store
  store.track_id = parseInt(target.id);
}
async function handleAccelerate() {
  try {
    console.log("accelerate button clicked");
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
  if (!driver_name){driver_name="Green racer";}
  if (!id){id="1";}

  return `
		<li class="card podracer" id="${id}">
			<h3 class=="card podracer">Name: ${driver_name}</h3>
			<p class=="card podracer">Top Speed: ${top_speed}</p>
			<p class=="card podracer">Acceleration: ${acceleration}</p>
			<p class=="card podracer">Handling: ${handling}</p>
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
			<h3 class="card track">${name}</h3>
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
        <br/>
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
    <h3 class="title-leaderboard">Leaderbord</h3>
			${raceProgress(positions)}
			<button class="back_home"><a  href="/race">Start a new race</a>  </botton>  <br/>

		</main>
          <footer></footer>
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
			<section id="ledearBoard">
      
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
  try {
    const res = await fetch(`${SERVER}/api/cars`);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching racers:", error);
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
    return await res.json();
  } catch (err) {
    console.error("Problem with createRace request:", err);
    throw err;
  }
}

async function getRace(id) {
  try {
    const res = await fetch(`${SERVER}/api/races/${id}`);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching race:", error);
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
    console.error("Problem with startRace request:", err);
    throw err;
  }
}

async function accelerate(id) {
  try {
    const res = await fetch(`${SERVER}/api/races/${id}/accelerate`, {
      method: "POST",
      ...defaultFetchOpts(),
    });

    return res;
  } catch (err) {
    console.error("Problem with acceleration:", err);
    throw err;
  }
}

