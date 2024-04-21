async function fetchCityTime(city) {
  const response = await fetch(`https://worldtimeapi.org/api/timezone/${city}`);
  const data = await response.json();
  return data.datetime;
}

function displayCityTime(city, time) {
  const clockContainer = document.getElementById("clockContainer");
  const clockElement = document.createElement("div");
  clockElement.classList.add("city-clock");
  clockElement.innerHTML = `
        <p>${city}</p>
        <p class="time">${time}</p>
    `;
  clockContainer.appendChild(clockElement);
}

async function displayWorldClock(cities) {
  for (const city of cities) {
    try {
      const time = await fetchCityTime(city);
      const formattedTime = dayjs(time).format("HH:mm:ss");
      displayCityTime(city.split("/")[1], formattedTime);
    } catch (error) {
      console.error(`Error fetching time for ${city}: ${error.message}`);
    }
  }
}

const citiesToShow = ["America/New_York", "Europe/London", "Asia/Tokyo"];

window.onload = function () {
  displayWorldClock(citiesToShow);
};
