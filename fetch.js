
cityName="";
let data;
function collectData(cityName) {
const apiKey= "6b53b9ce588ecc6af14da5edb6f5b9b5";
fetchAddress=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
fetch(fetchAddress)

.then(response=> response.json())
//.then(data=>returnData(data))

.then((data) => this.storeData(data))
.then((data)=> console.log(data))


}

//function to input to fetch
collectData(cityName);
//function to store variables in objects
//function to print object data

//function returnData(data)
//{console.log(data)}

function storeData(data){

const {name} = data;
const {country}=data.sys
const {icon,description} =data.weather[0];
const{temp,humidity} = data.main;
newTemp=Math.round(temp);
const {speed} = data.wind;

let btn2=document.querySelector(".btn2");

let myDiv=document.createElement("div");
myDiv.id="currentweather";
document.getElementsByTagName('body')[0].appendChild(myDiv);
let myDivs = document.getElementById("currentweather");
let pCity=document.createElement("p")
pCity.className="city";
let pCountry=document.createElement("p")
pCountry.className="country";
let pTemp=document.createElement("p");
pTemp.className="temp";
let imgElement=document.createElement("img");
imgElement.className="icon";
let pDesc=document.createElement("p");
pDesc.className="desc";
let pHumidity=document.createElement("p");
pHumidity.className="humidity";
let pWind=document.createElement("p");
pWind.className="wind";


myDivs.appendChild(pCity);
myDivs.appendChild(pCountry);
myDivs.appendChild(pTemp);
myDivs.appendChild(imgElement);
myDivs.appendChild(pDesc);
myDivs.appendChild(pHumidity);
myDivs.appendChild(pWind);




document.querySelector(".city").innerText="Weather in " + name;
document.querySelector(".country").innerText=country;
document.querySelector(".temp").innerText=newTemp + " ⁰C";
document.querySelector(".icon").src ="https://openweathermap.org/img/wn/"+ icon+"@2x.png";
document.querySelector(".desc").innerText=description;
document.querySelector(".humidity").innerText="Humidity: "+humidity +"%";
document.querySelector(".wind").innerText=speed +  " m/s"

btn2.addEventListener("input",function(){
if(btn2.checked ===true){

    imperialTemp=(temp * 9/5) + 32
    newimperialTemp=Math.round(imperialTemp);
    document.querySelector(".temp").innerText=newimperialTemp + " ⁰F";

    imperialSpeed=(speed/1.609);
    newimperialSpeed=Math.round(imperialSpeed)
    document.querySelector(".wind").innerText=newimperialSpeed + " mi/s";

}
else{
    document.querySelector(".city").innerText="Weather in " + name;
    document.querySelector(".country").innerText=country;
    document.querySelector(".temp").innerText=newTemp + " ⁰C";
    document.querySelector(".desc").innerText=description;
    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/"+ icon+"@2x.png";
    document.querySelector(".humidity").innerText="Humidity: "+humidity +"%";
    document.querySelector(".wind").innerText=speed +  " m/s"

}
})
}

function searchLocation(){
    collectData(document.querySelector(".form").value)
}

function searchFunction(){


let btn=document.querySelector(".btn");
btn.addEventListener("click",function() {
    searchLocation();
    btn.disabled=true;
});
}


let form=document.querySelector(".form");
form.addEventListener("keyup",function(event) {
    if(event.key =="Enter"){
    searchLocation();
    }
});

searchFunction();