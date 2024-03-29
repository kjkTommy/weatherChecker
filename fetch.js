const elementsUrl = {
  serverUrl: "http://api.openweathermap.org/data/2.5/weather",
  apiKey: "f660a2fb1e4bad108d6160b7f58c555f",
  serverUrl: "http://api.openweathermap.org/data/2.5/weather",
};
export function getWeather(cityName) {
  const url = `${elementsUrl.serverUrl}?q=${cityName}&appid=${elementsUrl.apiKey}&units=metric`;
  return fetch(url).then((response) => {
    if (response.status === 404) {
      throw new Error("Локация не найдена");
    } else {
      return response.json();
    }
  });
}
