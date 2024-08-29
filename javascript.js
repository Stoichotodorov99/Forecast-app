
const magnifying = document.getElementById('magnifying');


let cityName = document.getElementsByClassName('name');
const date = document.getElementsByClassName('date');
let icon = document.getElementsByClassName('weather-icon');
let temperatureNow = document.getElementsByClassName('temp-now');
let temperatureFeel = document.getElementById("temp-feel");
let weatherDescriptionElement = document.getElementsByClassName("weather-description");

let humidityPercentElement = document.getElementsByClassName("humidity-percent");
let windKmElement = document.getElementsByClassName("wind-km");
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
            temperatureNow[0].innerHTML = `${city.temp_c}°C`;
            temperatureFeel.innerHTML = `Усеща се като ${city.feelslike_c}°C`;
            weatherDescriptionElement[0].innerHTML = city.condition.text;
            })
                  
            array3.forEach(city => {
                const dayOne = city.forecastday[0];
                const dayTwo = city.forecastday[1];
                const dayThree = city.forecastday[2];
                
                 const forecastDayOne = new Date(dayOne.date);
                 const forecastDayTwo = new Date(dayTwo.date);
                 const forecastDayThree = new Date(dayThree.date);

            
                cityName[1].innerHTML = dayByTheDay(forecastDayOne);
                cityName[2].innerHTML = dayByTheDay(forecastDayTwo);
                cityName[3].innerHTML = dayByTheDay(forecastDayThree);

                date[1].innerHTML = dayOne.date.split('-').reverse().join('-');
                date[2].innerHTML = dayTwo.date.split('-').reverse().join('-');
                date[3].innerHTML = dayThree.date.split('-').reverse().join('-');


                temperatureNow[1].innerHTML = `${dayOne.day.mintemp_c}°C / ${dayOne.day.maxtemp_c}°C `;
                temperatureNow[2].innerHTML = `${dayTwo.day.mintemp_c}°C / ${dayTwo.day.maxtemp_c}°C `;
                temperatureNow[3].innerHTML = `${dayThree.day.mintemp_c}°C / ${dayThree.day.maxtemp_c}°C `;

                
                weatherDescriptionElement[1].innerHTML = dayOne.day.condition.text;
                weatherDescriptionElement[2].innerHTML = dayTwo.day.condition.text;
                weatherDescriptionElement[3].innerHTML = dayThree.day.condition.text;

                
                icon[1].src = dayOne.day.condition.icon;
                icon[2].src = dayTwo.day.condition.icon;
                icon[3].src = dayThree.day.condition.icon;
                
                humidityPercentElement[0].innerHTML = `${dayOne.day.avghumidity}%`;
                humidityPercentElement[1].innerHTML = `${dayTwo.day.avghumidity}%`;                
                humidityPercentElement[2].innerHTML = `${dayThree.day.avghumidity}%`;


                windKmElement[0].innerHTML = `${dayOne.day.maxwind_kph} км/ч`
                windKmElement[1].innerHTML = `${dayTwo.day.maxwind_kph} км/ч`
                windKmElement[2].innerHTML = `${dayThree.day.maxwind_kph} км/ч`

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