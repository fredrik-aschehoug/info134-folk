




function mapDataGraphTotal(xAxisKeys, totalArray) {
    
    xAxisKeys = xAxisKeys
    totalArray = totalArray;
        
    /*let empMaxValue = maxArray(totalEmp);
    let empMinValue = minArray(femaleEmp);
    let increment = incrementFunc();*/
    const detailsForm1 = document.getElementById("detailsForm");
    id = detailsForm1.detailsInput.value
    let xAxisValues;
        
    
    //let higherEdu = Object.values(municipalData.education.number['03a'].Kvinner


function xAxisArray(xAxisKeys, totalArray) {
    xAxisValues = xAxisKeys
    if (xAxisValues.length > 12) { 
        xAxisValues.reverse();
        xAxisValues.length = 12;
        xAxisValues.reverse();
        maxArray(totalArray)
    } else {
        maxArray(totalArray)
    }
    return xAxisValues.unshift("")
    };

    xAxisArray(xAxisKeys, totalArray,);


function maxArray(totalArray) {
    let arrayMax = Math.max.apply(Math, totalArray)
    
    if (arrayMax > 1000) {
        arrayMaxInt = Math.round(arrayMax/1200) * 1200;
        maxVal = arrayMaxInt + 1200;
        minArray(totalArray);
    } else if (arrayMax < 1000 && arrayMax > 99) {
        arrayMaxInt = Math.round(arrayMax/100) * 100;
        maxVal = arrayMaxInt + 100;
    } else {
        maxVal = 100;
    }
    return maxVal       
};


function minArray(totalArray) {
    let arrayMin = totalArray
    arrayMin = Math.min.apply(Math, arrayMin);
    
    if (arrayMin > 100000) {
    arrayMinInt = Math.round(arrayMin/1200)*1200;
    minVal = arrayMinInt - 10000;

    } else if (arrayMin < 1000 && arrayMin > 100) {
        arrayMinInt = Math.round(arrayMin/100)*100;
        minVal = arrayMinInt - 100;
    } else {
        minVal = 0;
    }
    return minVal
};


function incrementFunc() {
    total = (maxVal - minVal) /10
    if (total > 100 ) {
        value = Math.round(total/10)*10;
        incrementVal = value;
    } else {
        incrementVal = 10;
    }
    return incrementVal
};
incrementFunc();
drawGraphTotal(xAxisValues, minVal, maxVal,incrementVal, totalArray);

};



function drawGraphTotal(xAxisVal, minVal, maxVal,incrementVal, totalArray) {

    let graphTotal; 
    let ctx;
    let rectangles;
    let scaleForX;
    let scaleForY;
    let plotTotal = totalArray

    years = xAxisVal
    minValue = minVal;
    maxValue = maxVal;
    increment = incrementVal;
    rectangles = years.length-1;

//plots each of the points(elements) in the Array to a line
    function plotData(toPlot) {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, toPlot[0]);
        for (i = 1; i < rectangles; i++) {
            ctx.lineTo(i * scaleForX, toPlot[i])
        }
        ctx.stroke();
    }

    //Dynamic values based on Array content for dataset
    let columnSize = 28;
    let rowSize = 38;
    let margin = 8;
    let xAxis = xAxisVal

    graphTotal = document.getElementById("graphTotal");
    ctx = graphTotal.getContext("2d");

    //Gridscaling based on graph input length
    scaleForX = (graphTotal.width - rowSize + margin) / rectangles;
    scaleForY = (graphTotal.height - columnSize - margin) / (maxValue - minValue);

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
            ctx.lineWidth = 0.5
            ctx.fillText(graphScale, margin-9, y + margin);
            ctx.moveTo(rowSize, y);
            ctx.lineTo(graphTotal.width-20, y);
            yCount++;
    }

    ctx.stroke();
    ctx.translate(rowSize, graphTotal.height + minValue * scaleForY);
    ctx.scale(1, -1 * scaleForY);


    ctx.strokeStyle = "#006400";
    plotData(plotTotal);

};



/*
        //Objects made into Arrays split in its keys and values
        let totalPop = Object.values(municipalData.population.number.total);
        let totalPopKeys = Object.keys(municipalData.population.number.total);
        let malePop = Object.values(municipalData.population.number.Menn);
        let femalePop = Object.values(municipalData.population.number.Kvinner);
    
        let totalEmp = Object.values(municipalData.employment.number.total);
        let totalEmpKeys = Object.keys(municipalData.employment.number.total);
        let maleEmp = Object.values(municipalData.employment.number.Menn);
        let femaleEmp = Object.values(municipalData.employment.number.Kvinner);

        //let totalEduKeys = Object.keys(municipalData.employment.number.total);
        
        //console.log(Object.keys(array[arrayIndex]));
        //console.log(Object.values(array[arrayIndex]));
        
        //mapDataGraphGenders(totalPopKeys, malePop, femalePop);*/



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
                total = (maxVal - minVal) /10
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
            let plotFemale = femaleArr
        
            years = xAxisVal
            minValue = minVal;
            maxValue = maxVal;
            increment = incrementVal;
            rectangles = years.length-1;
        
        //plots each of the points(elements) in the Array to a line
            function plotData(toPlot) {
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(0, toPlot[0]);
                for (i = 1; i < rectangles; i++) {
                    ctx.lineTo(i * scaleForX, toPlot[i])
                }
                ctx.stroke();
            }
        
            //Dynamic values based on Array content for dataset
            let columnSize = 28;
            let rowSize = 38;
            let margin = 8;
            let xAxis = xAxisVal
        
            graphGenders = document.getElementById("graphGenders");
            ctx = graphGenders.getContext("2d");
        
            //Gridscaling based on the canvas graph measurements
            scaleForX = (graphGenders.width - rowSize) / rectangles;
            scaleForY = (graphGenders.height - columnSize - margin) / (maxValue - minValue);
        
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
                    ctx.lineTo(x, graphGenders.height - margin);
            }
            
            //Fills ArrayKeyValues from the numbers array on the Y axis
            //Horizontal grid lines
            let yCount = 0;
            for (graphScale = maxValue; graphScale >= minValue; graphScale = graphScale - increment) {
                let y = columnSize + (scaleForY * yCount * increment);
                    ctx.lineWidth = 0.5
                    ctx.fillText(graphScale, margin-9, y + margin);
                    ctx.moveTo(rowSize, y);
                    ctx.lineTo(graphGenders.width-20, y);
                    yCount++;
            }
        
            ctx.stroke();
            ctx.translate(rowSize, graphGenders.height + minValue * scaleForY);
            ctx.scale(1, -1 * scaleForY);
        
            
            ctx.strokeStyle = "#4169E1";
            plotData(plotMale);
            ctx.strokeStyle = "#800000";
            plotData(plotFemale);
        };