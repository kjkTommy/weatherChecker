import { elementsDOM } from "./elements.js";
import { getWeather } from "./fetch.js";

let dataLocation = [];
let locationList = [];

function handleWeatherData(cityName, bool) {
	return getWeather(cityName, bool).then(data => {
		dataLocation = data;
		return dataLocation;
	});
}

function renderWeatherData(cityName) {
	handleWeatherData(cityName, true).then(data => {
		elementsDOM.currentLocation.textContent = data.name;
		const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
		elementsDOM.iconWeather.src = iconUrl;
		elementsDOM.degreeValue.textContent = `${Math.round(data.main.temp)}°`;
		elementsDOM.btnLike.removeAttribute("hidden");
		elementsDOM.extraBlock.innerHTML = "";
		const feelLike = document.createElement("p");
		feelLike.textContent = `Ощущается как: ${Math.round(
			data.main.feels_like
		)}°`;
		elementsDOM.extraBlock.appendChild(feelLike);
		const sunrise = document.createElement("p");
		sunrise.textContent = `Рассвет: ${convertTime(data.sys.sunrise)}`;
		elementsDOM.extraBlock.appendChild(sunrise);

		const sunset = document.createElement("p");
		sunset.textContent = `Закат: ${convertTime(data.sys.sunset)}`;
		elementsDOM.extraBlock.appendChild(sunset);
		const line = document.createElement("hr");
		line.classList.add("line");
		elementsDOM.extraBlock.appendChild(line);
	});
	renderWeatherCard(cityName);
}

function renderWeatherCard(cityName) {
	handleWeatherData(cityName, false).then(data => {
		elementsDOM.forecastCard.innerHTML = "";
		data.list.map(element => {
			const timeZone = document.createElement("p");
			timeZone.textContent = convertTime(element.dt);
			elementsDOM.forecastCard.appendChild(timeZone);

			const tempZone = document.createElement("p");
			tempZone.textContent = `Температура: ${Math.floor(element.main.temp)}°`;
			elementsDOM.forecastCard.appendChild(tempZone);

			const tempZoneFeelLike = document.createElement("p");
			tempZoneFeelLike.textContent = `Ощущается как: ${Math.floor(
				element.main.feels_like
			)}°`;
			elementsDOM.forecastCard.appendChild(tempZoneFeelLike);

			const icon = document.createElement("img");
			icon.classList.add("iconForecast");
			const iconForecastUrl = `https://openweathermap.org/img/wn/${element.weather.icon}@4x.png`;
			icon.src = iconForecastUrl;
			elementsDOM.iconBlock.appendChild(icon);
			const line = document.createElement("hr");
			line.classList.add("line");
			elementsDOM.forecastCard.appendChild(line);
		});
	});
}

function convertTime(apiTime) {
	const timesTampMil = apiTime * 1000;
	const date = new Date(timesTampMil);
	const hours = ("0" + date.getHours()).slice(-2);
	const minutes = ("0" + date.getMinutes()).slice(-2);
	return `${hours}:${minutes}`;
}

function addElement(cityName) {
	const listItem = document.createElement("li");
	const itemName = document.createElement("p");
	itemName.textContent = cityName;
	const span = document.createElement("span");
	span.classList.add("close");
	span.innerHTML = "&#10799";

	listItem.appendChild(itemName);
	listItem.appendChild(span);

	itemName.addEventListener("click", event => {
		if (event.target === itemName) {
			const name = event.target.childNodes[0].textContent.trim();
			renderWeatherData(name);
		}
	});

	span.addEventListener("click", event => {
		const target = event.target;
		if (target) {
			listItem.remove();
			const favoriteCityName = target.previousSibling.textContent;

			for (const key in locationList) {
				if (Object.prototype.hasOwnProperty.call(locationList, key)) {
					const element = locationList[key].name || locationList[key].city.name;
					if (element === favoriteCityName) {
						locationList.splice(key, 1);
						break;
					}
				}
			}

			target.remove();
		}
	});
	elementsDOM.favoriteCountry.insertAdjacentElement("beforeend", listItem);
}

function renderFavList() {
	elementsDOM.favoriteCountry.innerHTML = "";
	locationList.forEach(cityName => {
		addElement(cityName.name || cityName.city.name);
	});
}

elementsDOM.btnLike.addEventListener("click", cityName => {
	cityName = elementsDOM.currentLocation.textContent;
	locationList.push(dataLocation);
	renderFavList();
});

elementsDOM.form.addEventListener("submit", event => {
	event.preventDefault();
	renderWeatherData(elementsDOM.input.value.trim());

	elementsDOM.form.reset();
});
