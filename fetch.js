
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


document.querySelector(".city").innerText="Weather in " + name;
document.querySelector(".country").innerText=country;
document.querySelector(".temp").innerText=newTemp + " ⁰C";
document.querySelector(".desc").innerText=description;
document.querySelector(".icon").src ="https://openweathermap.org/img/wn/"+ icon+"@2x.png";
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

let btn=document.querySelector(".btn");
btn.addEventListener("click",function() {
    searchLocation();

});

let form=document.querySelector(".form");
form.addEventListener("keyup",function(event) {
    if(event.key =="Enter"){
    searchLocation();
    }
});


// let btn2=document.querySelector(".btn2");
// btn2.addEventListener("change",function(){
// if(btn2.checked ===true){
//     console.log("It is true");
// }
// else{
//     console.log("It is false");

// }
// })