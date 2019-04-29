


    function mouseOverFunc(id) {
        let canvas = document.createElement("canvas");
        canvas.id = "graphTotal"
        canvas.width = 600;
        canvas.height = 400;
        document.getElementById("graph").appendChild(canvas)

        let can = document.getElementById('graphTotal')
        can.classList.add('canvasGraph')

        let trTags = document.getElementsByTagName("tr");

        let elementIDmap = {
            "popTotal":0,
            "popMenn":1,
            "popKvinner":2,
        }

        for (let i = 0; i < trTags.length;i++) {
            let str = trTags[i].id;
            if (elementIDmap.hasOwnProperty(str)) {
                trTags[str].onmouseover = function () {graphObjects(id, elementIDmap[str]), showDarkBackground(str), graphAnimation(can);}
                trTags[str].onmouseout = function () {mouseOut(str, can)}
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
    
        function showDarkBackground(rowID) {
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
        
        
            function xAxisArray(xAxisKeys) {
                xAxisValues = xAxisKeys
                if (xAxisValues.length > 12) { 
                    xAxisValues.reverse();
                    xAxisValues.length = 12;
                    xAxisValues.reverse();
                } else {
                }
                return xAxisValues.unshift("")
                };
        
                xAxisArray(xAxisKeys);
        
        

            function minMaxArray(totalArray) {
                let arrayMax = Math.max.apply(Math, totalArray)
                arrayMaxInt = Math.round(arrayMax/1000) * 1000;
                maxVal=arrayMaxInt+(Math.round((arrayMaxInt*0.025)/1000) * 1000);
                let arrayMin = totalArray
        
                arrayMin = Math.min.apply(Math, arrayMin);
                arrayMinInt = Math.round(arrayMin/1000)*1000;
                arrayMaxInt = Math.round(arrayMax/1000) * 1000;
                arrayPad = (Math.round(((arrayMaxInt)*0.025)/1000) * 1000);
                minVal=arrayMinInt-arrayPad;

                total = (maxVal - minVal) /10
                if (total > 100 ) {
                    value = Math.round(total/10)*10;
                    incrementVal = value;
                } else {
                    incrementVal = 10;
                }

                let minMaxObj = {
                    "minValue": minVal,
                    "maxValue": maxVal,
                    "increment": incrementVal
                };
                return minMaxObj;
            }       
      
            let arrObjekt = minMaxArray(totalArray)
            drawGraphTotal(xAxisValues, arrObjekt, totalArray);
        
        };
        
        

        
        function drawGraphTotal(xAxisVal, arrayObj, totalArray) {
            let graphTotal = document.getElementById("graphTotal");
            let ctx = graphTotal.getContext("2d");
            let plotTotal = totalArray

            //Dynamic values based on Array content for dataset
            let columnSize = 50;
            let rowSize = 46;
            let margin = 10;
            let xAxis = xAxisVal
        
            xValues = xAxisVal
            minValue = arrayObj["minValue"];
            maxValue = arrayObj["maxValue"];
            increment = arrayObj["increment"];
            let rectangles = xValues.length-1;

            //Gridscaling based on graph input length
            let = scaleForX = (graphTotal.width - rowSize + margin) / rectangles;
            let = scaleForY = (graphTotal.height - columnSize - margin) / (maxValue - minValue);

            
        //plots each of the points(elements) in the Array to a line
            function plotData(toPlot) {
                ctx.beginPath();
                ctx.lineWidth = 4;
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
                    ctx.fillText(graphScale, margin-6, y + margin);
                    ctx.moveTo(rowSize, y);
                    ctx.lineTo(graphTotal.width, y);
                    yCount++;
            }
        
            ctx.stroke();
            ctx.translate(rowSize, graphTotal.height + minValue * scaleForY);
            ctx.scale(1, -1 * scaleForY);
        
        
            ctx.strokeStyle = "red";
            plotData(plotTotal);
        
        };
        
   };