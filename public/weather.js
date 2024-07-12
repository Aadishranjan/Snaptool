function api() {
  const city = document.getElementById("city-input").value || "Pupri";
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=6ccf116eba6045c791585046241007&q=${city}`)
  .then(res => res.json())
  .then(data => {
    const temp = "°C";
    const degree = "°";
    const condition = data.current.condition.text;

    if (data && data.location && data.current && data.forecast) {
      document.getElementById("cityname").innerHTML = data.location.name;
      document.getElementById("temperature").innerHTML = data.current.temp_c + temp;
      document.getElementById("condition").innerHTML = data.current.condition.text;
      document.getElementById("localtime").innerHTML = data.location.localtime;
      document.getElementById("low").innerHTML = data.current.feelslike_c + temp;

      // Display temperatures for the next 6 hours from the current time
      const forecastHours = data.forecast.forecastday[0].hour;
      const currentHour = new Date().getHours();

      for (let i = 0; i < 6; i++) {
        const forecastHour = forecastHours[(currentHour + i) % 24];
        if (forecastHour) {
          document.getElementById(`time${i+1}`).innerHTML = forecastHour.time.split(" ")[1]; // Extracting time part (HH:MM)
          document.getElementById(`temp${i+1}`).innerHTML = forecastHour.temp_c + degree;
        }
      }

      // Set background image based on the weather condition
      const currentWeather = "rain";
      const currentWeather1 = "Patchy rain nearby";
      const currentWeather2 = "Light rain";
      const currentWeather3 = "Patchy light rain";
      const currentWeather4 = "Partly Cloudy"
      const currentWeather5 = "Overcast"
      const currentWeather6 = "Sunny"
      const currentWeather7 = "Clear"

      if (condition === currentWeather || condition === currentWeather1) {
        document.body.style.backgroundImage = "url('images/rain-background.gif')";
      } else if (condition === currentWeather2 || condition === currentWeather3) {
        document.body.style.backgroundImage = "url('images/drizzle-background.gif')";
      } else if (condition === currentWeather4 || condition === currentWeather5){
        document.body.style.backgroundImage = "url('images/overcast-background.jpg')";
      } else if (condition === currentWeather6 || condition === currentWeather7){
        document.body.style.backgroundImage = "url('images/sunny-background.jpg')";
        document.getElementById("search-button").style.background = "#5C0DC5";
      } else {
        document.body.style.background = "linear-gradient(350deg, rgba(0,0,0,1) 0%, rgba(92,2,255,1) 93%)";
      }

    } else {
      throw new Error("Incomplete data structure");
    }
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
    document.getElementById("cityname").innerHTML = "Not Found";
    document.getElementById("temperature").innerHTML = "N/A";
    document.getElementById("condition").innerHTML = "N/A";
    document.getElementById("localtime").innerHTML = "N/A";
    document.getElementById("low").innerHTML = "N/A";

    for (let i = 0; i < 6; i++) {
      document.getElementById(`time${i+1}`).innerHTML = "N/A";
      document.getElementById(`temp${i+1}`).innerHTML = "N/A";
    }

    document.body.style.background = "linear-gradient(350deg, rgba(0,0,0,1) 0%, rgba(92,2,255,1) 93%)";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Call the API function on page load with default city
  api();
});





//temp c -> data.current.temp_c
//temp f -> data.current.temp_f
//cityname -> data.location.name
//weather -> data.current.condition.text
//image -> data.current.condition.icon
//feel like -> data.current.feelslike_c
//http://api.weatherapi.com/v1/current.json?key=6ccf116eba6045c791585046241007&q=bihar