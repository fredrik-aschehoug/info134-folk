function createGraph(id) {

    function clickTrFunc(id, historicalDetails) {
        let graphData = graphRender(id);
        graphData = graphData;

        const canvas = document.createElement("canvas");
        canvas.style.display = "none";

        let nodeList = document.querySelectorAll(".mouseOver");
        let nodeArray = Array.from(nodeList);
        nodeArray.forEach((trTag) => {
            trTag.addEventListener('click', () => {
                let clickId = trTag.id;
                let clickClass = trTag.classList;
                document.getElementById(clickClass[2]).appendChild(canvas);
                //canvas properties
                canvas.width = 475;
                canvas.height = 275;
                canvas.id = "graphTotal";
                canvas.style.display = "block";
                const can = document.getElementById('graphTotal');
                can.classList.add('canvasGraph');
                const finalObject = init(clickId, clickClass, historicalDetails);
                //Pass graphObj to be drawn and run render animation
                can.classList.remove('afterTrans');
                //Draw graph and run show animation
                graphMain(finalObject);
                graphAnimation(can);
                setTimeout(function () {
                    can.classList.remove('transition');
                    can.classList.add('afterTrans');
                }, 500);
                can.addEventListener('click', () => {
                    can.classList.remove('transition');
                    can.remove(can);
            });
        });
    });
        return canvas;
    }
    // Placeholder to put content in
    const placeholderCanvas = document.getElementsByClassName("canvasDiv");
    // Data to use
    const historicalDetails = details.getHistorical(id);
    // Create items to append
    clickTrFunc(id, historicalDetails);
    // Clear placeholder
    removeChildNodes(placeholderCanvas[0]);
    
}

