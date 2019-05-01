
//test

function graphRender(id) {
    const historicalDetails = details.getHistorical(id)
    
    const graphData = {
        "elementIDmapNum": {
            "popKvinner": [0, "Befolkning: ", "antall kvinner"],
            "popMenn": [1, "Befolkning: ", "antall menn"],
            "popTotal": [2, "Befolkning: ", "antall totalt"],
            "empKvinner": [3, "Sysselsetting: ", "antall kvinner"],
            "empMenn": [4, "Sysselsetting: ", "antall menn"],
            "empTotal": [5, "Sysselsetting: ", "antall totalt"],
            "highEduKvinner": [6, "Høyere utdannelse: ", "antall kvinner"],
            "highEduMenn": [7, "Høyere utdannelse: ", "antall menn"],
            "highEduTotal": [8, "Høyere utdannelse: ", "antall totalt"],
            "fagskoleKvinner" : [9, "Fagskole: ", "antall kvinner"],
            "fagskoleMenn" : [10, "Fagskole: ", "antall menn"],
            "fagskoleTotal" : [11, "Fagskole: ", "antall totalt"],
            "highEduShortK" : [12, "Høyere utdannelse kort: ", "antall kvinner"],
            "highEduShortM" : [13, "Høyere utdannelse kort: ", "antall menn"],
            "highEduShortTot" : [14, "Høyere utdannelse kort: ", "antall totalt"],
            "highEduLongK" : [15, "Høyere utdannelse lang: ", "antall kvinner"],
            "highEduLongM" : [16, "Høyere utdannelse lang: ", "antall menn"],
            "highEduLongTot" : [17, "Høyere utdannelse lang: ", "antall totalt"],
        }, 
        "elementIDmapPercent": {
            "popKvinnerPercent" : 18,
            "popMennPercent": 19,
            "empKvinnerPercent": 20,
            "empMennPercent": 21,
            "empTotalPercent": 22,
            "highEduKvinnerPercent": 23,
            "highEduMennPercent": 24,
            "highEduTotalPercent": 25,
            "fagskoleKvinnerPercent" : 26,
            "fagskoleMennPercent" : 27,
            "fagskoleTotalPercent" : 28,
            "highEduShortKPercent" : 29,
            "highEduShortMPercent" : 30,
            "highEduShortTotPercent" : 31,
            "highEduLongKPercent" : 32,
            "highEduLongMPercent" : 33,
            "highEduLongTotPercent" : 34
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
                "highEduLong"]],
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


    function mouseOverFunc(id) {
        //canvas tag properties
        const canvas = document.createElement("canvas");
        canvas.id = "graphTotal";
        canvas.width = 500;
        canvas.height = 300;
        document.getElementById("graph").appendChild(canvas);
        let can = document.getElementById('graphTotal');
        can.classList.add('canvasGraph');

        //loop through <tr> tags and apply mouseOver/Out functions
        let trTags = document.getElementsByTagName("tr");
        
        for (let i = 0; i < trTags.length; i++) {
            let str = trTags[i].id;
            if (graphData.elementIDmapNum.hasOwnProperty(str)) {
                trTags[str].onmouseover = function () {graphMainNum(graphData.elementIDmapNum[str], graphData), showDarkBackground(str), graphAnimation(can); }
                trTags[str].onmouseout = function () { mouseOut(str, can, id) }
            }
        }

        function percentMouseOver(id) {
            let tables = document.getElementsByTagName("tables")
            for (let j = 0; j < tables.length; j++) {
                let str = tables[j].id;
                if (graphData.elementIDmapPercent.hasOwnProperty(str)) {
                    tables[str].onmouseover = function () {graphMainPercent(graphData.elementIDmapPercent[str], graphData), showDarkBackground(str), graphAnimation(can); }
                    tables[str].onmouseout = function () { mouseOut(str, can, id) }
                }
            }
        }
        document.getElementById("populationToggle-prosent").addEventListener("click", function(id) {
            percentMouseOver(id)
        });
    };



    function getHtmlName() {
        let x = document.getElementsByTagName("a")
        //console.log(x["name"])
        for(let i = 0; i <x.length; i++) {
        //}
        } 
    }  
    getHtmlName();

    function setHtmlIds(className, objectRef, ArrIndex) {

        let elements = document.querySelectorAll(className);
        for (let i = 0; i < elements.length; i++) {
            elements[i].id = objectRef[ArrIndex][i]
        }
        
    }; setHtmlIds('.mouseOver', graphData.elementIdArrays, 0);


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

        canvas.classList.remove('transition')
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
    window.onscroll = mouseOverFunc(id)
    document.getElementById("populationToggle-prosent").addEventListener("click", function() {
        setHtmlIds('.activeTable', graphData.elementIdArrays, 1);
    })
};




function graphMainNum(array, graphData) {

    function mapDataGraphTotal(xAxisKeys, yAxisArray, array) {
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
            maxVal = arrayMaxInt + (Math.ceil((arrayMaxInt * 0.10) / 10) * 10);

            arrayMinInt = Math.round(arrayMin / 10) * 10;
            minVal = arrayMinInt - (Math.round((arrayMaxInt) * 0.10 / 10) * 10);
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
        drawGraphTotal(xAxisValues, arrObject, array);
    };


    function drawGraphTotal(xAxisVal, arrayObj, array) {
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
        increment = arrayObj["increment"]
        let rectangles = xAxisVal.length - 1;

        //Gridscaling based on graph input length
        let scaleForX = (graphTotal.width - rowSize + margin) / rectangles;
        let scaleForY = (graphTotal.height - columnSize - margin) / (maxValue - minValue);
        


        //plots each of the points(elements) in the Array to a line
        function plotData(toPlot) {
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, toPlot[0]);
            for (i = 1; i < rectangles; i++) {
                ctx.lineTo(i * scaleForX, toPlot[i])
            }
            ctx.stroke();
        }

        ctx.font = "20px Arial";
        ctx.fillText (array[1] + array[2], 3, 35)
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
   mapDataGraphTotal(Object.keys(graphData.graphObjects[array[0]]), Object.values(graphData.graphObjects[array[0]]), array);
};







/*yAxisArray.forEach(function(item) {
                newArr.push((item / 1000));
            });*/

            /*let reducedData = {
                "originalArr": yAxisArray,
                "redData": newArr,
            }
            return reducedData
        }*/
