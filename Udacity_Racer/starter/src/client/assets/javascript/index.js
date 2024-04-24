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
      } else if (target.matches(".checkbox.racer")) {
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
    store.race_id = race.ID;

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
  const maxDuration = 20000; 
  const startTime = Date.now();
  const raceInterval = setInterval(async () => {
  const elapsedTime = Date.now() - startTime;
  let leftTime= Math.round((maxDuration-elapsedTime)/1000);
    
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
      return; 
    }

    if (res.status === "in-progress") {
      try{
      renderAt("#leaderBoard", raceProgress(res.positions,leftTime));}
      catch(error) { clearInterval(raceInterval);
        console.log(`Race is over! `)};
    } else {
      clearInterval(raceInterval);
      renderAt("#race", resultsView(res.positions));
    }
  }, 500);
}


async function runCountdown() {
  try {
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
  const checkboxes = document.querySelectorAll('.checkbox.racer');
  checkboxes.forEach(checkbox => {
    checkbox.classList.toggle('select', checkbox === target);
    checkbox.checked = checkbox === target;
  });

  store.player_id = parseInt(target.id);
    console.log("selected a racer", target.id);

}

document.querySelectorAll('.checkbox.racer').forEach(checkbox => {
  checkbox.addEventListener('change', (event) => {
    handleCheckboxChange(event.target);
  });
});


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
  <div>
		<li class="card podracer">
			<h4>Name: ${driver_name}</h4>
      <br/>
			<p>Top Speed: ${top_speed}</p>
			<p>Acceleration: ${acceleration}</p>
			<p>Handling: ${handling}</p>
		
    
    <div class="checkbox-wrapper-30">
    <span class="checkbox">
      <input type="checkbox" id="${id}" class="checkbox racer" />
      <svg>
        <use xlink:href="#checkbox-30" class="checkbox racer" ></use>
      </svg>
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
      <symbol id="checkbox-30" viewBox="0 0 22 22">
        <path fill="none" stroke="currentColor" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"/>
      </symbol>
    </svg>
  </div>
  </li>
    </div>
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
			<h4>${name}</h4>
		</li>
	`;
}

function renderCountdown(count) {
  return `
		<h2>Race Starts In...</h2>
		<p id="big-numbers">${count}</p>
	`;
}

function renderRaceStartView(track) {
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
        <p>Wait for the countdown!</p>

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
    <br/>
    <h3 class="title-leaderboard">Leaderbord</h3>
			${raceProgress(positions,0)}
			<button class="back_home"><a  href="/race">Start a new race</a>  </botton>  <br/>

		</main>
          <footer></footer>
	`;
}

function raceProgress(positions,leftTime) {
  const userPlayer = positions.find(
    (e) => parseInt(e.id) === parseInt(store.player_id)
  );
  userPlayer.driver_name += " (you)";

  positions = positions.sort((a, b) => (a.segment > b.segment ? -1 : 1));
  let count = 1;//at the start we are first
  let time= leftTime!=0?`<h3>${leftTime} s</h3>`:`<h5></h5>`;
  const results = positions.map((p) => {
    return `
			<tr>
				<td>
					<h3>${count++} - ${p.driver_name}</h3>
				</td>
			</tr>
		`;
  });

  return time +`
		<main>
      <table>
				${results}
        </table>
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
    }
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
      body: JSON.stringify(body)
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
      ...defaultFetchOpts()
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
      ...defaultFetchOpts()
    });

    return res;
  } catch (err) {
    console.error("Problem with acceleration:", err);
    throw err;
  }
}

