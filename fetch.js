const elementsUrl = {
	serverUrl: "http://api.openweathermap.org/data/2.5/",
	weatherUrl: "weather/",
	forecastUrl: "forecast/",
	apiKey: "f660a2fb1e4bad108d6160b7f58c555f",
};

export function getWeather(cityName, weather = true) {
	const url = `${elementsUrl.serverUrl}${
		weather ? elementsUrl.weatherUrl : elementsUrl.forecastUrl
	}?q=${cityName}&appid=${elementsUrl.apiKey}&units=metric&lang=ru&cnt=3`;

	return fetch(url).then(response => {
		return response.json();
	});
}
