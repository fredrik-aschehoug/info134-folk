

// Global variables
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

    function totalPopFunc() {
    const totalPop = befolkning.getInfo("1201");
    const maleObj = totalPop.Menn;
    const maleValues = Object.values(maleObj);


    const femaleObj = totalPop.Kvinner;
    const femaleValues = Object.values(femaleObj);
    
    totalPopulation = []
        for (let i = 0; i < maleValues.length; i ++){
            totalPopulation.push(maleValues[i]+femaleValues[i]);
        }
    return totalPopulation
    };
    totalPopFunc();
    console.log(totalPopulation)

    function yearsArray() {
        const totalPop = befolkning.getInfo("1201");
        const maleObj = totalPop.Menn;
        const maleKeys = Object.keys(maleObj);
    
        years = [""]
        for (let i = 0; i < maleKeys.length; i ++){
            years.push(maleKeys[i]);
        }
        return years
    };

    let graphCanvas; 
    let ctx;
    let maxValue = maxArray();
    let minValue = minArray();
    let increment = incrementFunc();
    let rectangles;
    let scaleForX;
    let scaleForY;
    let dataGraph = totalPopulation



function maxArray() {
        let arrayMax = Math.max.apply(Math, totalPopulation)

        if (arrayMax > 1000) {
            arrayMaxInt = Math.round(arrayMax/1000) * 1000;
            maxVal = arrayMaxInt + 1000;
        } else if (arrayMax < 1000 && arrayMax > 99) {
            arrayMaxInt = Math.round(arrayMax/100) * 100;
            maxVal = arrayMaxInt + 100;
        } else {
            maxVal = 100;
        }
    return maxVal       
}



function minArray() {
        //console.log(totalPopulation)
        let arrayMin = Math.min.apply(Math, totalPopulation);

        if (arrayMin > 1000) {
        arrayMinInt = Math.round(arrayMin/1000)*1000;
        minVal = arrayMinInt - 1000;

        } else if (arrayMin < 1000 && arrayMin > 100) {
            arrayMinInt = Math.round(arrayMin/100)*100;
            minVal = arrayMinInt - 100;

        } else {
            minVal = 0;
        }
    return minVal
};


function incrementFunc() {

    total = (maxValue - minValue) /10
    if (total > 100 ) {
        value = Math.round(total/10)*10;
        incrementVal = value;
    } else {
        incrementVal = 10;
    }
    return incrementVal
};



    //draws the line from one element to another from the array
function plotData(graphData) {
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, graphData[0]);
    for (i = 1; i < rectangles; i++) {
        ctx.lineTo(i * scaleForX, graphData[i])
    }
    ctx.stroke();
}



function drawGraph(years, minVal, maxVal, incrementVal) {

    //Dynamic values based on Array content for dataset
    minValue = minVal;
    maxValue = maxVal;
    increment = incrementVal
    rectangles = years.length - 1;

    let columnSize = 66;
    let rowSize = 46;
    let margin = 8;
    let xAxis = years

    graphCanvas = document.getElementById("graph");
    ctx = graphCanvas.getContext("2d");

    //Gridscaling based on graph input length
    scaleForX = (graphCanvas.width - rowSize) / rectangles;
    scaleForY = (graphCanvas.height - columnSize - margin) / (maxValue - minValue);

    //graphStyling
    ctx.font = "12px Arial";
    ctx.fillStyle = "#9933FF";      //Font colour
    ctx.strokeStyle = "#1F2421";    //Grid line color
    
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
            ctx.fillText(graphScale, margin-8, y + margin);
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

    let ids = befolkning.getIDs();
        for (let id of ids) {
            details.addMunicipal(
                id,
                befolkning.getInfo(id),
                sysselsatte.getInfo(id),
                utdanning.getInfo(id)
            );
        }   
    /* All data is loaded at this point */
    
    
    yearsArray();
    drawGraph(years, minVal, maxVal, incrementVal);
    
};

befolkning.load();


 






//totalPop(data2);
//yearsArray(data2);
//presentData(outputElt, data2);

    //global variables 

