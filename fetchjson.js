        let newcityName;
        //function to capitalise first letter of input in search bar//
        function regulatecityName(cityName) {
            let defaultcityName;

            defaultcityName = cityName.toLowerCase();
          //  console.log(defaultcityName);

            newcityName = defaultcityName.charAt(0).toUpperCase() + defaultcityName.slice(1);
           // console.log(newcityName);
        }
        //function to fetch API//

        function fetchRestAPI(newcityName) {

            serverAddress = `http://localhost:3000/forecast?city=${newcityName}`

            fetch(serverAddress)
                .then(response => response.json())
                .then((restapiData) => this.collectapiData(restapiData, tempDays, windDays, descDays))

        }

        let tempDays = [];
        let windDays = [];
        let descDays = [];
        let city;
        //function to push api data to arrays
        function collectapiData(restapiData, tempDays, windDays, descDays) {
            city = restapiData[0].city;
            for (i = 0; i < 3; i++) {

                tempDays[i] = restapiData[i].temperature; //where tempDays[0] = day 1 and so on

                windDays[i] = restapiData[i].wind; //where windDays[0] = day 1 and so on

                descDays[i] = restapiData[i].description; //where descDays[0] = day 1 and so on


            }
            ////convert temperature metric to imperial////
            let newtempArr = [];
            let newwindArr = [];
            let roundedwindImperial = [];
            let roundedtempImperial = [];

            for (i = 0; i < tempDays.length; i++) {
                newtempArr[i] = tempDays[i].replace(/\D/g, ''); //regxp to remove celcius unit
            }


            const str2numTemp = newtempArr.map(str => {
                return Number(str);
            });


            const tempImperial = str2numTemp.map(x =>
                ((x * 9 / 5) + 32));

            for (i = 0; i < tempDays.length; i++) {
                roundedtempImperial[i] = Math.round(tempImperial[i]);
                roundedtempImperial[i] = tempImperial[i] + " ⁰F";
            }

            console.log(roundedtempImperial)


            ////convert wind metric to imperial////
            for (i = 0; i < windDays.length; i++) {
                newwindArr[i] = windDays[i].replace(/\D/g, '');
            }


            const str2numWind = newwindArr.map(str => {
                return Number(str);
            });

            const windImperial = str2numWind.map(x =>
                ((x / 1.609)));

            for (i = 0; i < windDays.length; i++) {
                roundedwindImperial[i] = Math.round(windImperial[i]);
                roundedwindImperial[i] = roundedwindImperial[i] + " mph";

            }

            console.log(roundedwindImperial)






            let createtableBtn = document.querySelector(".btn1");
            let imperialButton = document.querySelector(".imperial");

            createtableBtn.addEventListener("click", function () {
                createtableBtn.disabled = true;
                imperialButton.disabled = true;

                createTable(city, tempDays, windDays, descDays, myTable, table);
                createButtons();

            })

            imperialButton.addEventListener("click", function () {
                imperialButton.disabled = true;
                createtableBtn.disabled = true;

                createTable(city, roundedtempImperial, roundedwindImperial, descDays, myTable, table);
                createButtons();
            })
        }


        //function to post data//

        function postData(city, tempDays, windDays, descDays, eventID) {

            let counter;
            if (eventID === 1) {
                counter = 0;
            } else if (eventID === 2) {
                counter = 1;
            } else {
                counter = 2;
            }
            //console.log(counter);

            fetch('http://localhost:3000/forecast/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        city: city,
                        temperature: tempDays[counter],
                        wind: windDays[counter],
                        description: descDays[counter],
                        event1: loggedVal
                    })

                })
                .then(resp => {
                    console.log(resp.data);
                })
                .catch(error => {
                    console.log(error)
                })
        }


        myTable = document.querySelector("#table-container");
        let table = document.createElement('table');
        //function to createTable//
        function createTable(city, tempDays, windDays, descDays, myTable, table) {
            let headers = [city, 'Day 1', 'Day 2', 'Day 3']
            let headerRow = document.createElement('tr');

            headers.forEach(headerElement => {
                let header = document.createElement('th');
                let textNode = document.createTextNode(headerElement);
                header.appendChild(textNode);
                headerRow.appendChild(header);
            });

            table.appendChild(headerRow);
            myTable.appendChild(table);
            ///add title columns///

            colHeaders = ["Temperature", "Wind", "Description"];
            for (let i = 0; i < (colHeaders.length); i++) {

                let row = document.createElement("tr");
                row.setAttribute("id", colHeaders[i]);
                let titleCell = document.createElement('th');
                let titlenodeCell = document.createTextNode(colHeaders[i]);
                titleCell.appendChild(titlenodeCell);
                row.appendChild(titleCell);
                table.appendChild(row);
                myTable.appendChild(table);


            }
            tempDays.forEach(tempDay => {
                let temperatureRow = document.getElementById("Temperature")
                let temperatureCell = document.createElement("td");
                let temperatureVal = document.createTextNode(tempDay);
                temperatureCell.appendChild(temperatureVal);
                temperatureRow.appendChild(temperatureCell);
                table.appendChild(temperatureRow);
                myTable.appendChild(table);

            })

            windDays.forEach(windDay => {
                let windRow = document.getElementById("Wind")
                let windCell = document.createElement("td");
                let windVal = document.createTextNode(windDay);
                windCell.appendChild(windVal);
                windRow.appendChild(windCell);
                table.appendChild(windRow);
                myTable.appendChild(table);

            })

            descDays.forEach(descDay => {
                let descRow = document.getElementById("Description")
                let descCell = document.createElement("td");
                let descVal = document.createTextNode(descDay);
                descCell.appendChild(descVal);
                descRow.appendChild(descCell);
                table.appendChild(descRow);
                myTable.appendChild(table);

            })


        }

        //function to add rows to table that was created//
        function addnewRow(myTable, table) {
            events = [" ", " ", " "];
            let newRow = document.createElement("tr");
            newRow.setAttribute("id", "Events");
            let newrowCell = document.createElement('th');
            let newtitlenodeCell = document.createTextNode("Events");
            newrowCell.appendChild(newtitlenodeCell);
            newRow.appendChild(newrowCell);
            table.appendChild(newRow);
            myTable.appendChild(table);
            for (j = 0; j < events.length; j++) {

                let addnewRow = document.getElementById("Events")
                let addCell = document.createElement("td");
                let eventVal = document.createTextNode(events[j]);
                addCell.appendChild(eventVal);
                addnewRow.appendChild(addCell);
                table.appendChild(addnewRow);
                myTable.appendChild(table);

                let newinputIDs = ["input1", "input2", "input3"];
                let newformIDs = ["form1", "form2", "form3"];
                let newsubmitIDs = ["submit1", "submit2", "submit3"]
                let newForm = document.createElement("form");
                newForm.setAttribute("method", "put");
                newForm.setAttribute("id", newformIDs[j]);

                let newInput = document.createElement("input");
                newInput.setAttribute("type", "text");
                newInput.setAttribute("name", "E");
                newInput.setAttribute("id", newinputIDs[j]);

                let submitButton = document.createElement("input");
                submitButton.setAttribute("type", "submit");
                submitButton.setAttribute("value", "Submit");
                submitButton.setAttribute("id", newsubmitIDs[j]);

                addCell.appendChild(newForm);
                newForm.appendChild(newInput);
                addCell.appendChild(submitButton);
            }

            let eventOne = document.querySelector("#submit1")
            let eventTwo = document.querySelector("#submit2")
            let eventThree = document.querySelector("#submit3")
            let eventID;
            eventOne.addEventListener("click", function () {
                eventID = 1;
                loggedVal = document.querySelector("#input1").value;
                postData(city, tempDays, windDays, descDays);
            })
            eventTwo.addEventListener("click", function () {
                eventID = 2;
                loggedVal = document.querySelector("#input2").value;
                postData(city, tempDays, windDays, descDays);
            })

            eventThree.addEventListener("click", function () {
                eventID = 3;
                loggedVal = document.querySelector("#input3").value;
                postData(city, tempDays, windDays, descDays, eventID);
            })


        }

        //function to create "Add" button
        function createButtons() {
            let newButton = document.createElement("button");
            newButton.setAttribute("class", "add1");
            newButton.setAttribute("id", "buttons");
            newButton.innerHTML = "Add Event";
            document.body.appendChild(newButton);

            let addBtn = document.querySelector(".add1");
            addBtn.addEventListener("click", function () {
                addnewRow(myTable, table);
                addBtn.disabled = true;


            })

        }

        //button calls//
        let apibtn = document.querySelector(".btn");
        apibtn.addEventListener("click", function () {
            //fetchRestAPI(document.querySelector(".form").value);

            regulatecityName(document.querySelector(".form").value)

            fetchRestAPI(newcityName)
        })
        let enterKey = document.querySelector(".form");
        enterKey.addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
                regulatecityName(document.querySelector(".form").value);

                fetchRestAPI(newcityName);
            }
        })