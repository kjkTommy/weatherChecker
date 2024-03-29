import { getWeather } from "./fetch.js";
import { elementsDOM } from "./elements.js";

let dataLocation = [];
let locationList = [];

function findLocation(cityName) {
  getWeather(cityName)
    .then((data) => {
      dataLocation = data;
      if (data.name === undefined) {
        alert("Введите кооректное название города");
        return;
      }
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      elementsDOM.currentLocation.textContent = data.name;
      elementsDOM.iconWeather.src = iconUrl;
      elementsDOM.degreeValue.textContent = `${Math.round(data.main.temp)}°`;
      elementsDOM.btnLike.removeAttribute("hidden");
    })
    .catch((err) => console.error(err));
}

function addElement(cityName) {
  const element = document.createElement("li");
  element.classList.add("liLocation");

  const listItem = document.createElement("li");
  listItem.textContent = cityName;
  const span = document.createElement("span");
  span.classList.add("close");
  span.innerHTML = "&#10799";

  listItem.appendChild(span);
  element.appendChild(listItem);

  listItem.addEventListener("click", (event) => {
    if (event.target === listItem) {
      const name = event.target.childNodes[0].textContent.trim();
      findLocation(name);
    }
  });

  span.addEventListener("click", (event) => {
    const target = event.target;
    if (target) {
      listItem.remove();
      const favoriteCityName = target.previousSibling.textContent;

      for (const key in locationList) {
        if (Object.prototype.hasOwnProperty.call(locationList, key)) {
          const element = locationList[key].name;
          if (element === favoriteCityName) {
            locationList.splice(key, 1);
            break;
          }
        }
      }

      target.remove();
    }
  });
  elementsDOM.favoriteCountry.insertAdjacentElement("beforeend", element);
}

function renderFavList() {
  elementsDOM.favoriteCountry.innerHTML = "";
  locationList.forEach((cityName) => {
    addElement(cityName.name);
  });
}

elementsDOM.btnLike.addEventListener("click", (cityName) => {
  cityName = elementsDOM.currentLocation.textContent;
  locationList.push(dataLocation);
  renderFavList();
});

elementsDOM.form.addEventListener("submit", (event) => {
  event.preventDefault();
  findLocation(elementsDOM.input.value.trim());
  elementsDOM.form.reset();
});
