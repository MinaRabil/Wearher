
var currentPlace = document.querySelector("input");
currentPlace.addEventListener("keyup", function () {
 var place = currentPlace.value;
getForcust(`${place}`)
  }
);


var r;

async function getForcust(type) {
  if(type == null){
  var location= await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=fcc55528a63046a7899152ca55301d73&')
  l = await location.json();
  type = l.region
}

  var response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=c8fe06b7ad16408c940135324232612&q=${type}&days=3&aqi=no&alerts=no`
  );
  r = await response.json();
  display();
  
}

getForcust();

function display() {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let firstDayDetails = new Date(`${r.forecast.forecastday[0].date}`);
  let firstDayIndex = firstDayDetails.getDay();
  var firstDayName = days[firstDayIndex];
  var monthNow = monthNames[firstDayDetails.getMonth()];
  var darNum = firstDayDetails.getDate();

  let dateDis2 = new Date(`${r.forecast.forecastday[1].date}`);
  let dayNum2 = dateDis2.getDay();
  var dayNow2 = days[dayNum2];

  let dateDis3 = new Date(`${r.forecast.forecastday[2].date}`);
  let dayNum3 = dateDis3.getDay();
  var dayNow3 = days[dayNum3];

  document.getElementById("forecast").innerHTML = `<div class="container">
<div class="forecast-container row  " id="forecast">
  <div class="today forecast text-white col-lg-4 text-center p-0 ">
    <div class="forecast-header  d-flex justify-content-between  " id="today">
      <div class="day">${firstDayName}</div>
      <div class=" date">${darNum} ${monthNow}</div>
    </div> <!-- .forecast-header -->
    <div class="forecast-content" id="current">
      <div class="location mb-3">${r.location.name}</div>
      <div class="degree d-flex">
        <div class="num fs-1 fw-bold mb-5">${r.current.temp_c}<sup>o</sup>C</div>
        <div class="forecast-icon">
          <img src="${r.current.condition.icon}" alt="" width="90">
        </div>

      </div>
      <div class="custom mb-lg-4">${r.current.condition.text}</div>
      <span class="mx-2"><img src="imgs/icon-umberella.png" alt="">${r.current.wind_degree}%</span>
      <span class="mx-2"><img src="imgs/icon-wind.png" alt="">${r.current.wind_kph} kph</span>
      <span class="mx-2"><img src="imgs/icon-compass.png" alt="">${r.current.wind_dir}</span>
    </div>
  </div>
  <div class="forecast special-color col-lg-4 text-center p-0">
    <div class="forecast-header ">
      <div class="day ">${dayNow2}</div>
    </div> <!-- .forecast-header -->
    <div class="forecast-content">
      <div class="forecast-icon mb-3">
        <img src="${r.forecast.forecastday[1].day.condition.icon}" alt="" width="48">
      </div>
      <div class="degree mb-1">${r.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
      <small>${r.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
      <div class="custom mt-3">${r.forecast.forecastday[1].day.condition.text}</div>
    </div>
  </div>
  <div class="forecast  col-lg-4 text-center p-0">
    <div class="forecast-header">
      <div class="day">${dayNow3}</div>
    </div> <!-- .forecast-header -->
    <div class="forecast-content">
      <div class="forecast-icon mb-3">
        <img src="${r.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
      </div>
      <div class="degree mb-1">${r.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
      <small>${r.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
      <div class="custom mt-3">${r.forecast.forecastday[2].day.condition.text}</div>
    </div>
  </div>
</div>
</div>`;
}

