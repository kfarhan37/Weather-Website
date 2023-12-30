const inputbox=document.querySelector('.input-box');
const searchbut=document.getElementById('but');

const weather_img=document.querySelector('.weather-img');
const temparature=document.querySelector('.temparature');
const description=document.querySelector('.description');

const humidity=document.getElementById('humidity');
const wind=document.getElementById('wind-s');
const feelslike=document.getElementById('feel');

const locnotfound=document.querySelector('.loc-not-found');
const weatherbody=document.querySelector('.weather-body');
const disp_name=document.querySelector('.displayn');
const disp_country=document.querySelector('.displayc');
const input_time=document.querySelector('.time');



async function checkWeather(city)
{
    const api_key = "66d42b6fdd197cc8eac303c136aaa2f9";
    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url1}`).then(response => response.json());

    if(weather_data.cod === '404')
    {
        locnotfound.style.display = "flex";
        weatherbody.style.display="none";
        console.log("Error");
        return;
    }
    locnotfound.style.display = "none";
    weatherbody.style.display = "flex";
    disp_name.innerHTML=`${weather_data.name} -`;
    disp_country.innerHTML=`${weather_data.sys.country}`;
    temparature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°c`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    feelslike.innerHTML=`${Math.round(weather_data.main.feels_like-273.15)}°c`;   
    wind.innerHTML=`${weather_data.wind.speed}Km/Hr`;

    switch(weather_data.weather[0].main)
    {
        case 'Clouds':
            weather_img.src = "/weatherpics/cloudy.svg";
                break;
        case 'Haze':
            weather_img.src = "/weatherpics/cloudy.svg";
                break;
        case 'Clear':
            weather_img.src = "/weatherpics/day.svg";
                break;
        case 'Rain':
            weather_img.src = "/weatherpics/rainy-6.svg";
                break;
        case 'Drizzle':
            weather_img.src = "/weatherpics/rainy-3.svg";
            break;
        case 'Mist':
            weather_img.src = "/weatherpics/rainy-7.svg"; 
                break;
        case 'Snow':
            weather_img.src = "/weatherpics/snowy-6.svg"; 
                break;     
        case 'Thunderstorm':
            weather_img.src = "/weatherpics/thunder.svg";
    }
   
    console.log(weather_data);
}

async function gettime(time)

{
    
    let url2=`https://timezone.abstractapi.com/v1/current_time/?api_key=c431db2778f44659bdcafa5e5baf7237&location=${time}`;
    let res=await fetch(url2);
    data=await res.json();
    time=data.datetime;
    input_time.innerHTML=`${time}`;
}
    

searchbut.addEventListener('click',()=>
{
    gettime(inputbox.value);
    checkWeather(inputbox.value);
})


inputbox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      gettime(inputbox.value);
      checkWeather(inputbox.value);
    }
  });


