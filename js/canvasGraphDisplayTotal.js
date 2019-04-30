




function graphMainPercent(kvinnerIndex, mennIndex, graphData) {


    function mapDataGraphTotal(xAxisKeys, yAxisArray) {
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
        };

        xAxisArray(xAxisKeys);

        function yReduceValues(yAxisArray) {
            newArr = []
            
            for (let i = 0; i < yAxisArray.length; i++) {
                if (yAxisArray[10] > 99999) {
                    newArr.push((yAxisArray[i] / 1000))
                    reducedBy = 1000
                }
                else if (yAxisArray[10] > 9999) {
                    newArr.push((yAxisArray[i] / 100))
                    reducedBy = 100
                }
                else if (yAxisArray[10] > 999) {
                    newArr.push((yAxisArray[i] / 10))
                    reducedBy = 10
                }
            };
            let reducedData = {
                "originalArr": yAxisArray,
                "redData": newArr,
                "scaleUp": reducedBy
            }
            return reducedData
        }
           

        function minMaxArray(yAxisArray) {
            let data = yReduceValues(yAxisArray)

            let arrayMax = Math.max.apply(Math, data["redData"])
            let arrayMin = Math.min.apply(Math, data["redData"]);
            arrayMaxInt = Math.ceil(arrayMax / 10) * 10;
            maxVal = arrayMaxInt + (Math.ceil((arrayMaxInt * 0.15) / 10) * 10);

            arrayMinInt = Math.round(arrayMin / 10) * 10;
            minVal = arrayMinInt - (Math.round((arrayMaxInt) * 0.15 / 10) * 10);
            minVal = Math.round(minVal / 10) * 10;
            if (maxVal === minVal) {
                minVal = maxVal - 20;
            }

            let incrementVal = (maxVal - minVal) / 10;
            let minMaxObj = {
                "scaleUp" : data["scaleUp"],
                "yAxisArray": data["redData"],
                "minValue": minVal,
                "maxValue": maxVal,
                "increment": incrementVal
            };
            return minMaxObj;
        }

        let arrObject = minMaxArray(yAxisArray)
        drawGraphTotal(xAxisValues, arrObject);
    };


    function drawGraphTotal(xAxisVal, arrayObj) {
        let graphTotal = document.getElementById("graphTotal");
        let ctx = graphTotal.getContext("2d");
        let plotTotal = arrayObj['yAxisArray']

        //Dynamic values based on Array content for dataset
        let columnSize = 28;
        let rowSize = 38;
        let margin = 8;
        let xAxis = xAxisVal



        minValue = arrayObj["minValue"];
        maxValue = arrayObj["maxValue"];
        increment = arrayObj["increment"]
        console.log(minValue)
        console.log(maxValue)
        console.log(increment)
        let rectangles = xAxisVal.length - 1;

        //Gridscaling based on graph input length
        let scaleForX = (graphTotal.width - rowSize + margin) / rectangles;
        let scaleForY = (graphTotal.height - columnSize - margin) / (maxValue - minValue);
        


        //plots each of the points(elements) in the Array to a line
        function plotData(toPlot) {

            ctx.beginPath();
            ctx.lineWidth = -2;
            ctx.moveTo(0, toPlot[0]);
            for (i = 1; i < rectangles; i++) {
                ctx.lineTo(i * scaleForX, toPlot[i])
            }
            ctx.stroke();
        }

        //graphStyling
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
        for (graphScale = (maxValue*arrayObj["scaleUp"]); graphScale >= (minValue*arrayObj["scaleUp"]); graphScale = graphScale - (increment*arrayObj["scaleUp"])) {
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
    mapDataGraphTotal(Object.keys(graphData.graphObjects[arrayIndex]), Object.values(graphData.graphObjects[arrayIndex]));
};