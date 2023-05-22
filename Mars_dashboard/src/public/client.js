const root = document.getElementById("root");

const store = {
  user: { name: "Student" },
  apod: {},
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  info: Immutable.Map({
    name: "",
    status: "",
    launch_date: "",
    landing_date: "",
  }),
};
let maps = [];
//const mapsI = Immutable.List([]);

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `  <h1>Welcome, ${name}!</h1>
        `;
  }
  return `
        <h1>Hello!</h1>
    `;
};

function currentDate(now) {
  let day = now.getDay(); //Day of the week, number 0-6
  let month = now.getMonth(); //current month, number of 0-11
  let hours = now.getHours(); //hour, number of 0-24
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes(); //hour, number of 0-59
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayToday = now.getUTCDate();
  let dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let weekDay = dayWeek[day];
  let currentMonth = months[month];
  let time = hours + ":" + minutes;
  let suff = "";
  if (dayToday === 1) {
    suff = "st";
  } else if (dayToday === 2) {
    suff = "nd";
  } else if (dayToday === 3) {
    suff = "rd";
  } else {
    suff = "th";
  }
  return `${weekDay} ${dayToday}${suff} of ${currentMonth}`;
}

function makeCounter() {
  let count = 0;
  return function () {
    return count++;
  };
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => {
      updateStore(state, { apod });
    });
  return apod;
};

const getRoverInfo = (state, i) => {
  const { rovers } = state;
  fetch(`http://localhost:3000/manifest?rover=${rovers[i]}`)
    .then((res) => res.json())
    .then((info) => {
      updateStore(state, { info });
    });
};

// -------------------------------------------------------
//console.log(photodate.getDate(), today.getDate());
//console.log(photodate.getDate() === today.getDate());

// Example of a pure function that renders infomation requested from the backend

const ImageOfTheDay = (state, apod) => {
  // If image does not already exist, or it is not from today -- request it again
  let counter = makeCounter();
  if (!apod.image) {
    counter();
    while (counter() < 2) {
      getImageOfTheDay(state);
      if (counter() >= 2) {
        break;
      }
    }
  } else {
    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
      return `                <div class="apod">
            <p>See today's featured video <a href="${apod.image.url}">here</a></p>
            <p>${apod.image.title}</p>
            <p>${apod.image.explanation}</p>
            </div>
        `;
    } else {
      return `<div class="apod">
        <figure> <h2 >Image of the day: ${apod.image.title}</h2>

            <img src="${apod.image.url}" /> <p>${apod.image.explanation}</p>
            </figure>
           </div>
        `;
    }
  }
};
const RoverInfo = (state, i) => {
  const { info, rovers } = state;
  if (!info.info) {
    getRoverInfo(state, i);
  } else {
    const template = Immutable.Map({
      name: info.info.photo_manifest.name,
      status: info.info.photo_manifest.status,
      launch_date: info.info.photo_manifest.launch_date,
      landing_date: info.info.photo_manifest.landing_date,
      last_photos: info.info.photo_manifest.max_date,
    });
    return template;
  }
};

let iList = Immutable.List();

const renderHTMLRover = (state) => {
  const { rovers } = state;
  const sizeRovers = Array.from(Array(rovers.length).keys());

  sizeRovers.forEach((i) => {
    const template = RoverInfo(state, i);

    if (template && rovers[i] === template.get("name")) {
      // console.log(template);
      iList = iList.push(template);
    }
  });

  return iList; // Return the updated iList after iterating over sizeRovers
};

const renderHTML = (state) => {
  if (iList.size < state.rovers.length) {
    iList = renderHTMLRover(state);
  }

  const html = iList.map((item) => {
    return `<div class="rovers">
              <ul>
                <li>Name: ${item.get("name")}</li>
                <li>Status: ${item.get("status")}</li>
                                <li>Launch date: ${item.get("launch_date")}</li>
                                                                <li>Landing date: ${item.get(
                                                                  "landing_date"
                                                                )}</li>
                                                                 <li>Last photos taken: ${item.get(
                                                                   "last_photos"
                                                                 )}</li>


              </ul>
            </div>`;
  });

  return html.join("");
};

// create content
const App = (state) => {
  // let { info, rovers, apod } = state;
  // const html0 = rendering(state, 0);
  //const html1 = rendering(state, 1);

  return `
        <header><img src="./assets/images/NASA_logo.png" style="float:left"></header>
        <main>
            
            <h1>Mars Dashboard</h1>
            <section>
                <h3>${Greeting(state.user.name)}</h3>                
               <p>${currentDate(new Date())}</p>

                <div class="rovers">
               ${renderHTML(state)}
                            


                </div>
                <div>
                ${ImageOfTheDay(state, state.apod)}
                </div>
                
            </section>
        </main>
        <footer></footer>
    `;
};
// add our markup to the page

const render = (root, state) => {
  root.innerHTML = App(state);
};

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});
