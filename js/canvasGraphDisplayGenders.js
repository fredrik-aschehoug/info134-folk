


    function mouseOverFunc(id) {
        let canvas = document.createElement("canvas");
        canvas.id = "graphTotal"
        canvas.width = 500;
        canvas.height = 250;
        document.getElementById("graph").appendChild(canvas)

        let can = document.getElementById('graphTotal')
        can.classList.add('canvasGraph')

        let trTags = document.getElementsByTagName("tr");
            for (let i = 0; i < trTags.length; i++) {

            if (trTags[i].id === "popTotal") {
                trTags["popTotal"].onmouseover = function () {graphObjects(id, 0), showDarkBackground("popTotal"), graphAnimation(can);}
                trTags["popTotal"].onmouseout = function () {mouseOut("popTotal", can)}
               

            } else if (trTags[i].id === "popMenn") {
                trTags["popMenn"].onmouseover = function () {graphObjects(id, 1), showDarkBackground("popMenn"), graphAnimation(can)}
                trTags["popMenn"].onmouseout = function () {mouseOut("popMenn", can)}
                
            
            } else if (trTags[i].id === "popKvinner") {
                trTags["popKvinner"].onmouseover = function () {graphObjects(id, 2), showDarkBackground("popKvinner"), graphAnimation(can)}
                trTags["popKvinner"].onmouseout = function () {mouseOut("popKvinner", can)}
            }
        }
    };


        function graphAnimation(className) {
            canvas = className
            canvas.classList.add('transition')
            let compStyle = window.getComputedStyle(canvas), 
                marginLeft = compStyle.getPropertyValue('margin-left');
                canvas.style.marginLeft = marginLeft;
                

        }
    
        function showDarkBackground(rowID, className) {
            let x = document.getElementById("graphTotal")
            x.style.visibility = "visible";
            document.getElementById(rowID).style.backgroundColor = "#374C70"
            document.getElementById(rowID).style.color = "#F4F4F4"
        };

        function mouseOut(rowID, className) {
            rowID = rowID
            canvas = className

            canvas.classList.remove('transition')
            document.getElementById(rowID).style.color = "#24201D";
            let node = document.getElementById("graphTotal");
            let table = document.getElementById(rowID)
            let targetID = table.querySelectorAll('tr > td:first-child');

            for (let i = 0; i <targetID.length; i++){
                let td = targetID[i]
                if (td.innerHTML.trim() === "Menn"){
                    document.getElementById(rowID).style.backgroundColor = "#DADEE5";
                   
                } else {
                    document.getElementById(rowID).style.backgroundColor = "#F4F4F4";
                }
            }
            if (node.parentNode){
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
                    x[i] = (x[i] || 0 ) + y[i];
                }
                return x
            }, {});
        }

            let array = [municipalData.population.number.total, municipalData.population.number.Menn, municipalData.population.number.Kvinner, 
            municipalData.employment.number.total, municipalData.employment.number.Menn, municipalData.employment.number.Kvinner]
    
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
            
            if (arrayMax > 100000) {
                arrayMaxInt = Math.round(arrayMax/1000) * 1000;
                maxVal = arrayMaxInt + 10000;
                minArray(totalArray);

            } else if (arrayMax < 100000 && arrayMax > 50000) {
                arrayMaxInt = Math.round(arrayMax/1000) * 1000;
                maxVal = arrayMaxInt + 5000;
                minArray(totalArray);

            } else if (arrayMax < 50000 && arrayMax > 10000) {
                arrayMaxInt = Math.round(arrayMax/1000) * 1000;
                maxVal = arrayMaxInt + 2000;
                minArray(totalArray);

            } else if (arrayMax < 10000 && arrayMax > 999) {
                arrayMaxInt = Math.round(arrayMax/1000) * 1000;
                maxVal = arrayMaxInt + 1000;

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
            arrayMinInt = Math.round(arrayMin/1000)*1000;
            minVal = arrayMinInt - 10000;

            } else if (arrayMin > 50000 && arrayMin <100000) {
                arrayMinInt = Math.round(arrayMin/1000)*1000;
                minVal = arrayMinInt - 5000;

            } else if (arrayMin < 50000 && arrayMin > 10000) {
                arrayMinInt = Math.round(arrayMin/1000)*1000;
                minVal = arrayMinInt - 2000;

            } else if (arrayMin < 10000 && arrayMin > 999) {
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
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(0, toPlot[0]);
                for (i = 1; i < rectangles; i++) {
                    ctx.lineTo(i * scaleForX, toPlot[i])
                    
                }
                ctx.stroke();
            }
            

            //Dynamic values based on Array content for dataset
            let columnSize = 28;
            let rowSize = 42;
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
        
        
            ctx.strokeStyle = "red";
            plotData(plotTotal);
        
        };
   };