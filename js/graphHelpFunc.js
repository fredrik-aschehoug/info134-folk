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
    if (elements[2] === "education1" || elements[2] === "education2" || elements[2] === "education3" || elements[2] === "education4"){
        elements[2] = "education";
    }
        
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



function graphReanimate(graphObj) {
    graphObj.classList.remove('transition')
}

function graphAnimation(graphObj) {
    canvas = graphObj;
    canvas.classList.add('transition');
    let compStyle = window.getComputedStyle(canvas),
        marginLeft = compStyle.getPropertyValue('margin-right');
    canvas.style.marginLeft = marginLeft;
    //graphReanimate(canvas);
}