
//Global variables
const oversikt = document.getElementsByClassName("oversikt")[0];
const overviewHeaders = ["Navn", "Kommunenummer", "Total befolkning"];
let ids; // Will be assigned array of all municipal ID's
// Returns wuldboy URL
getURL = (id) => `http://wildboy.uib.no/~tpe056/folk/${id}.json`;
// Instanciate objects
const befolkning = new Population(getURL("104857"));
const sysselsatte = new Employment(getURL("100145"));
const utdanning = new Education(getURL("85432"));
const details = new Details(2017);

/**
 * Runs when befolkning is fully loaded
 * @callback
 */
befolkning.onload = function () {
    // Add overview to DOM
    ids = befolkning.getIDs();
    //oversikt.appendChild(createOverview(ids, overviewHeaders));
    sysselsatte.load();
};
/**
 * Runs when sysselsatte is fully loaded
 * @callback
 */
sysselsatte.onload = function () {
    utdanning.load();
};
/**
 * Runs when utdanning is fully loaded
 * @callback
 */
utdanning.onload = function () {
    /**
     * Get value from input and create details view.
     * @callback
     */
    

    function detailsFormSubmit() {
        const detailsForm1 = document.getElementById("detailsForm");
        id = detailsForm1.detailsInput.value;
        let years = yearsArray(id);
        console.log(id)
        // Check if valid ID
        if (ids.includes(id)){
            createDetails(id);
            totalPopFunc(id);
            console.log(totalPopulation)
            drawGraph(totalPopulation, years);
        } else {
            alert(`${id} er ikkje eit gyldig kommunenummer`);
        }
    }


    let ids = befolkning.getIDs();
        for (let id of ids) {
            details.addMunicipal(
                id,
                befolkning.getInfo(id),
                sysselsatte.getInfo(id),
                utdanning.getInfo(id)
            );
        }   
        function totalPopFunc(id) {
            let totalPop = details.getHistorical(id);
            let populationObj = totalPop.population.number.total;
                return totalPopulation = Object.values(populationObj)
            };


            function yearsArray(id) {
                let totalPop = details.getHistorical(id);
                let yearObj = totalPop.population.number.total;
                years = Object.keys(yearObj)//["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"] //Object.keys(yearObj)
                console.log(years.length)
                /*if (years.length >) {
                    years.reverse();
                    years.length = 12;
                    years.reverse();
                    years = Object.keys(yearObj)
                }*/
                return years.unshift("")
                };

            



        let data = details.getHistorical("0101");
        const detailsForm = document.getElementById("detailsForm");
    // Callback when clicking button
        detailsForm.detailsButton.onclick = detailsFormSubmit;
    // Callback when pressing enter while focused on form
        detailsForm.onsubmit = detailsFormSubmit;
        
        
    
    };
    /* All data is loaded at this point */

    //draws the line from one element to another from the array



function drawGraph() {

    let graphCanvas; 
    let ctx;
    let maxValue = maxArray(totalPopulation);
    let minValue = minArray(totalPopulation);
    let increment = incrementFunc();
    let rectangles;
    let scaleForX;
    let scaleForY;
    let dataGraph = totalPopulation;


    
    function maxArray(ArrayArg) {
        let arrayMax = Math.max.apply(Math, ArrayArg)

        if (arrayMax > 1000) {
            arrayMaxInt = Math.round(arrayMax/1200) * 1200;
            maxVal = arrayMaxInt + 1200;
        } else if (arrayMax < 1000 && arrayMax > 99) {
            arrayMaxInt = Math.round(arrayMax/100) * 100;
            maxVal = arrayMaxInt + 100;
        } else {
            maxVal = 100;
        }
    return maxVal       
    };


    function minArray(ArrayArg) {
        let arrayMin = Math.min.apply(Math, ArrayArg);

        if (arrayMin > 1000) {
        arrayMinInt = Math.round(arrayMin/1200)*1200;
        minVal = arrayMinInt - 1200;
        console.log(minVal)

        } else if (arrayMin < 1000 && arrayMin > 100) {
            arrayMinInt = Math.round(arrayMin/100)*100;
            minVal = arrayMinInt - 100;

        } else {
            minVal = 0;
        }
    return minVal
};


    function incrementFunc() {

        total = (maxValue - minValue) /12
        console.log(total)
        if (total > 100 ) {
            value = Math.round(total/10)*10;
            incrementVal = value;
        } else {
            incrementVal = 10;
        }
        return incrementVal
    };

//plots each of the points(elements) in the Array to a line
    function plotData(graphData) {
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, graphData[0]);
        for (i = 1; i < rectangles; i++) {
            ctx.lineTo(i * scaleForX, graphData[i])
        }
        ctx.stroke();
    }

    //Dynamic values based on Array content for dataset
    increment = incrementVal
    console.log(increment)
    rectangles = years.length-1;
    
    let columnSize = 40;
    let rowSize = 44;
    let margin = 8;
    let xAxis = years

    graphCanvas = document.getElementById("graph");
    ctx = graphCanvas.getContext("2d");

    //Gridscaling based on graph input length
    scaleForX = (graphCanvas.width - rowSize) / rectangles;
    scaleForY = (graphCanvas.height - columnSize - margin) / (maxValue - minValue);

    //graphStyling
    ctx.font = "11px Arial";
    ctx.fillStyle = "#374C70";      //Font colour
    ctx.strokeStyle = "grey";    //Grid line color
    
    //Fills ArrayKeys on the X axis 
    ctx.beginPath();
    for (i = 1; i <= rectangles; i++) {
        let x = i * scaleForX;
            ctx.fillText(xAxis[i], x, columnSize - margin);
            ctx.moveTo(x, columnSize);
            ctx.lineTo(x, graphCanvas.height - margin);
    }
    
    //Fills ArrayKeyValues from the numbers array on the Y axis
    //Horizontal grid lines
    let yCount = 0;
    for (graphScale = maxValue; graphScale >= minValue; graphScale = graphScale - increment) {
        let y = columnSize + (scaleForY * yCount * increment);
            ctx.lineWidth = 0.5
            ctx.fillText(graphScale, margin-6, y + margin);
            ctx.moveTo(rowSize, y);
            ctx.lineTo(graphCanvas.width-20, y);
            yCount++;
    }

    ctx.stroke();
    ctx.translate(rowSize, graphCanvas.height + minValue * scaleForY);
    ctx.scale(1, -1 * scaleForY);


    ctx.strokeStyle = "#9933FF";
    plotData(dataGraph);
};
  
befolkning.load();