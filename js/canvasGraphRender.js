


function graphRender(id) {
    id = id;



    const graphDataObject = {
        "elementIDmapNum": {
            "popKvinner": ["Befolkning: ", "antall kvinner", "populationId"],
            "popMenn": ["Befolkning: ", "antall menn", "populationId"],
            "popTotal": ["Befolkning: ", "antall totalt", "populationId"],
            "empKvinner": ["Sysselsetting: ", "antall kvinner", "employmentId"],
            "empMenn": ["Sysselsetting: ", "antall menn", "employmentId"],
            "empTotal": ["Sysselsetting: ", "antall totalt", "employmentId"],
            "highEduKvinner": ["Høyere utdannelse: ", "antall kvinner", "highEduId"],
            "highEduMenn": ["Høyere utdannelse: ", "antall menn", "highEduId"],
            "highEduTotal": ["Høyere utdannelse: ", "antall totalt", "highEduId"],
            "fagskoleKvinner": ["Fagskole: ", "antall kvinner", "fagskoleId"],
            "fagskoleMenn": ["Fagskole: ", "antall menn", "fagskoleId"],
            "fagskoleTotal": ["Fagskole: ", "antall totalt", "fagskoleId"],
            "highEduShortK": ["Høyere utdannelse kort: ", "antall kvinner", "highEduShortId"],
            "highEduShortM": ["Høyere utdannelse kort: ", "antall menn", "highEduShortId"],
            "highEduShortTot": ["Høyere utdannelse kort: ", "antall totalt", "highEduShortId"],
            "highEduLongK": ["Høyere utdannelse lang: ", "antall kvinner", "highEduLongId"],
            "highEduLongM": ["Høyere utdannelse lang: ", "antall menn", "highEduLongId"],
            "highEduLongTot": ["Høyere utdannelse lang: ", "antall totalt", "highEduLongId"],
        },
        "elementIDmapPercent": {
            "population": ["Befolkning: ", "kvinner i prosent"],
            "popMennPercent": ["Befolkning: ", "menn i prosent"],
            "empKvinnerPercent": ["Sysselsetting: ", "kvinner i prosent"],
            "empMennPercent": ["Sysselsetting: ", "menn i prosent"],
            "empTotalPercent": ["Sysselsetting: ", "totalt i prosent"],
            "highEduKvinnerPercent": ["Høyere utdannelse: ", "kvinner i prosent"],
            "highEduMennPercent": ["Høyere utdannelse: ", "menn i prosent"],
            "highEduTotalPercent": ["Høyere utdannelse: ", "totalt i prosent"],
            "fagskoleKvinnerPercent": ["Fagskole: ", "kvinner i prosent"],
            "fagskoleMennPercent": ["Fagskole: ", "menn i prosent"],
            "fagskoleTotalPercent": ["Fagskole: ", "totalt i prosent"],
            "highEduShortKPercent": ["Høyere utdannelse kort: ", "kvinner i prosent"],
            "highEduShortMPercent": ["Høyere utdannelse kort: ", "menn i prosent"],
            "highEduShortTotPercent": ["Høyere utdannelse kort: ", "totalt i prosent"],
            "highEduLongKPercent": ["Høyere utdannelse lang: ", "kvinner i prosent"],
            "highEduLongMPercent": ["Høyere utdannelse lang: ", "menn i prosent"],
            "highEduLongTotPercent": ["Høyere utdannelse lang: ", "totalt i prosent"]
        },
        "elementIdArrays": [
            ["popKvinner", "popMenn", "popTotal", "popKvinnerPercent", "popMennPercent", "empKvinner", "empMenn",
                "empTotal", "empKvinnerPercent", "empMennPercent", "empTotalPercent", "highEduKvinner", "highEduMenn",
                "highEduTotal", "highEduKvinnerPercent", "highEduMennPercent", "HighEduTotalPercent", "fagskoleKvinner",
                "fagskoleMenn", "fagskoleTotal", "fagskoleKvinnerPercent", "fagskoleMennPercent", "fagskoleTotalPercent",
                "highEduShortK", "highEduShortM", "highEduShortTot", "highEduShortKPercent", "highEduShortMPercent",
                "highEduShortTotPercent", "highEduLongK", "highEduLongM", "highEduLongTot", "highEduLongKPercent",
                "highEduLongMPercent", "highEduLongTotPercent",],
            ["populationID",
                "employmentID",
                "highEduID",
                "fagskoleID",
                "highEduShortID",
                "highEduLongID"],
            ["population",
                "employment",
                "education",
                "education",
                "education",
                "education"],
            ["population",
                "employment",
                "education",
                "education",
                "education",
                "education",]],
        "elementIdObj": [" number",
            " number",
            " number",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent"],
        "elementIdObj2": ["", "", "", "", "", "", "", "", "", "",
            "", " 12", " 12", " 12", " 12", " 12", " 12", " 11", " 11", " 11",
            " 11", " 11", " 11", " 03a", " 03a", " 03a", " 03a", " 03a", " 03a", " 04a",
            " 04a", " 04a", " 04a", " 04a", " 04a"],
        "elementIdObj3": [
            " population", " population", " population", " population", " population",
            " employment", " employment", " employment", " employment", " employment", " employment",
            " education", " education", " education", " education", " education", " education",
            " education", " education", " education", " education", " education", " education",
            " education", " education", " education", " education", " education", " education",
            " education", " education", " education", " education", " education", " education",]
    };
    setHtmlIds('.graphPointer', graphDataObject.elementIdArrays, 2);
    setHtmlIds('.mouseOver', graphDataObject.elementIdArrays, 0);
    setHtmlIds('.canvasDiv', graphDataObject.elementIdArrays, 3)
    setHtmlClass(".mouseOver", graphDataObject.elementIdObj);
    setHtmlClass(".mouseOver", graphDataObject.elementIdObj3);
    setHtmlClass(".mouseOver", graphDataObject.elementIdObj2);
    return graphDataObject;
}






function createGraph(id) {


    function clickTrFunc(id, historicalDetails) {
        let graphData = graphRender(id);
        const canvas = document.createElement("canvas");
        canvas.style.display = "none";
        //document.getElementsByID("canvasDiv").appendChild(canvas);


        const trTags = document.getElementsByTagName("tr");
        for (let i = 0; i < trTags.length; i++) {
            let str = trTags[i].id;
            if (graphData.elementIDmapNum.hasOwnProperty(str)) {
                trTags[str].onclick = function () {
                    let clickId = this.id;
                    let clickClass = this.classList;
                    document.getElementById(clickClass[2]).appendChild(canvas);
                    //canvas properties
                    canvas.id = "graphTotal";
                    canvas.width = 500;
                    canvas.height = 300;
                    canvas.style.display = "block";
                    let can = document.getElementById('graphTotal');
                    can.classList.add('canvasGraph');
                    const finalObject = init(clickId, clickClass, historicalDetails);
                    graphMainNum(finalObject), graphAnimation(can);
                };
            }
        }
        return canvas;
    }
    // Placeholder to put content in
    const placeholderCanvas = document.getElementsByClassName("canvasDiv");
    // Data to use
    const historicalDetails = details.getHistorical(id);
    // Create items to append
    const historicalDetailsObject = clickTrFunc(id, historicalDetails);
    // Clear placeholder
    removeChildNodes(placeholderCanvas[0]);
    // Append item to placeholder
    placeholderCanvas[0].appendChild(historicalDetailsObject);
}






function createCanvas() {

    const canvasDiv = document.getElementsByClassName("graphPointer");
    for (let j = 0; j < canvasDiv.length; j++) {
        let divTag = document.createElement("div");
        canvasDiv[j].appendChild(divTag).classList.add("canvasDiv")
    }
}



function getDataFromID(hoverId, clickClass) {
    let graphArr = [];
    let elements = Array.from(clickClass);
    let tdTag = document.querySelector("#" + hoverId).children[0].textContent;
    if (tdTag === "Begge kjønn") {
        tdTag = "total";
    }
    graphArr.push(tdTag, elements[1], elements[2], elements[3]);
    return graphArr;
}



function init(clickId, clickClass, historicalDetails) {
    let keyWords = getDataFromID(clickId, clickClass);
    if (keyWords[3] === undefined) {
        keyWords.pop();
    }
    if (keyWords.length < 4) {
        let graphObject = historicalDetails[keyWords[2]];
        let graphObjectX = graphObject[keyWords[1]];
        let graphObjectY = graphObjectX[keyWords[0]];
        return graphObjectY;
    }
    else {
        let graphObject = historicalDetails[keyWords[2]];
        let graphObjectX = graphObject[keyWords[1]];

        let graphObjectZ = graphObjectX[keyWords[3]];
        let graphObjectK = graphObjectZ[keyWords[0]]
        return graphObjectK;
    }
}



function setHtmlIds(className, objectRef, ArrIndex) {

    let elements = document.querySelectorAll(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].id = objectRef[ArrIndex][i];
    }

}

