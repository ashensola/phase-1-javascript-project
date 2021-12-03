

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
        createtableBtn.disabled=true;
     //   resettableButton();
    
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
row.setAttribute("id", colHeaders[i]);
let titleCell=document.createElement('th');
let titlenodeCell=document.createTextNode(colHeaders[i]);
titleCell.appendChild(titlenodeCell);
row.appendChild(titleCell);
table.appendChild(row);
myTable.appendChild(table);


}
tempDays.forEach(tempDay=> {
let temperatureRow=document.getElementById("Temperature")
let temperatureCell=document.createElement("td");
let temperatureVal=document.createTextNode(tempDay);
temperatureCell.appendChild(temperatureVal);
temperatureRow.appendChild(temperatureCell);
table.appendChild(temperatureRow);
myTable.appendChild(table);

})

windDays.forEach(windDay=> {
    let windRow=document.getElementById("Wind")
    let windCell=document.createElement("td");
    let windVal=document.createTextNode(windDay);
    windCell.appendChild(windVal);
    windRow.appendChild(windCell);
    table.appendChild(windRow);
    myTable.appendChild(table);
    
    })

    descDays.forEach(descDay=> {
        let descRow=document.getElementById("Description")
        let descCell=document.createElement("td");
        let descVal=document.createTextNode(descDay);
        descCell.appendChild(descVal);
        descRow.appendChild(descCell);
        table.appendChild(descRow);
        myTable.appendChild(table);
        
        })
let resetbtn=document.querySelector(".btn");
resetbtn.addEventListener("click",function() {
    createtableBtn.disabled=false; //
    remove(myTable)
    
})


});




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

function remove(el) {
    var element = el;
    element.remove();
  }