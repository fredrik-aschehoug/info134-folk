/** 
*initiates and runs onclick functionality
* for comparing 2 municipals.
* @param {string} first municipal
* @param {string} second municpal
*/
function createGraphCompare(id1, id2) {
    //Select div to place graph
    const canvasClass = document.querySelectorAll('.canvasBtn')[1];
    const graphRender = document.querySelectorAll('.canvasRend')[1];
    //Create elements
    const graphBtnNum = document.createElement("button");
    const graphBtnPer = document.createElement("button");
    const canvasK = document.createElement("canvas");
    const canvasM = document.createElement("canvas");
    const canvasT = document.createElement("canvas");
    const graphId = ["kvinner", "menn", "total"];
    //Assign class
    canvasK.classList.add('canvasImg');
    canvasM.classList.add('canvasImg');
    canvasT.classList.add('canvasImg');
    //Append Btn & properties
    canvasClass.appendChild(graphBtnNum);
    canvasClass.appendChild(graphBtnPer);
    graphBtnNum.id = "numbersBtn";
    graphBtnPer.id = "percentBtn";
    graphBtnNum.innerHTML = "Numbers";
    graphBtnPer.innerHTML = "Percent";
    /**
     * Set canvas properties, retrieve objects and initiate 
     * drawing.
     * @param {object} historicalDetails1 from gethistorical
     * @param {object} historicalDetails2 from gethistorical
     * @param {string} sex includes "total"
     * @param {string} type percentage og numbers
     * @param {HTMLCanvasElement} canvas canvas element
     * @param {string} graphId string element from array
     */
    function compNum(historicalDetails1, historicalDetails2, sex, type, canvas, graphId) {
        appendElements(graphRender, canvas);
        canvas.style.display = "block";
        canvas.id = graphId;
        canvasId = canvas.id;
        canvas.width = 475;
        canvas.height = 275;
        const canvasImg = document.querySelectorAll(".canvasImg");
        const can = document.getElementById(canvasId);
        canvasClass.appendChild(graphBtnNum);
        canvasClass.appendChild(graphBtnPer);
        can.classList.remove('afterTrans');
        const graphObjOne = historicalDetails1.employment[type][sex];
        const graphObjTwo = historicalDetails2.employment[type][sex];
        graphMainComp(graphObjOne, graphObjTwo, canvasId, sex, type, historicalDetails1.navn, historicalDetails2.navn);
        graphAnimation(can);
        setTimeout(function () {
            can.classList.remove('transition');
            can.classList.add('afterTrans');
        }, 500);
        canvasImg.forEach((element) => {
            element.addEventListener('click', () => {
                renderDiv.style.display = "none";    
            });
        });
    }
    //Objects to retrieve data from
    const historicalDetails1 = details.getHistorical(id1);
    const historicalDetails2 = details.getHistorical(id2);
    // Create items to append
    const renderDiv = document.querySelectorAll(".canvasRend")[1];
    
    graphBtnNum.addEventListener('click', () => {
        renderDiv.style.display = "block";
        compNum(historicalDetails1, historicalDetails2, "Kvinner", "number", canvasK, graphId[0]);
        compNum(historicalDetails1, historicalDetails2, "Menn", "number", canvasM, graphId[1]);
        compNum(historicalDetails1, historicalDetails2, "total", "number", canvasT, graphId[2]);
    });
    graphBtnPer.addEventListener('click', () => {
        renderDiv.style.display = "block";
        compNum(historicalDetails1, historicalDetails2, "Kvinner", "percent", canvasK, graphId[0]);
        compNum(historicalDetails1, historicalDetails2, "Menn", "percent", canvasM, graphId[1]);
        compNum(historicalDetails1, historicalDetails2, "total", "percent", canvasT, graphId[2]);
    });
}

/**
 * Destructure objects into Arrays
 * @param {object} graphObjOne 
 * @param {object} graphObjTwo 
 * @param {string} canvasId 
 * @param {string} sex 
 * @param {string} type 
 * @param {string} municipal1 
 * @param {string} municipal2 
 */
