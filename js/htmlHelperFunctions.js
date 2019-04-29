/**
 * Creates a HTML <header> element with text.
 * @param {string} headerText The text to use in the header element
 * @param {string} className Class to assign to the element
 * @param {string} headerName The name to assign to the element
 * @returns {HTMLElement} Header element with specified text and class.
 */
function createHeader(headerText, className, headerName) {
    const headerNode = document.createElement("header");
    const hNode = document.createElement("h3");
    headerNode.classList.add(className);
    const textNode = document.createTextNode(headerText);
    if (headerName) {
        const a = document.createElement("a");
        a.name = headerName;
        a.appendChild(textNode);
        hNode.appendChild(a);
    }
    else {
        hNode.appendChild(textNode);
    }
    headerNode.append(hNode);
    return headerNode;
}
/**
 * Removes all childnodes of the given DOM node.
 * @param {HTMLElement} node - The node to remove childenodes from
 */
function removeChildNodes(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
/**
 * Append html nodes to a parent node
 * @param {HTMLElement} node Parent node
 * @param  {HTMLElement[]} children Child nodes to append
 */
function appendElements(node, ...children) {
    for (let child of children) {
        node.appendChild(child);
    }
}
/**
 * Create a row with headers.
 * @param {Array} headers - The header text values to use in header row
 * @returns {HTMLTableRowElement}
 */
function createTableHeader(headers) {
    const headerRow = document.createElement("tr");
    for (let header of headers) {
        let th = document.createElement("th");
        th.innerHTML = header;
        headerRow.appendChild(th);
    }
    return headerRow;
}
/**
* Create a HTML table element with thead and tbody childnodes.
* @returns {HTMLTableElement}
*/
function createTableElement() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}
/**
 * Get years from object and store in array
 * @param {string} type "population"/"employment"/"education"
 * @param {object} historicalDetails From details.getHistorical(id)
 * @returns {string[]} All years in dataset, to be used as table header
 */
function createTableHeaders(type, historicalDetails) {
    const tableHeaders = [""]; // First cell must be empty 
    let years;
    if (type === "education") {
        years = historicalDetails[type].number["01"].Kvinner;
    }
    else {
        years = historicalDetails[type].number.Kvinner;
    }
    for (let year in years) {
        tableHeaders.push(year);
    }
    return tableHeaders;
}
/**
 *
 * @param {string[]} desciptions The values of the first column
 * @param {string[]} tableHeaders List of years in the table header
 * @param {object} historicalDetails From details.getHistorical(id)
 * @param {HTMLTableElement} tbody tbody element to append to
 * @param {string} format "number"/"percent"
 * @param {string} type "population"/"emplyment"/"education"
 */
function createTableBody(desciptions, tableHeaders, historicalDetails, tbody, format, type, eduType) {
    for (let desc of desciptions) {
        let tr = tbody.insertRow(-1);
        tr.classList.add("mouseOver");
        for (let year of tableHeaders) {
            let td = tr.insertCell(-1);
            let data;
            if (year === "") {
                data = desc;
            }
            else {
                switch (desc) {
                    case "Kvinner":
                        if (eduType) {
                            data = historicalDetails[type][format][eduType].Kvinner[year];
                        }
                        else {
                            data = historicalDetails[type][format].Kvinner[year];
                        }
                        tr.id = "popKvinner";
                        break;
                    case "Menn":
                        if (eduType) {
                            data = historicalDetails[type][format][eduType].Menn[year];
                        }
                        else {
                            data = historicalDetails[type][format].Menn[year];
                        }
                        tr.id = "popMenn";
                        break;
                    case "Begge kjønn":
                        if (eduType) {
                            data = historicalDetails[type][format][eduType].total[year];
                        }
                        else {
                            data = historicalDetails[type][format].total[year];
                        }
                        tr.id = "popTotal";
                        break;
                }
            }
            if (format === "number") {
                // Format large numbers to Norwegian locale
                data = data.toLocaleString('no');
            }
            else if (format === "percent" && typeof data === "number") {
                // CSS adds a "%" sign
                td.classList.add("percentCell");
            }
            td.innerHTML = data;
        }
    }
}
/**
 * Creates a custom toggle button inside a form element.
 * The toggle calls the callback function when clicked.
 * @param {toggleCallback} callback Function to call when toggle is clicked
 * @param {string} cbParam Classname, param to the callback function
 * @param {string} type "population"/"emplyment"/"education"
 * @param {string} eduType The level of education
 * @returns {HTMLFormElement} <form> element containing the toggle button
 */
function createTableToggle(callback, cbParam, type, eduType) {
    eduType = eduType || "";
    // Create DOM elements
    const tableToggle = document.createElement("form");
    const input1 = document.createElement("input");
    const label1 = document.createElement("label");
    const input2 = document.createElement("input");
    const label2 = document.createElement("label");
    let radioclass = `${type}${eduType}Toggle`;
    // Set attributes
    input1.id = `${type}${eduType}Toggle-antall`;
    input1.classList.add(radioclass, "toggle", "toggle-left", "toggle-active");
    input1.name = "toggle";
    input1.value = "false";
    input1.type = input2.type = "radio";
    input1.checked = true;
    input1.onclick = () => callback(cbParam, "antall", radioclass);
    label1.htmlFor = `${type}${eduType}Toggle-antall`;
    label1.classList.add("tableToggle");
    label1.innerText = "Antall";
    input2.id = `${type}${eduType}Toggle-prosent`;
    input2.classList.add(radioclass, "toggle", "toggle-right");
    input2.name = "toggle";
    input2.value = "true";
    input2.onclick = () => callback(cbParam, "prosent", radioclass);
    label2.htmlFor = `${type}${eduType}Toggle-prosent`;
    label2.classList.add("tableToggle");
    label2.innerText = "Prosent";
    // Append DOM elements to return object
    tableToggle.appendChild(input1);
    tableToggle.appendChild(label1);
    tableToggle.appendChild(input2);
    tableToggle.appendChild(label2);
    return tableToggle;
}
/**
 * Toggles classname "activeTable" on all elements with the class of the param.
 * @callback toggleCallback
 * @type {toggleCallback}
 * @param {string} className The classname to toggele classes on
 * @param {string} inputType "antall"/"prosent". The type of radio that is clicked
 * @param {string} radioClass The common class of the radios to check
 */
function toggleCallback(className, inputType, radioClass) {
    let radios = document.getElementsByClassName(radioClass);
    let correctClick = false;
    if (inputType === "antall") {
        // If prosent radio is active
        if (radios.namedItem(`${radioClass}-prosent`).classList.contains("toggle-active")) {
            correctClick = true;
        }
    }
    else if (inputType === "prosent") {
        // If antall radio is active
        if (radios.namedItem(`${radioClass}-antall`).classList.contains("toggle-active")) {
            correctClick = true;
        }
    }
    if (correctClick) {
        const elements = document.getElementsByClassName(className);
        for (let element of elements) {
            element.classList.toggle("activeTable");
        }
        for (let radio of radios) {
            radio.classList.toggle("toggle-active");
        }
    }
}