function graphMain(finalObj) {
    const xValues = Object.keys(finalObj.graphObj);
    const yValues = Object.values(finalObj.graphObj);
    if (yValues.length > 12) {
        yValues.reverse();
        yValues.length = 12;
        yValues.reverse();
    }

    function mapDataGraph(xAxisKeys, yAxisArray, finalObj) {
        array = finalObj;

        function xAxisArray(xAxisKeys) {
            xAxisValues = xAxisKeys;
            if (xAxisValues.length > 12) {
                xAxisValues.reverse();
                xAxisValues.length = 12;
                xAxisValues.reverse();
            } else if (xAxisValues.length === 11) {
                xAxisValues.push("2018");
            }
            return xAxisValues.unshift("");
        }


        function yReduceValues(yAxisArray) {
            newArr = [];

            for (let i = 0; i < yAxisArray.length; i++) {

                if (yAxisArray[10] > 250000) {
                    newArr.push((yAxisArray[i] / 1000));
                    reducedBy = 1000;
                    lineWidth = 2;
                } else if (yAxisArray[10] > 99999) {
                    newArr.push((yAxisArray[i] / 500));
                    reducedBy = 500;
                    lineWidth = 2;

                } else if (yAxisArray[10] > 50000) {
                    newArr.push((yAxisArray[i] / 500));
                    reducedBy = 500;
                    lineWidth = 2;

                } else if (yAxisArray[10] > 20000) {
                    newArr.push((yAxisArray[i] / 250));
                    reducedBy = 250;
                    lineWidth = 1;

                } else if (yAxisArray[10] > 9999) {
                    newArr.push((yAxisArray[i] / 100));
                    reducedBy = 100;
                    lineWidth = 2.5;

                } else if (yAxisArray[10] > 4999) {
                    newArr.push((yAxisArray[i] / 10));
                    reducedBy = 10;
                    lineWidth = 2.5;

                } else if (yAxisArray[10] < 5000 && yAxisArray[10] > 200) {
                    newArr.push((yAxisArray[i]));
                    reducedBy = 1;
                    lineWidth = 2.5;

                } else if (yAxisArray[10] < 201 && yAxisArray[10] > 99) {
                    newArr.push((yAxisArray[i]));
                    reducedBy = 1;
                    lineWidth = 1;

                } else if (yAxisArray[10] < 100) {
                    newArr.push((yAxisArray[i]) * 10);
                    reducedBy = 0.1;
                    lineWidth = 1;
                }
            }
            let reducedData = {
                "originalArr": yAxisArray,
                "redData": newArr,
                "scaleUp": reducedBy,
                "lineWidth": lineWidth
            };
            return reducedData;
        }


        function minMaxArray(yAxisArray) {
            let data = yReduceValues(yAxisArray);
            let arrayMax = Math.max.apply(Math, data.redData);
            let arrayMin = Math.min.apply(Math, data.redData);

            arrayMaxInt = Math.round(arrayMax / 10) * 10;
            maxVal = arrayMaxInt + (Math.ceil((arrayMaxInt * 0.05) / 10) * 10);

            arrayMinInt = Math.round(arrayMin / 10) * 10;
            minVal = arrayMinInt - (Math.round((arrayMaxInt) * 0.1 / 10) * 10);
            minVal = Math.round(minVal / 10) * 10;
            if (maxVal === minVal) {
                minVal = maxVal - 15;
            }

            let incrementVal = (maxVal - minVal) / 10;
            let minMaxObj = {
                "scaleUp": data.scaleUp,
                "yAxisArray": data.redData,
                "minValue": minVal,
                "maxValue": maxVal,
                "increment": incrementVal
            };
            return minMaxObj;
        }
        xAxisArray(xAxisKeys);
        let arrObject = minMaxArray(yAxisArray);
        drawGraphNumbers(xAxisValues, arrObject, finalObj.graphInfo);
    }


    function drawGraphNumbers(xAxisVal, arrayObj, array) {

        let graphTotal = document.getElementById("graphTotal");
        let ctx = graphTotal.getContext("2d");
        let plotTotal = arrayObj.yAxisArray;
        //Dynamic values based on Array content for dataset
        let columnSize = 58;
        let rowSize = 36;
        let margin = 8;
        let xAxis = xAxisVal;

        //get properties from arrayObj
        minValue = arrayObj.minValue;
        maxValue = arrayObj.maxValue;
        increment = arrayObj.increment;
        let rectangles = xAxisVal.length - 1;

        //Gridscaling based on graph input length
        let scaleForX = (graphTotal.width - rowSize + margin) / rectangles;
        let scaleForY = (graphTotal.height - columnSize - margin) / (maxValue - minValue);

        //plots each of the points(elements) in the Array to a line
        function plotData(toPlot) {
            ctx.lineWidth = arrayObj.lineWidth;
            ctx.beginPath();
            ctx.moveTo(0, toPlot[0]);
            for (i = 1; i < rectangles; i++) {
                ctx.lineTo(i * scaleForX, toPlot[i]);
            }
            ctx.stroke();
        }

        //graphStyling
        const graphTexting = graphText(array);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#374C70";
        ctx.fillText(graphTexting[2] + " " + graphTexting[1] + " " + graphTexting[0], 3, 28); //mouseOver text on graph
        ctx.font = "10px Arial";    //Font size, type
        ctx.fillStyle = "#374C70";  //Font color
        ctx.strokeStyle = "grey";   //Grid line color

        //Fills ArrayKeys on the X axis 
        ctx.beginPath();
        for (i = 1; i <= rectangles; i++) {
            let x = i * scaleForX;
            ctx.fillText(xAxis[i], x, columnSize - margin);
            ctx.moveTo(x, columnSize);
            ctx.lineTo(x, graphTotal.height - margin);
        }

        //Fills ArrayKeyValues from the numbers array on the Y axis
        //Horizontal grid lines
        let yCount = 0;
        for (graphScale = (maxValue * arrayObj.scaleUp); graphScale >= (minValue * arrayObj.scaleUp); graphScale = graphScale - (increment * arrayObj.scaleUp)) {
            let y = columnSize + (scaleForY * yCount * increment);
            ctx.fillText(Math.trunc(graphScale), margin - 9, y + margin);
            ctx.moveTo(rowSize, y);
            ctx.lineTo(graphTotal.width - 20, y);
            yCount++;
        }

        ctx.stroke();
        ctx.translate(rowSize, graphTotal.height + minValue * scaleForY);
        ctx.scale(1, -1 * scaleForY);

        ctx.strokeStyle = "red";
        plotData(plotTotal);

    }
    mapDataGraph(xValues, yValues, finalObj);
}