function graphMainComp(graphObjOne, graphObjTwo, canvasId, sex, type, municipal1, municipal2) {
    //destructuring
    const xValues = Object.keys(graphObjOne);
    const yValuesOne = Object.values(graphObjOne);
    const yValuesTwo = Object.values(graphObjTwo);
    /**
     * Map out the data for drawing
     * @param {Array} xAxisKeys 
     * @param {Array} yValuesOne 
     * @param {Array} yValuesTwo 
     */
    function mapDataGraph(xAxisKeys, yValuesOne, yValuesTwo) {
        
        /**
         * Finds max and min value in array.
         * normalises between 0-1
         * @param {Array} yAxisArray to be analysed
         * @returns {object} contains original and new data
         */
        function minMaxArray(yAxisArray) {
            maxVal = Math.max.apply(Math, yAxisArray);
            minVal = Math.min.apply(Math, yAxisArray);
            const normalized = yAxisArray.map(normalize2(minVal, maxVal));
            const yArray = [];
            normalized.forEach(function (item) {
                yArray.push(item * 100);
            });

            yArrays = {
                "orgArr": yAxisArray,
                "normArr": yArray,
                "maxValue": maxVal,
                "minValue": minVal
            };

            return yArrays;
        }

        xAxisArray(xAxisKeys);
        const arrObjectOne = minMaxArray(yValuesOne);
        const arrObjectTwo = minMaxArray(yValuesTwo);
        drawGraphComp(xAxisValues, arrObjectOne, arrObjectTwo);
    }
    /**
     * Draws the 2D canvas object based on the data retrieved
     * @param {Array} xAxisVal contains years for X axis
     * @param {Array} arrObjectOne first set of yValues
     * @param {Array} arrObjectTwo second set of yValues
     */
    function drawGraphComp(xAxisVal, arrObjectOne, arrObjectTwo) {
        const graphTotal = document.getElementById(canvasId);
        const ctx = graphTotal.getContext("2d");
        const plotOne = arrObjectOne.normArr;
        const plotTwo = arrObjectTwo.normArr;

        //Static values based on scale and size
        let columnSize = 58;
        let rowSize = 36;
        let margin = 0;
        let xAxis = xAxisVal;

        minValue = 0;
        maxValue = 100;
        increment = 10;
        let rectangles = xAxisVal.length - 1;

        //Gridscaling based on graph input length. 
        //Allows resisizing of window.
        let scaleForX = (graphTotal.width - rowSize + margin) / rectangles;
        let scaleForY = (graphTotal.height - columnSize - margin) / (maxValue - minValue);

        //plots each of the points(elements) in the Array to a line
        function plotData(toPlot) {
            ctx.beginPath();
            ctx.moveTo(0, toPlot[0]);
            for (i = 1; i < rectangles; i++) {
                ctx.lineTo(i * scaleForX, toPlot[i]);
            }
            ctx.stroke();
        }

        //graphStyling & text
        let graphType = type;
        if (graphType === "number") {
            graphType = "antall";
        } else {
            graphType = "prosent";
        }

        const graphSex = lowerCaseFirst(sex);
        ctx.font = "10px Arial";
        ctx.fillStyle = "#374C70";
        ctx.fillText("*normalisert (0-1)", 3, 14);
        ctx.font = "12px Arial";
        ctx.fillStyle = "#374C70";
        ctx.fillText(`Trend graf for sysselsatte ${graphSex} i ${graphType} `, 3, 28);
        ctx.font = "12px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(municipal1, 350, 14);
        ctx.font = "12px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(municipal2, 410, 14);
        ctx.font = "10px Arial";    //Font size, type
        ctx.fillStyle = "#374C70";  //Font color
        ctx.strokeStyle = "grey";   //Grid line color

        //Fills ArrayKeys on the X axis
        ctx.beginPath();
        for (i = 1; i <= rectangles; i++) {
            let x = i * scaleForX;
            ctx.fillText(xAxis[i], x, columnSize - (margin + 8));
            ctx.moveTo(x, columnSize);
            ctx.lineTo(x, graphTotal.height - margin);
        }

        //Fills ArrayKeyValues from the numbers array on the Y axis
        //Horizontal grid lines
        let yCount = 0;
        for (graphScale = maxValue; graphScale >= minValue; graphScale = graphScale - increment) {
            let y = columnSize + (scaleForY * yCount * increment);
            ctx.fillText(Math.trunc(graphScale), margin + 10, y + (margin));
            ctx.moveTo(rowSize, y);
            ctx.lineTo(graphTotal.width - 20, y);
            yCount++;
        }

        ctx.stroke();
        ctx.translate(rowSize, graphTotal.height + minValue * scaleForY);
        ctx.scale(1, -1 * scaleForY);

        ctx.strokeStyle = "red";
        plotData(plotOne);
        ctx.strokeStyle = "blue";
        plotData(plotTwo);

    }
    mapDataGraph(xValues, yValuesOne, yValuesTwo);
}
