let long=0;
let lati=0;
const usertab = document.querySelector("[data-usertab]");
const weatherdata = document.querySelector("[data-yourweather]");
const grantacess = document.querySelector("[accessgrant]");
const maingrant = document.querySelector("[data-grant]");
const gifscreen = document.querySelector("[data-gif]");
const searchcity = document.querySelector("[data-searchcity]");
const searchweather = document.querySelector("[data-searchweather]");
const cityname = document.querySelector("[data-cityname]");
let currtab = usertab;
function renderweather(data,datas){
    let winddata = document.querySelector("[data-windspeed]");
    let humiddata = document.querySelector("[data-humidity]");
    let clouddata = document.querySelector("[data-clouds]");
    let tempdata = document.querySelector("[data-temp]");
    let citydata = document.querySelector("[data-city]");
    let imgdata = document.querySelector("[data-img]"); 
    let textdata = document.querySelector("[data-text]");
    let cityflag = document.querySelector("[data-cityflag]");
    winddata.textContent = `${data?.current?.wind_kph.toFixed(2)} kph`;
    humiddata.textContent = `${data?.current?.humidity.toFixed(2)} %`;
    clouddata.textContent = `${data?.current?.cloud.toFixed(2)} %`;
    tempdata.textContent = `${data?.current?.temp_c.toFixed(2)} °C`;
    citydata.innerText = `${data?.location?.name}`;
    let imgsrc = `${data?.current?.condition?.icon}`
    textdata.innerText = `${data?.current?.condition?.text}`;
    imgdata.setAttribute("src",imgsrc);
    console.log(datas?.sys?.country.toLowerCase());
    cityflag.src = `https://flagcdn.com/16x12/${datas?.sys?.country.toLowerCase()}.png`
}
function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}  
function showPosition(position) {
    lati = position.coords.latitude;
    long = position.coords.longitude;
}
async function weather(){
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=aab5fdfcc4c8433086d172537242605&q=${lati},${long}&aqi=no`);
    let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=103ac824ad387d848e42c8e8781a996b`);
    let data = await response.json();
    let data2 = await response2.json();
    gifscreen.classList.add("active");
    weatherdata.classList.remove("active");
    renderweather(data,data2);
};
function loading_gif(){
    maingrant.classList.add("active");
    gifscreen.classList.remove("active");
    getLocation();
    setTimeout(()=>{
        weather();
    },100);
}
grantacess.addEventListener('click',()=>{
    loading_gif();
})
function searchweathercity(){
    if(currtab!=searchweather){
        if(lati === 0){
            maingrant.classList.add("active");
        }else{
            weatherdata.classList.add("active");
        }
        usertab.classList.remove("bg-blue-400")
        searchcity.classList.remove("active");
        searchweather.classList.add("bg-blue-400");
        currtab = searchweather;
    }
}
function yourweather(){
    if(currtab!=usertab){
        if(!weatherdata.classList.contains("active")){
            weatherdata.classList.add("active");
        }
        searchcity.classList.add("active");
        searchweather.classList.remove("bg-blue-400");
        usertab.classList.add("bg-blue-400");
        if(lati===0){
            maingrant.classList.remove("active");
        }
        else{
            loading_gif();
        }
        currtab=usertab;
    }
}
async function cityweather(){
    if(cityname.value){
        if(!weatherdata.classList.contains("active")){
            weatherdata.classList.add("active");
        }
        gifscreen.classList.remove("active");
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=aab5fdfcc4c8433086d172537242605&q=${cityname.value}&aqi=no`);
        let responses = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&appid=103ac824ad387d848e42c8e8781a996b`);
        let data = await response.json();
        let datas = await responses.json();
        gifscreen.classList.add("active");
        weatherdata.classList.remove("active");
        renderweather(data,datas);
    }
    
};