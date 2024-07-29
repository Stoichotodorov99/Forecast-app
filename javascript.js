
const magnifying = document.getElementById('magnifying');


let cityName = document.getElementsByClassName('name');
const date = document.getElementsByClassName('date');
let icon = document.getElementsByClassName('weather-icon');
let temperatureNow = document.getElementById('temp-now');
let temperatureFeel = document.getElementById("temp-feel");
let weatherDescriptionElement = document.getElementById("weather-description");

const weekday = ["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"];

function start() 
{
    let baseUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=
    ${document.getElementById('input-city').value}&days=5&lang=bg`;
    fetch(baseUrl, {
        headers: {
            'x-rapidapi-key': "71ddc52c8emsh9271e018feac4fbp1c1e31jsn4d2b724cba50",
            'x-rapidapi-host': "weatherapi-com.p.rapidapi.com"
        }
    })
        .then(res => res.json() )
        
        .then(data => {

            arrays = Object.values(data)
          console.log(arrays);
            array1 = arrays.slice(0,1);
            array2 = arrays.slice(1,2); 
            array3 = arrays.slice(2,3);


            array1.forEach(city => {
                  cityName[0].innerHTML = `В момента в ${city.name}`;

                  dateAndTime = city.localtime.split(' ');
                  date[0].innerHTML = dateAndTime[0].split('-').reverse().join('-');
          

            })
            
            array2.forEach(city => {
            icon[0].src = city.condition.icon
            temperatureNow.innerHTML = `${city.temp_c}°C`;
            temperatureFeel.innerHTML = `Усеща се като ${city.feelslike_c}°C`;
            weatherDescriptionElement.innerHTML = city.condition.text;


            })
                  
            array3.forEach(city => {
                
                 const forecastDayOne = new Date(city.forecastday[0].date);
                 const forecastDayTwo = new Date(city.forecastday[1].date);
                 const forecastDayThree = new Date(city.forecastday[2].date);

            
                cityName[1].innerHTML = dayByTheDay(forecastDayOne);
                cityName[2].innerHTML = dayByTheDay(forecastDayTwo);
                cityName[3].innerHTML = dayByTheDay(forecastDayThree);

                date[1].innerHTML = city.forecastday[0].date.split('-').reverse().join('-');
                date[2].innerHTML = city.forecastday[1].date.split('-').reverse().join('-');

            })

        })
        
    .catch(err => console.log(err))

    }

start();
magnifying.addEventListener('click', () => {
    start()
})




function dayByTheDay(date) {
    const d = new Date(date);
    let day = weekday[d.getDay()];
    return day;
}