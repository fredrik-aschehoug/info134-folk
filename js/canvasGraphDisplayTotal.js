function graphMainPercent(array, graphData) {
    const xValues = Object.keys(graphData.graphObjects[array[0]]);
    const yValues1 = Object.values(graphData.graphObjects[array[0]]);
    const yValues2 = Object.values(graphData.graphObjects[array[0]+1]);
    console.log(yValues2)

    function mapDataGraphTotal(xAxisKeys, yAxisArray, yAxisArray2, array) {
        array = array;
        let xAxisValues;

        function xAxisArray(xAxisKeys) {
            xAxisValues = xAxisKeys
            if (xAxisValues.length > 12) {
                xAxisValues.reverse();
                xAxisValues.length = 12;
                xAxisValues.reverse();
            } else if (xAxisValues.length === 11) {
                xAxisValues.push("2018")
            }
            return xAxisValues.unshift("")
        }; xAxisArray(xAxisKeys);


        function yReduceValues(yAxisArray) {
            newArr = []

            for (let i = 0; i < yAxisArray.length; i++) {
                if (yAxisArray[10] > 99999) {
                    newArr.push((yAxisArray[i] / 500));
                    reducedBy = 500;
                    lineWidth = 2.5;

                } else if (yAxisArray[10] > 50000) {
                    newArr.push((yAxisArray[i] / 500));
                    reducedBy = 500;
                    lineWidth = 2.5;

                } else if (yAxisArray[10] > 20000) {
                    newArr.push((yAxisArray[i] / 250));
                    reducedBy = 250;
                    lineWidth = 2.5;

                } else if (yAxisArray[10] > 9999) {
                    newArr.push((yAxisArray[i] / 100));
                    reducedBy = 100;
                    lineWidth = 2.5;
                    console.log(newArr)

                }else if (yAxisArray[10] > 4999) {
                    newArr.push((yAxisArray[i] / 10));
                    reducedBy = 10;
                    lineWidth = 2.5;
                    console.log(newArr)
                }
                else if (yAxisArray[10] < 5000 && yAxisArray[10] > 200) {
                    newArr.push((yAxisArray[i]));
                    reducedBy = 1;
                    lineWidth = 2.5;
                } else if (yAxisArray[10] < 201) {
                    newArr.push((yAxisArray[i]));
                    reducedBy = 1;
                    lineWidth = 1;
                }
            };
            let reducedData = {
                "originalArr": yAxisArray,
                "redData": newArr,
                "scaleUp": reducedBy,
                "lineWidth": lineWidth
            }
            return reducedData
        }


        function minMaxArrayPercent() {
            maxVal = 100;
            minVal = 0;

            let incrementVal = (maxVal - minVal) / 10;
            let minMaxObj = {
                "scaleUp": data["scaleUp"],
                "yAxisArray": data["redData"],
                "minValue": minVal,
                "maxValue": maxVal,
                "increment": incrementVal
            };
            return minMaxObj;

        }

        //let data = yReduceValues(yAxisArray)
        const arrObject = minMaxArrayPercent(data);
        const arrObject2 = minMaxArrayPercent(yAxisArray2);
        drawGraphPercent(xAxisValues, arrObject, array);
    };


    function drawGraphPercent(xAxisVal, arrayObj, array) {
        let graphTotal = document.getElementById("graphTotal");
        let ctx = graphTotal.getContext("2d");
        let plotTotal = arrayObj['yAxisArray']

        //Dynamic values based on Array content for dataset
        let columnSize = 68;
        let rowSize = 38;
        let margin = 8;
        let xAxis = xAxisVal



        minValue = arrayObj["minValue"];
        maxValue = arrayObj["maxValue"];
        increment = arrayObj["increment"];
        let rectangles = xAxisVal.length - 1;

        //Gridscaling based on graph input length
        let scaleForX = (graphTotal.width - rowSize + margin) / rectangles;
        let scaleForY = (graphTotal.height - columnSize - margin) / (maxValue - minValue);



        //plots each of the points(elements) in the Array to a line
        function plotData(toPlot) {
            ctx.lineWidth = arrayObj["lineWidth"];
            ctx.beginPath();
            ctx.moveTo(0, toPlot[0]);
            for (i = 1; i < rectangles; i++) {
                ctx.lineTo(i * scaleForX, toPlot[i])
            }
            ctx.stroke();
        }

        //graphStyling
        ctx.font = "20px Arial";
        ctx.fillText(array[1] + array[2], 3, 35); //mouseOver text on graph
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
        for (graphScale = (maxValue * arrayObj["scaleUp"]); graphScale >= (minValue * arrayObj["scaleUp"]); graphScale = graphScale - (increment * arrayObj["scaleUp"])) {
            let y = columnSize + (scaleForY * yCount * increment);
            ctx.fillText(graphScale, margin - 8, y + margin);
            ctx.moveTo(rowSize, y);
            ctx.lineTo(graphTotal.width - 20, y);
            yCount++;
        }

        ctx.stroke();
        ctx.translate(rowSize, graphTotal.height + minValue * scaleForY);
        ctx.scale(1, -1 * scaleForY);


        ctx.strokeStyle = "red";
        plotData(plotTotal);

    };
    
};