function setHtmlClass(className, objectRef) {
    let classArray = objectRef;
    let elements = document.querySelectorAll(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].className += classArray[i];
    }
}


function graphAnimation(className) {
    canvas = className;
    canvas.classList.add('transition');
    let compStyle = window.getComputedStyle(canvas),
        marginLeft = compStyle.getPropertyValue('margin-right');
    canvas.style.marginLeft = marginLeft;
}



function graphMainNum(array) {
    const xValues = Object.keys(array);
    const yValues = Object.values(array);

    function mapDataGraph(xAxisKeys, yAxisArray, array) {
        array = array;
        let xValues;

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
        } xAxisArray(xAxisKeys);


        function yReduceValues(yAxisArray) {
            newArr = [];

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

                } else if (yAxisArray[10] > 4999) {
                    newArr.push((yAxisArray[i] / 10));
                    reducedBy = 10;
                    lineWidth = 2.5;

                } else if (yAxisArray[10] < 5000 && yAxisArray[10] > 200) {
                    newArr.push((yAxisArray[i]));
                    reducedBy = 1;
                    lineWidth = 2.5;

                } else if (yAxisArray[10] < 201) {
                    newArr.push((yAxisArray[i]));
                    reducedBy = 1;
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
                "scaleUp": data["scaleUp"],
                "yAxisArray": data["redData"],
                "minValue": minVal,
                "maxValue": maxVal,
                "increment": incrementVal
            };
            return minMaxObj;
        }

        let arrObject = minMaxArray(yAxisArray);
        drawGraphNumbers(xAxisValues, arrObject, array);
    }


    function drawGraphNumbers(xAxisVal, arrayObj, array) {
        let graphTotal = document.getElementById("graphTotal");
        let ctx = graphTotal.getContext("2d");
        let plotTotal = arrayObj.yAxisArray;

        //Dynamic values based on Array content for dataset
        let columnSize = 68;
        let rowSize = 38;
        let margin = 8;
        let xAxis = xAxisVal;



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
        ctx.font = "18px Arial";
        ctx.fillStyle = "#374C70";
        ctx.fillText(array[0] + array[1], 3, 35); //mouseOver text on graph
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

    }
    mapDataGraph(xValues, yValues, array);
}

/*["populationId",
                "employmentId",
                "highEduId",
                "fagskoleId",
                "highEduShortId",
                "highEduLongId"]],*/