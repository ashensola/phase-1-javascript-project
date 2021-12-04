function fetchRestAPI(cityName){
    let defaultcityName=cityName.toLowerCase();
    console.log(defaultcityName);
    let newcityName;
    newcityName=defaultcityName.charAt(0).toUpperCase() + defaultcityName.slice(1);
    console.log(newcityName);
    serverAddress=`http://localhost:3000/forecast?city=${newcityName}`

    fetch(serverAddress)
    .then(response=>response.json())  
    //.then((restapiData)=>console.log(restapiData))
    .then((restapiData) => this.collectapiData(restapiData))

}


    myTable=document.querySelector("#table-container");
    let table=document.createElement('table');

function createTable(city,tempDays,windDays,descDays,myTable,table){
    let events=["","",""];
    let headers=[city,'Day 1', 'Day 2', 'Day 3']
    
    // let createtableBtn=document.querySelector(".btn1");
    // createtableBtn.addEventListener("click",function() {
        //createtableBtn.disabled=true;
     //   resettableButton();

    let headerRow=document.createElement('tr');
////let resetbtn=document.querySelector(".btn2")
//resetbtn.addEventListener("click",function() {

  //remove(table);

//})
    headers.forEach(headerElement => {
        let header = document.createElement('th');
        let textNode=document.createTextNode(headerElement);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    
   table.appendChild(headerRow);
    myTable.appendChild(table);
///add title columns///
colHeaders=["Temperature", "Wind", "Description"];
for (let i=0;i<(colHeaders.length);i++){
 
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


}

function addnewRow(myTable,table){
events=[" "," "," "];
let newRow = document.createElement("tr");
newRow.setAttribute("id", "Events");
let newrowCell=document.createElement('th');
let newtitlenodeCell=document.createTextNode("Events");
newrowCell.appendChild(newtitlenodeCell);
newRow.appendChild(newrowCell);
table.appendChild(newRow);
myTable.appendChild(table);
    events.forEach(event=> {
        let addnewRow=document.getElementById("Events")
        let addCell=document.createElement("td");
        let eventVal=document.createTextNode(event);
        addCell.appendChild(eventVal);
        addnewRow.appendChild(addCell);
        table.appendChild(addnewRow);
        myTable.appendChild(table);
})
}


function collectapiData(restapiData){
 let tempDays=[]; let windDays=[]; let descDays=[]; 
let city=   restapiData[0].city;
   for(i=0;i<restapiData.length; i++){
       
tempDays[i]= restapiData[i].temperature; //where tempDays[0] = day 1 and so on

windDays[i]= restapiData[i].wind; //where windDays[0] = day 1 and so on

descDays[i]= restapiData[i].description; //where descDays[0] = day 1 and so on


}
////convert temperature metric to imperial////
let newtempArr=[];  let newwindArr=[]; let roundedwindImperial=[];let roundedtempImperial=[];

for (i=0;i <tempDays.length;i++){
    newtempArr[i] = tempDays[i].replace(/\D/g,'');
    } 
    
    
    const str2numTemp = newtempArr.map(str => {
      return Number(str);
    });
    //console.log(str2numTemp)
    
    const tempImperial = str2numTemp.map(x => 
        ((x * 9/5) + 32));
    
    for (i=0;i <tempDays.length;i++){
        roundedtempImperial[i]=Math.round(tempImperial[i]);  
        roundedtempImperial[i]=tempImperial[i] +" ⁰F";
         }  
        
    console.log(roundedtempImperial)
     
    
    ////convert wind metric to imperial////
    for (i=0;i <windDays.length;i++){
        newwindArr[i] = windDays[i].replace(/\D/g,'');
        } 
        
        
        const str2numWind = newwindArr.map(str => {
          return Number(str);
        });
        //console.log(str2numWind)
        
        const windImperial = str2numWind.map(x => 
            ((x/1.609)));
        
        for (i=0;i <windDays.length;i++){
            roundedwindImperial[i]=Math.round(windImperial[i]);    
            roundedwindImperial[i]=roundedwindImperial[i] + " mph";  

         }  
        
            console.log(roundedwindImperial)

 let createtableBtn=document.querySelector(".btn1");
 let imperialButton=document.querySelector(".imperial");

createtableBtn.addEventListener("click",function() {
createtableBtn.disabled=true;
imperialButton.disabled=true;

createTable(city,tempDays,windDays,descDays,myTable,table);
createButtons();
//addnewRow(myTable,table);

})

imperialButton.addEventListener("click",function() {
   imperialButton.disabled=true;
   createtableBtn.disabled=true;

    createTable(city,roundedtempImperial,roundedwindImperial,descDays,myTable,table);

})


}

function createButtons(){
let newButton=document.createElement("button");
newButton.setAttribute("class","add1");
newButton.setAttribute("id","buttons");
newButton.innerHTML = "Add Event";
document.body.appendChild(newButton);

let addBtn=document.querySelector(".add1");
addBtn.addEventListener("click",function() {
    addnewRow(myTable,table);
    addBtn.disabled=true;


})

}

    let apibtn=document.querySelector(".btn");
    apibtn.addEventListener("click",function() {
    fetchRestAPI(document.querySelector(".form").value);


})
let enterKey=document.querySelector(".form");
enterKey.addEventListener("keyup",function(event) {
    if(event.key =="Enter"){
        fetchRestAPI(document.querySelector(".form").value);
    }
})

