


function mouseOverFunc(id) {
    let canvas = document.createElement("canvas");
    canvas.id = "graphTotal"
    canvas.width = 500;
    canvas.height = 300;
    document.getElementById("graph").appendChild(canvas)

    let can = document.getElementById('graphTotal')
    can.classList.add('canvasGraph')

    let trTags = document.getElementsByTagName("tr");

    let elementIDmap = {
        "popKvinner": 0,
        "popMenn": 1,
        "popTotal": 2,
        "popKvinnerPercent": 3,
        "popMennPercent": 4,
        "empKvinner": 5,
        "empMenn": 6,
        "empTotal": 7,
        "empKvinnerPercent": 8,
        "empMennPercent": 9,
        "empTotalPercent": 10,
        "highEduTotal": 11,
        "highEduMenn": 12,
        "highEduKvinner": 13,
    }

    for (let i = 0; i < trTags.length; i++) {
        let str = trTags[i].id;
        if (elementIDmap.hasOwnProperty(str)) {
            trTags[str].onmouseover = function () { graphObjects(id, elementIDmap[str]), showDarkBackground(str), graphAnimation(can); }
            trTags[str].onmouseout = function () { mouseOut(str, can, id) }
        }
    }
};


function getAll(className, className2) {

    let trElements = document.querySelectorAll(className);
    let tableElements = document.querySelectorAll(className2);
    console.log(tableElements)
    elementIdArray = [["popKvinner", "popMenn", "popTotal", "popKvinnerPercent",
        "popMennPercent", "empKvinner", "empMenn", "empTotal",
        "empKvinnerPercent", "empMennPercent", "empTotalPercent",
        "highEduKvinner", "highEduMenn", "highEduTotal",
        "highEduKvinnerPercent", "highEduMennPercent", "HighEduTotalPercent"],
    ["population", "employment", "highEdu", "fagskole", "highEduShort", "highEduLong"]]

    for (let i = 0; i < trElements.length; i++) {
        trElements[i].id = elementIdArray[0][i]
    }
    for (let j = 0; j < tableElements.length; j++) {
        tableElements[j].id = elementIdArray[1][j];
        //
    }
    /*for (let k = 0; k < elementIdArray; k++) {
        let applyCanvas = elementIdArra[k]
        applyCanvas.onmouseover = function() {
            let canvas = document.createElement("canvas");
            document.getElementById(applyCanvas).appendChild(canvas);
    
        }*/
    /*if (tableElements.id in elementIdArray[1]) {
        document.getElementById(tableElements.id).appendChild(canvas);
    }*/
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
    rowID = rowID
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
};


function graphObjects(id, arrayIndex) {
    let municipalData = details.getHistorical(id);
    arrayIndex = arrayIndex

    let totalEduCat11 = municipalData.education.number["11"].total
    let totalEduCat03a = municipalData.education.number["03a"].total
    let totalEduCat04a = municipalData.education.number["04a"].total

    let maleEduCat11 = municipalData.education.number["11"].total
    let maleEduCat03a = municipalData.education.number["03a"].total
    let maleEduCat04a = municipalData.education.number["04a"].total

    let femaleEduCat11 = municipalData.education.number["11"].total
    let femaleEduCat03a = municipalData.education.number["03a"].total
    let femaleEduCat04a = municipalData.education.number["04a"].total



    function highEduSum(...obj) {
        return obj.reduce((x, y) => {
            for (let i in y) {
                if (y.hasOwnProperty(i))
                    x[i] = (x[i] || 0) + y[i];
            }
            return x
        }, {});
    }

    let array = [municipalData.population.number.Kvinner,
    municipalData.population.number.Menn,
    municipalData.population.number.total,
    municipalData.population.percent.Kvinner,
    municipalData.population.percent.Menn,
    municipalData.employment.number.Kvinner,
    municipalData.employment.number.Menn,
    municipalData.employment.number.total,
    municipalData.employment.percent.Kvinner,
    municipalData.employment.percent.Menn,
    municipalData.employment.percent.total]

    let educationObjTot = highEduSum(totalEduCat11, totalEduCat03a, totalEduCat04a)
    let educationObjMale = highEduSum(maleEduCat11, maleEduCat03a, maleEduCat04a)
    let educationObjFemale = highEduSum(femaleEduCat11, femaleEduCat03a, femaleEduCat04a)
    array.push(educationObjTot, educationObjMale, educationObjFemale)

    mapDataGraphTotal(Object.keys(array[arrayIndex]), Object.values(array[arrayIndex]));


    function mapDataGraphTotal(xAxisKeys, totalArray) {

        xAxisKeys = xAxisKeys
        totalArray = totalArray;
        const detailsForm1 = document.getElementById("detailsForm");
        id = detailsForm1.detailsInput.value
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



        function minMaxArray(totalArray) {
            let i = 0;
            while (i < totalArray.length) {
                totalArray[i] = totalArray[i] / 1000;
                i++
            }

            let arrayMax = Math.max.apply(Math, totalArray)
            let arrayMin = Math.min.apply(Math, totalArray);
            arrayMaxInt = Math.ceil(arrayMax / 10) * 10;
            maxVal = arrayMaxInt + (Math.ceil((arrayMaxInt * 0.05) / 10) * 10);

            arrayMinInt = Math.round(arrayMin / 10) * 10;
            minVal = arrayMinInt - (Math.round((arrayMaxInt) * 0.05 / 10) * 10);
            minVal = Math.round(minVal / 10) * 10;
            if (maxVal === minVal) {
                minVal = maxVal - 20;
            }

            let incrementVal = (maxVal - minVal) / 10;
            let minMaxObj = {
                "yAxisArray": totalArray,
                "minValue": minVal,
                "maxValue": maxVal,
                "increment": incrementVal
            };
            return minMaxObj;
        }

        let arrObjekt = minMaxArray(totalArray)
        drawGraphTotal(xAxisValues, arrObjekt);
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
        increment = arrayObj["increment"];
        let rectangles = xAxisVal.length - 1;

        //Gridscaling based on graph input length
        let = scaleForX = (graphTotal.width - rowSize + margin) / rectangles;
        let = scaleForY = (graphTotal.height - columnSize - margin) / (maxValue - minValue);


        //plots each of the points(elements) in the Array to a line
        function plotData(toPlot) {
            ctx.beginPath();
            ctx.moveTo(0, toPlot[0]);
            for (i = 1; i < rectangles; i++) {
                ctx.lineTo(i * scaleForX, toPlot[i])
            }
            ctx.stroke();
        }

        //graphStyling
        ctx.font = "10px Arial";
        ctx.fillStyle = "#374C70";      //Font colour
        ctx.strokeStyle = "grey";    //Grid line color

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
        for (graphScale = maxValue; graphScale >= minValue; graphScale = graphScale - increment) {
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