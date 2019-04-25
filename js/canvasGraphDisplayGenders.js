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
        id = detailsForm1.detailsInput.value
        let municipalData = details.getHistorical(id);
        
        let totalPop = Object.values(municipalData.population.number.total);
        let totalPopKeys = Object.keys(municipalData.population.number.total);
    
        let malePop = Object.values(municipalData.population.number.Menn);
        let malePopKeys = Object.keys(municipalData.population.number.Menn);
    
        let femalePop = Object.values(municipalData.population.number.Kvinner);
        let femalePopKeys = Object.keys(municipalData.population.number.Kvinner);
    
        let totalEmp = Object.values(municipalData.employment.number.total);
        let maleEmp = Object.values(municipalData.employment.number.Menn);
        let femaleEmp = Object.values(municipalData.employment.number.Kvinner);
        
        // Check if valid ID
        if (ids.includes(id)){
            createDetails(id);
            mapDataGraphTotal(totalPopKeys, totalPop);
            mapDataGraphGenders(totalPopKeys, malePop, femalePop)
            //drawGraph(totalPopulation, years);
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
        

        let data = details.getHistorical("0101");
        const detailsForm = document.getElementById("detailsForm");
    // Callback when clicking button
        detailsForm.detailsButton.onclick = detailsFormSubmit;
    // Callback when pressing enter while focused on form
        detailsForm.onsubmit = detailsFormSubmit;
        
        
    
    };
    /* All data is loaded at this point */

    //draws the line from one element to another from the array

 




    function mapDataGraphGenders(xAxisKeys, maleArr, femaleArr) {
    
    xAxisKeys = xAxisKeys
    maleArray = maleArr;
    femaleArray = femaleArr
    
    /*let empMaxValue = maxArray(totalEmp);
    let empMinValue = minArray(femaleEmp);
    let increment = incrementFunc();*/
    const detailsForm1 = document.getElementById("detailsForm");
    id = detailsForm1.detailsInput.value
    let xAxisValues;
    

    //let higherEdu = Object.values(municipalData.education.number['03a'].Kvinner)
        

    function xAxisArray(xAxisKeys, maleArray, femaleArray) {
        xAxisValues = xAxisKeys
        if (xAxisValues.length > 12) { 
            xAxisValues.reverse();
            xAxisValues.length = 12;
            xAxisValues.reverse();
            maxArray(maleArray, femaleArray)
        } else {
            maxArray(maleArray, femaleArray)
        }
        return xAxisValues.unshift("")
        };

        xAxisArray(xAxisKeys, maleArray, femaleArray);


    function maxArray(maleArray, femaleArray) {
        let femaleArrayMax = femaleArray;
        let maleArrayMax = maleArray;
        let arrayMax = femaleArrayMax.concat(maleArrayMax)
            arrayMax = Math.max.apply(Math, arrayMax)
        
        if (arrayMax > 1000) {
            arrayMaxInt = Math.round(arrayMax/1200) * 1200;
            maxVal = arrayMaxInt + 1200;
            minArray(maleArray, femaleArray);
        } else if (arrayMax < 1000 && arrayMax > 99) {
            arrayMaxInt = Math.round(arrayMax/100) * 100;
            maxVal = arrayMaxInt + 100;
        } else {
            maxVal = 100;
        }
        return maxVal       
    };
    //let popMaxValue = maxArray(totalPop);
    //let empMaxValue = maxArray(totalEmp);
  
    function minArray(maleArray, femaleArray) {
        let femaleArrayMin = femaleArray
        let maleArrayMin = maleArray
        let arrayMin = femaleArrayMin.concat(maleArrayMin)
        console.log(arrayMin)
        arrayMin = Math.min.apply(Math, arrayMin);
        console.log(arrayMin)
    
        if (arrayMin > 1000) {
        arrayMinInt = Math.round(arrayMin/1200)*1200;
        minVal = arrayMinInt -2400;
    
        } else if (arrayMin < 1000 && arrayMin > 100) {
            arrayMinInt = Math.round(arrayMin/100)*100;
            minVal = arrayMinInt - 100;
        } else {
            minVal = 0;
        }
        return minVal
    };
    
    
    function incrementFunc() {
        total = (maxVal - minVal) /12
        if (total > 100 ) {
            value = Math.round(total/10)*10;
            incrementVal = value;
        } else {
            incrementVal = 10;
        }
        return incrementVal
    };
    incrementFunc();
    drawGraphGenders(xAxisValues, minVal, maxVal,incrementVal, maleArray, femaleArray);

};



function drawGraphGenders(xAxisVal, minVal, maxVal, incrementVal, maleArr, femaleArr) {

    let graphGenders; 
    let ctx;
    let rectangles;
    let scaleForX;
    let scaleForY;
    let plotMale = maleArr
    console.log(plotMale)
    let plotFemale = femaleArr
    console.log(plotFemale)

    years = xAxisVal
    minValue = minVal;
    maxValue = maxVal;
    increment = incrementVal;
    rectangles = years.length-1;

//plots each of the points(elements) in the Array to a line
    function plotData(toPlot) {
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, toPlot[0]);
        for (i = 1; i < rectangles; i++) {
            ctx.lineTo(i * scaleForX, toPlot[i])
        }
        ctx.stroke();
    }

    //Dynamic values based on Array content for dataset
    let columnSize = 24;
    let rowSize = 38;
    let margin = 8;
    let xAxis = xAxisVal

    graphGenders = document.getElementById("graphGenders");
    ctx = graphGenders.getContext("2d");

    //Gridscaling based on graph input length
    scaleForX = (graphGenders.width - rowSize) / rectangles;
    scaleForY = (graphGenders.height - columnSize - margin) / (maxValue - minValue);

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
            ctx.lineTo(x, graphGenders.height - margin);
    }
    
    //Fills ArrayKeyValues from the numbers array on the Y axis
    //Horizontal grid lines
    let yCount = 0;
    for (graphScale = maxValue; graphScale >= minValue; graphScale = graphScale - increment) {
        let y = columnSize + (scaleForY * yCount * increment);
            ctx.lineWidth = 0.5
            ctx.fillText(graphScale, margin-10, y + margin);
            ctx.moveTo(rowSize, y);
            ctx.lineTo(graphGenders.width-20, y);
            yCount++;
    }

    ctx.stroke();
    ctx.translate(rowSize, graphGenders.height + minValue * scaleForY);
    ctx.scale(1, -1 * scaleForY);


    ctx.strokeStyle = "#FF0066";
    plotData(plotMale);
    ctx.strokeStyle = "#000";
    plotData(plotFemale);
};
  
befolkning.load();