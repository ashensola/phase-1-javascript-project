

function fetchRestAPI(cityName){
    serverAddress=`http://localhost:3000/forecast?city=${cityName}`

    fetch(serverAddress)
    .then(response=>response.json())  
    //.then((restapiData)=>console.log(restapiData))
    .then((restapiData) => this.collectapiData(restapiData))

}


function createTable(city,tempDays,windDays,descDays){
    myTable=document.querySelector("#table")
    let headers=[city,'Day 1', 'Day 2', 'Day 3']
    
    let createtableBtn=document.querySelector(".btn1");
    createtableBtn.addEventListener("click",function() {
    let table=document.createElement('table');
    let headerRow=document.createElement('tr');

    headers.forEach(headerElement => {
        let header = document.createElement('th');
        let textNode=document.createTextNode(headerElement);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    
   table.appendChild(headerRow);
    myTable.appendChild(table);
///add title columns///
colHeaders=["Temperature", "Wind", "Description"]
for (i=0;i<colHeaders.length;i++){
 
let row = document.createElement("tr");
let titleCell=document.createElement('th');
let titlenodeCell=document.createTextNode(colHeaders[i]);
titleCell.appendChild(titlenodeCell);
row.appendChild(titleCell);
table.appendChild(row);
myTable.appendChild(table);


}
//tempDays.forEach(tempDay=> {
// let temperatureRow=document.querySelector("th")
// let temperatureCell=document.createElement("td");
// let temperatureVal=document.createTextNode(tempDay);
// temperatureCell.appendChild(temperatureVal);
// temperatureRow.appendChild(temperatureCell);
// table.appendChild(temperatureRow);
// myTable.appendChild(table);

// })


});


console.log(tempDays[0],windDays[0],descDays[0]);



}

function addverticleHeaders(){



}
function collectapiData(restapiData){
 let tempDays=[]; let windDays=[]; let descDays=[];
let city=   restapiData[0].city;
   for(i=0;i<restapiData.length; i++){
       
tempDays[i]= restapiData[i].temperature; //where tempDays[0] = day 1 and so on

windDays[i]= restapiData[i].wind; //where windDays[0] = day 1 and so on

descDays[i]= restapiData[i].description; //where descDays[0] = day 1 and so on

}
createTable(city,tempDays,windDays,descDays);

}







    let apibtn=document.querySelector(".btn");
    apibtn.addEventListener("click",function() {
    fetchRestAPI(document.querySelector(".form").value)


});
