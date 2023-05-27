const root = document.getElementById("root");

const store = {
  user: { name: "" },
  apod: {},
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  info: {},
  photos: {},
  ready: 0,
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
const overlayImageByText = () => {
  const container = document.getElementById("container");
  if (container) {
    container.addEventListener("mouseover", function () {
      const overlay = document.getElementById("overlay");
      overlay.style.opacity = "1";
    });

    container.addEventListener("mouseout", function () {
      const overlay = document.getElementById("overlay");
      overlay.style.opacity = "0";
    });
  }
};

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
const getRoverPhoto = (state, name) => {
  const { rovers, photos } = state;
  //rovers[0]=""
  fetch(
    `http://localhost:3000/photos?rover=${name}` //?earth_date=${earth_date}
  )
    .then((res) => res.json())
    .then((photos) => {
      updateStore(state, { photos });
    });
};

// -------------------------------------------------------

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
      return `
    <div id="container"> 

            <img src="${apod.image.url}" onhover="" id="image"/> 
            <div id="overlay"><p>${apod.image.explanation}</p>
            </div>
           </div>
        `;
    }
  }
};

let iList = Immutable.List();
const RoverInfo = (state, i) => {
  const { info } = state;
  if (!info.info) {
    getRoverInfo(state, i);
  } else {
    if (info.info.photo_manifest) {
      const template = Immutable.Map({
        name: info.info.photo_manifest.name,
        status: info.info.photo_manifest.status,
        launch_date: info.info.photo_manifest.launch_date,
        landing_date: info.info.photo_manifest.landing_date,
        last_photos: info.info.photo_manifest.max_date,
      });
      return template;
    }
  }
};

const ListRover = (state) => {
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
/***************************Photo_Gallery***********************/
const generatePhotoGallery = (name, state = store) => {
  const { photos } = state;
  updateStore(state, { photos: {} });

  if (!photos.photos) {
    getRoverPhoto(state, name);
  } else {
    const images = photos.photos.latest_photos.map((array) => {
      return array.img_src;
    });

    const gallery = PhotoGalleryHTML(images);
    const element = document.querySelector(".rovers-gallery");

    element.innerHTML = gallery; // Set the gallery HTML as the content of the element
  }
};

const PhotoGalleryHTML = (images) => {
  const gallery = images
    .map((image) => {
      return `<div><img src="${image}" class="gallery-image" /></div>`;
    })
    .join("");
  return gallery;
};

const addPhotoGallery = (state) => {
  const galleries = document.getElementsByName("gallery");
  const rover_names = document.getElementsByClassName("rover-name");

  if (galleries && rover_names) {
    galleries.forEach((gallery, i) => {
      gallery.addEventListener("click", () => {
        generatePhotoGallery(rover_names[i].innerText, state);
      });
    });
  }
};

const renderHTMLRover = (state) => {
  if (iList.size < state.rovers.length + 1) {
    iList = ListRover(state);
  }

  const html = iList
    .toSet()
    .toList()
    .map((item, id) => {
      return `<div class="rover">
              <ul>
                <li name="name" class="rover-name"> ${item.get("name")}</li>
                <li name="status" class="status">Status: ${
                  item.get("name") === "Curiosity"
                    ? `<b>${item.get("status")}</b>`
                    : item.get("status")
                }</li>
                <li>Launch date: ${item.get("launch_date")}</li>
                <li>Landing date: ${item.get("landing_date")}</li>
                <li name="last_photos">Last photos taken: ${item.get(
                  "last_photos"
                )}</li>
                <li name="gallery" style="cursor:pointer;font-weight:bold;"> View Gallery</li>
              </ul>
            </div>`;
    });
  //console.log(html.size);
  if (html.size === 3) {
    state.ready = 1;
    return html.join("");
  }
};

const renderFrame = () => {
  return `<iframe src="https://mars.nasa.gov/layout/embed/image/mslweather/" allow="fullscreen" frameborder="0"></iframe>
`;
};

// create content
const App = (state) => {
  console.log(state.ready);
  return `
        <header><img src="./assets/images/NASA_logo.png" ></header>
        <main>
            
            <h1>Mars Dashboard</h1><h2 style="text-align:center;">${currentDate(
              new Date()
            )}</h2> 
            <section>
               
               <div class="rovers">
               ${renderHTMLRover(state)}
               <div class="rovers-gallery"></div>
                </div>
                </section>
          <div id="more-info">
        
              <div id="weather">${
                state.ready
                  ? `<h2>Weather Report</h2><iframe src="https://mars.nasa.gov/layout/embed/image/mslweather/" allow="fullscreen" frameborder="0">
                </iframe></div>`
                  : `<div></div>`
              }
                <div class="apod">
                <h2>Image of the day!</h2>
                ${ImageOfTheDay(state, state.apod)}
                </div>
                </div>
                             

                
                
            </section>
        </main>
        <footer></footer>
    `;
};
// add our markup to the page

const render = (root, state) => {
  root.innerHTML = App(state);
  addPhotoGallery(state);

  /* promise
    .then((result) => {
      console.log(result);
      // Promise fulfilled, initial rendering complete
    })
    .catch((error) => {
      console.error(error);
    });*/
};
const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);

  if (window.innerWidth >= 720) {
    overlayImageByText();
  }
});
//setTimeout(() => renderFrame(), 6000);
