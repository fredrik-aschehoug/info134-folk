
const data2 = {
    "datasett": {
      "eierskap": "Dataene er hentet fra Statistisk sentralbryå (SSB), men er noe forkortet. De er publisert på http://wildboy.uib.no/~tpe056/oppgave/ i forbindelse med en semesteroppgave i kurset INFO134 av emneansvarlig, Truls Pedersen. Dataene ble lastet ned og behandlet april (2019) av emneansvarlig. Dette inkluderer i noen tilfeller forringelse i form av å fjerne noen detaljer. Dataene brukes i tråd med NLOD ( https://data.norge.no/nlod/no ).",
      "opphav": "http://data.ssb.no/api/v0/dataset/104857?lang=no"
    },
    "elementer": {
      "Halden": {
        "kommunenummer": "0101",
        "Menn": {
          "2007": 13807,
          "2008": 13940,
          "2009": 14092,
          "2010": 14285,
          "2011": 14574,
          "2012": 14760,
          "2013": 14892,
          "2014": 15034,
          "2015": 15170,
          "2016": 15306,
          "2017": 15473,
          "2018": 15620
        },
        "Kvinner": {
          "2007": 14028,
          "2008": 14152,
          "2009": 14297,
          "2010": 14491,
          "2011": 14646,
          "2012": 14783,
          "2013": 14988,
          "2014": 15098,
          "2015": 15158,
          "2016": 15238,
          "2017": 15317,
          "2018": 15417
        }
      }
    }
}



function totalPop(data2) {
    const malePopulation = data2.elementer.Halden.Menn;
    const maleValues = Object.values(malePopulation);
    const maleKeys = Object.keys(malePopulation);

    const femalePopulation = data2.elementer.Halden.Kvinner;
    const femValues = Object.values(femalePopulation);
    

    totalPopulation = []
for (let i = 0; i < maleKeys.length; i ++){
    totalPopulation.push(maleValues[i]+femValues[i]);
    
}
    return totalPopulation
}


function yearsArray(data2) {
    const malePopulation = data2.elementer.Halden.Menn;
    const maleKeys = Object.keys(malePopulation);

    years = [""]
    for (let i = 0; i < maleKeys.length; i ++){
        years.push(maleKeys[i]);
    
}
    return years
}

totalPop(data2);
yearsArray(data2);
//presentData(outputElt, data2);

    //global variables 

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
    console.log(scaleForY)
    console.log(scaleForX)

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

    console.log(totalPopulation)

    
    //Fills ArrayKeyValues from the numbers array on the Y axis
    //Horizontal grid lines
    let yCount = 0;
    for (graphScale = maxValue; graphScale >= minValue; graphScale = graphScale - increment) {
        let y = columnSize + (scaleForY * yCount * increment);
            ctx.lineWidth = 0.5
            ctx.fillText(graphScale, 5, y + margin);
            ctx.moveTo(rowSize, y);
            ctx.lineTo(graphCanvas.width-20, y);
            yCount++;
    }

    ctx.stroke();
    ctx.translate(rowSize, graphCanvas.height + minValue * scaleForY);
    ctx.scale(1, -1 * scaleForY);


    ctx.strokeStyle = "#9933FF";
    plotData(dataGraph);
    

}

