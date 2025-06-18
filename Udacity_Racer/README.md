# Welcome to the One and only UdaciRacer Simulation Game

Hello! This is just a simple clicking game where I made the frontend. API (backend) in Go was made by Udacity and I didn't touch it at all. I fill out the code in frontend where was assignement by "TODO " comments.

How to run the game?
1. API run in separate terminal 
``` cd /api
    go run .
```    

2. Frontend

Then in a separate terminal run

``` cd /starter
    npm install
    npm start
```
You need to install node_modules only once.

## How to play the game

Start the race. There are different tracks by name and racer with different statistics. Choose the track number and racer number by clicking.

Then you wait for 3 seconds to start the game. You click on big round  button with title "Click me" and that's how you accelarate. This is only what you do: clicking on the big round button.
Faster you click, bigger the accelaration.

Other players accelaration are programmed in API which I didn't touch.

## What is interesting in the code

The game is steered by asynchronous (non-blocking) JS functions. Word `async` turn functions to promises and they are awaited to be resolved or rejected by the keyword `await`. JS will pause the sequence while staying in that function marked with `await` keyword  until promise is resolved or rejected.

```  
try {
    // const race = TODO - invoke the API call to create the race, then save the result
    
    const race = await createRace(store.player_id, store.track_id); 

    // TODO: render starting UI
    
    renderAt("#race", renderRaceStartView(race.Track));

    // Update the store with the race id
    
    store.race_id = race.ID-1;

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
```
 So first start runCountdown() and JS is waiting to finish it. Then starts startRace() and when that finish it will start runRace().

We play this game by async function handleAccelarate(). But we call it without the word `await`,
so it means other functions are running simulataneously and JS is not awaiting for it to be resolved/finnished.

It is a good practice to use await also when we fetch data from API servers:

```
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
```

All click events are steered with this global click event listener:

```
document.addEventListener("click", function (event) {
const { target } = event;
  
});
if (target.matches("#gas-peddle")) {
  handleAccelerate(target);
}
```




# Instructions of the task from Udacity

Here is a partially built-out game that races cars—your job is to complete it! Throughout the game logic, you will find _"TODO"_ comments that must be completed in order for the game to work. You are going to use the asynchronous skills you gained in the course to fill in the blanks in this game.

The game mechanics are this: the player selects a racer and track from dropdown menus and starts the game. Once the race begins, you accelerate a racer by clicking an acceleration button. The other racers are pre-programmed to accelerate and so the racers progress along the track and a leaderboard live-updates as players change position. The final view is a results page displaying the players' rankings.

The game has three main views:

1. The form to create a race

2. The race progress view (this includes the live-updating leaderboard and acceleration button)

3. The race results view

## Starter Code

We have supplied you with the following:

1. An API. The API is entirely written for you and you do not have to open the folder at all as a part of this project. This server is written in Go and is where the logic lives that controls the racers and tracks. All you have to do is run a terminal command to start the server and then send requests to it as you run the project.

2. HTML Views. The focus of this course is not UI development or styling practice, so we have already provided you with chunks of the UI, all you have to do is call them (render them to the view) at the right times. That said, if you want to add some color, images, and other snazziness to your project, go right ahead!

## Getting Started

In order to build this game, we need to run two things: the game engine API and the front end.

### Start the Server

To start the server, open a terminal and go to the api folder: `$ cd api`
Compile the Go code with: `$ go build`
Then start the server: `$ go run .`

You should see the server start and run on port 3001. After this point, you don't have to touch the API again!

### Start the Frontend

Go to /starter and run  `npm install && npm start`. Application will start at 3002 port(http://127.0.0.1:3002/) (http://localhost:3002)ss


## Project Requirements

This starter code base has directions for you in `src/client/assets/javascript/index.js`. There you will be directed to use certain asynchronous methods to achieve tasks. You will know you're making progress as you can play through more and more of the game.

### API Calls

To complete the project you must first create the calls to the API. These will all be fetch requests, and all information needed to create the request is provided in the instructions. The API calls are all at the bottom of the file: `src/client/assets/javascript/index.js`.

Below are a list of the API endpoints and the shape of the data they return. These are all of the endpoints you need to complete the game. Consult this information often as you complete the project:

[GET] `api/tracks`
List of all tracks

- id: number (1)
- name: string ("Track 1")
- segments: number[]([87,47,29,31,78,25,80,76,60,14....])

[GET] `api/cars`
List of all cars

- id: number (3)
- driver_name: string ("Racer 1")
- top_speed: number (500)
- acceleration: number (10)
- handling: number (10)

[GET] `api/races/${id}`
Information about a single race

- status: RaceStatus ("unstarted" | "in-progress" | "finished")
- positions object[] ([{ car: object, final_position: number (omitted if empty), speed: number, segment: number}])

[POST] `api/races`
Create a race

- id: number
- track: string
- player_id: number
- cars: Cars[] (array of cars in the race)
- results: Cars[] (array of cars in the position they finished, available if the race is finished)

[POST] `api/races/${id}/start`
Begin a race

- Returns nothing

[POST] `api/races/${id}/accelerate`
Accelerate a car

- Returns nothing

To complete the race logic, find all the TODO tags in index.js and read the instructions.

