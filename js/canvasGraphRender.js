


function graphRender(id) {
    const historicalDetails = details.getHistorical(id)

    const graphDataObject = {
    "elementIDmapNum": {
        "popKvinner": [0, "Befolkning: ", "antall kvinner", "populationId"],
        "popMenn": [1, "Befolkning: ", "antall menn", "populationId"],
        "popTotal": [2, "Befolkning: ", "antall totalt", "populationId"],
        "empKvinner": [3, "Sysselsetting: ", "antall kvinner", "employmentId"],
        "empMenn": [4, "Sysselsetting: ", "antall menn", "employmentId"],
        "empTotal": [5, "Sysselsetting: ", "antall totalt", "employmentId"],
        "highEduKvinner": [6, "Høyere utdannelse: ", "antall kvinner", "highEduId"],
        "highEduMenn": [7, "Høyere utdannelse: ", "antall menn", "highEduId"],
        "highEduTotal": [8, "Høyere utdannelse: ", "antall totalt", "highEduId"],
        "fagskoleKvinner": [9, "Fagskole: ", "antall kvinner", "fagskoleId"],
        "fagskoleMenn": [10, "Fagskole: ", "antall menn", "fagskoleId"],
        "fagskoleTotal": [11, "Fagskole: ", "antall totalt", "fagskoleId"],
        "highEduShortK": [12, "Høyere utdannelse kort: ", "antall kvinner", "highEduShortId"],
        "highEduShortM": [13, "Høyere utdannelse kort: ", "antall menn", "highEduShortId"],
        "highEduShortTot": [14, "Høyere utdannelse kort: ", "antall totalt", "highEduShortId"],
        "highEduLongK": [15, "Høyere utdannelse lang: ", "antall kvinner", "highEduLongId"],
        "highEduLongM": [16, "Høyere utdannelse lang: ", "antall menn", "highEduLongId"],
        "highEduLongTot": [17, "Høyere utdannelse lang: ", "antall totalt", "highEduLongId"],
    },
    "elementIDmapPercent": {
        "population": [18, "Befolkning: ", "kvinner i prosent"],
        "popMennPercent": [19, "Befolkning: ", "menn i prosent"],
        "empKvinnerPercent": [20, "Sysselsetting: ", "kvinner i prosent"],
        "empMennPercent": [21, "Sysselsetting: ", "menn i prosent"],
        "empTotalPercent": [22, "Sysselsetting: ", "totalt i prosent"],
        "highEduKvinnerPercent": [23, "Høyere utdannelse: ", "kvinner i prosent"],
        "highEduMennPercent": [24, "Høyere utdannelse: ", "menn i prosent"],
        "highEduTotalPercent": [25, "Høyere utdannelse: ", "totalt i prosent"],
        "fagskoleKvinnerPercent": [26, "Fagskole: ", "kvinner i prosent"],
        "fagskoleMennPercent": [27, "Fagskole: ", "menn i prosent"],
        "fagskoleTotalPercent": [28, "Fagskole: ", "totalt i prosent"],
        "highEduShortKPercent": [29, "Høyere utdannelse kort: ", "kvinner i prosent"],
        "highEduShortMPercent": [30, "Høyere utdannelse kort: ", "menn i prosent"],
        "highEduShortTotPercent": [31, "Høyere utdannelse kort: ", "totalt i prosent"],
        "highEduLongKPercent": [32, "Høyere utdannelse lang: ", "kvinner i prosent"],
        "highEduLongMPercent": [33, "Høyere utdannelse lang: ", "menn i prosent"],
        "highEduLongTotPercent": [34, "Høyere utdannelse lang: ", "totalt i prosent"]
    },
    "elementIdArrays": [
        ["popKvinner",
            "popMenn",
            "popTotal",
            "popKvinnerPercent",
            "popMennPercent",
            "empKvinner",
            "empMenn",
            "empTotal",
            "empKvinnerPercent",
            "empMennPercent",
            "empTotalPercent",
            "highEduKvinner",
            "highEduMenn",
            "highEduTotal",
            "highEduKvinnerPercent",
            "highEduMennPercent",
            "HighEduTotalPercent",
            "fagskoleKvinner",
            "fagskoleMenn",
            "fagskoleTotal",
            "fagskoleKvinnerPercent",
            "fagskoleMennPercent",
            "fagskoleTotalPercent",
            "highEduShortK",
            "highEduShortM",
            "highEduShortTot",
            "highEduShortKPercent",
            "highEduShortMPercent",
            "highEduShortTotPercent",
            "highEduLongK",
            "highEduLongM",
            "highEduLongTot",
            "highEduLongKPercent",
            "highEduLongMPercent",
            "highEduLongTotPercent",],
        ["population",
            "employment",
            "highEdu",
            "fagskole",
            "highEduShort",
            "highEduLong"],
            ["populationId",
            "employmentId",
            "highEduId",
            "fagskoleId",
            "highEduShortId",
            "highEduLongId"]],
    "graphObjects": [historicalDetails.population.number.Kvinner,
    historicalDetails.population.number.Menn,
    historicalDetails.population.number.total,

    historicalDetails.employment.number.Kvinner,
    historicalDetails.employment.number.Menn,
    historicalDetails.employment.number.total,

    historicalDetails.education.number["12"].Kvinner,
    historicalDetails.education.number["12"].Menn,
    historicalDetails.education.number["12"].total,

    historicalDetails.education.number["11"].Kvinner,
    historicalDetails.education.number["11"].Menn,
    historicalDetails.education.number["11"].total,

    historicalDetails.education.number["03a"].Kvinner,
    historicalDetails.education.number["03a"].Menn,
    historicalDetails.education.number["03a"].total,

    historicalDetails.education.number["04a"].Kvinner,
    historicalDetails.education.number["04a"].Menn,
    historicalDetails.education.number["04a"].total,

    historicalDetails.population.percent.Kvinner,
    historicalDetails.population.percent.Menn,

    historicalDetails.employment.percent.Kvinner,
    historicalDetails.employment.percent.Menn,
    historicalDetails.employment.percent.total,

    historicalDetails.education.percent["12"].Kvinner,
    historicalDetails.education.percent["12"].Menn,
    historicalDetails.education.percent["12"].total,

    historicalDetails.education.percent["11"].Kvinner,
    historicalDetails.education.percent["11"].Menn,
    historicalDetails.education.percent["11"].total,

    historicalDetails.education.percent["03a"].Kvinner,
    historicalDetails.education.percent["03a"].Menn,
    historicalDetails.education.percent["03a"].total,

    historicalDetails.education.number["04a"].Kvinner,
    historicalDetails.education.number["04a"].Menn,
    historicalDetails.education.number["04a"].total]

}
    
    return graphDataObject
}

    


    function mouseOverFunc(id) {
        
        let graphData = graphRender(id);
        setHtmlIds('.graphPointer', graphData.elementIdArrays, 2)
        //loop through <tr> tags of detailsOutput <div>
        let trTags = document.getElementsByTagName("tr");
        for (let i = 0; i < trTags.length; i++) {
            let str = trTags[i].id;
            //run these functions on <tr> tags mouseOver if they exist in graphObj
            if (graphData.elementIDmapNum.hasOwnProperty(str)) {
                trTags[str].onmouseover = function () {
                    const canvas = document.createElement("canvas");
                    document.getElementById(graphData.elementIDmapNum[str][3]).appendChild(canvas)
                    canvas.id = "graphTotal";
                    canvas.width = 500;
                    canvas.height = 300;
                    let can = document.getElementById('graphTotal');
                    can.classList.add('canvasGraph');
                    
                    graphMainNum(graphData.elementIDmapNum[str], graphData), showDarkBackground(str), graphAnimation(can);
                }
                trTags[str].onmouseout = function () {
                    can = document.getElementById("graphTotal"),  mouseOut(str, can, id) }
            }
        }



        function setHtmlIds(className, objectRef, ArrIndex) {

            let elements = document.querySelectorAll(className);
            for (let i = 0; i < elements.length; i++) {
                elements[i].id = objectRef[ArrIndex][i]
            }
    
        }; setHtmlIds('.mouseOver', graphData.elementIdArrays, 0);
        

        function percentMouseOver(id) {
            console.log(graphData)
            //canvas tag properties
            const canvas = document.createElement("canvas");
            canvas.id = "graphTotal";
            canvas.width = 500;
            canvas.height = 300;
            document.getElementById("graph").appendChild(canvas);
            let can = document.getElementById('graphTotal');
            can.classList.add('canvasGraph');
            console.log("hello")

            let tables = document.getElementsByTagName("table")
            for (let j = 0; j < tables.length; j++) {
                console.log(tables[j].id)
                let str = tables[j].id;
                
                if (graphData.elementIDmapPercent.hasOwnProperty(str)) {
                    tables[str].onmouseover = function () {console.log("dick"), graphMainPercent(graphData.elementIDmapPercent[str], graphData.elementIDmapPercent[str] + 1, graphData), showDarkBackground(str), graphAnimation(can); }
                    tables[str].onmouseout = function () { mouseOut(str, can, id) }
                }
            }
        }
        document.getElementById("populationToggle-prosent").addEventListener("click", function (id) {
            setHtmlIds('.activeTable', graphData.elementIdArrays, 1),
            percentMouseOver(id)
        });
    };



    function setHtmlIds(className, objectRef, ArrIndex) {

        let elements = document.querySelectorAll(className);
        for (let i = 0; i < elements.length; i++) {
            elements[i].id = objectRef[ArrIndex][i]
        }

    };




    


    function graphAnimation(className) {
        canvas = className
        canvas.classList.add('transition')
        let compStyle = window.getComputedStyle(canvas),
            marginLeft = compStyle.getPropertyValue('margin-right');
        canvas.style.marginLeft = marginLeft;
    }

    function showDarkBackground(rowID) {
        let x = document.getElementById("graphTotal")
        x.style.visibility = "visible";
        document.getElementById(rowID).style.backgroundColor = "#374C70"
        document.getElementById(rowID).style.color = "#F4F4F4"
    };

    function mouseOut(rowID, className, id) {
        canvas = className
        console.log("all good")

        //canvas.classList.remove('transition')
        document.getElementById(rowID).style.color = "#24201D";
        let node = document.getElementById("graphTotal");
        let table = document.getElementById(rowID)
        let targetID = table.querySelectorAll('tr > td:first-child');

        for (let i = 0; i < targetID.length; i++) {
            let td = targetID[i]
            if (td.innerHTML.trim() === "Menn") {
                document.getElementById(rowID).style.backgroundColor = "#DADEE5";

            } else {
                document.getElementById(rowID).style.backgroundColor = "#F4F4F4";
            }
        }
        if (node.parentNode) {
            node.parentNode.removeChild(node)
            mouseOverFunc(id);
        }
    }
    //window.onscroll = mouseOverFunc(id, graphData)
    //document.getElementById("populationToggle-prosent").addEventListener("click", function () {
        
    //})
//};








function graphMainNum(array, graphData) {
    const xValues = Object.keys(graphData.graphObjects[array[0]])
    const yValues = Object.values(graphData.graphObjects[array[0]])

    function mapDataGraph(xAxisKeys, yAxisArray, array) {
        array = array;
        let xValues;

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

                } else if (yAxisArray[10] > 4999) {
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


        function minMaxArray(yAxisArray) {
            let data = yReduceValues(yAxisArray)
            let arrayMax = Math.max.apply(Math, data["redData"])
            let arrayMin = Math.min.apply(Math, data["redData"]);

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
            console.log(minMaxObj)
            return minMaxObj;

        }

        let arrObject = minMaxArray(yAxisArray)
        drawGraphNumbers(xAxisValues, arrObject, array);
    };


    function drawGraphNumbers(xAxisVal, arrayObj, array) {
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
    mapDataGraph(xValues, yValues, array);
};