/**
 * Create the entire content for the details view and append it to the "detaljar" DIV
 * @param {string} id Municipal ID to get details from
 */
function createDetails(id) {
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
        } else {
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
     * Compile a <div> element containing current details
     * @param {object} currentDetails From details.getCurrent(id)
     * @returns {HTMLDivElement} Div element containing all current details
     */
    function createCurrentDetails(currentDetails) {
        // Array with parameters for the compileRowData function
        const rowData = [
            ["Befolkning"],
            ["Kvinner", "population"],
            ["Menn", "population"],
            ["Begge kjønn", "population"],
            ["Sysselsetting"],
            ["Kvinner", "employment"],
            ["Menn", "employment"],
            ["Begge kjønn", "employment"],
            ["Høyere utdanning"],
            ["Fagskolenivå"],
            ["Kvinner", "education", "11"],
            ["Menn", "education", "11"],
            ["Begge kjønn", "education", "11"],
            ["Universitets- og høgskolenivå kort"],
            ["Kvinner", "education", "03a"],
            ["Menn", "education", "03a"],
            ["Begge kjønn", "education", "03a"],
            ["Universitets- og høgskolenivå lang"],
            ["Kvinner", "education", "04a"],
            ["Menn", "education", "04a"],
            ["Begge kjønn", "education", "04a"],
            ["All høyere utdanning"],
            ["Kvinner", "education", "12"],
            ["Menn", "education", "12"],
            ["Begge kjønn", "education", "12"],
        ];
        // Cells to be given HTML class "headerCell"
        const headerCells = [
            "Befolkning",
            "Sysselsetting",
            "Høyere utdanning",
            "Fagskolenivå",
            "Universitets- og høgskolenivå kort",
            "Universitets- og høgskolenivå lang",
            "All høyere utdanning"
        ];
        /** Create paragraph element with brief info about the municipal
         * @param {object} currentDetails From getCurrent() method
         * @param {string} id Municipal ID
         * @returns {HTMLParagraphElement}
         */
        function createParagraph(currentDetails, id) {
            // Append text elements:
            const paragraph = document.createElement("p");
            const kommunenavn = document.createTextNode(`Kommunenavn: ${currentDetails.navn}`);
            const kommunenummer = document.createTextNode(`Kommunenummer: ${id}`);
            paragraph.appendChild(kommunenavn);
            paragraph.appendChild(document.createElement("br"));
            paragraph.appendChild(kommunenummer);
            paragraph.appendChild(document.createElement("br"));
            return paragraph;
        }
        /**
         * Appends rowData to table. 3 cells per row.
         * Adds a DOM class to each cell type for CSS formatting.
         * @param {HTMLTableElement} table The table to append data to
         * @param {Array} rowData The data to append
         */
        function createTableRow(table, rowData, headerCells) {
            const row = table.insertRow(-1);
            let i = 0;
            while (i < rowData.length) {
                let cell = row.insertCell(-1);
                let data = rowData[i];
                if (headerCells.includes(data)) {
                    cell.classList.add("headerCell");
                }
                else if (typeof data === "string") {
                    cell.classList.add("dataCell");
                }
                else if (i === 1) {
                    cell.classList.add("numberCell");
                    // Format large numbers to Norwegian locale
                    data = data.toLocaleString('no');
                }
                else {
                    cell.classList.add("percentCell");
                }
                cell.innerHTML = data;
                i++;
            }
        }
        /**
         * Compile data for a table row.
         * Logic for different types of rows.
         * @param {object} currentDetails From getCurrent() method
         * @param {string} title The text in the leftmost row
         * @param {string} type population/employment/education
         * @param {string} eduType The level of education
         * @returns {Array} To be used in createTableRow() function
         */
        function compileRowData(currentDetails, title, type, eduType) {
            let rowdata = [];
            let sex;
            let number;
            let percent;
            // If row contains more than one cell
            if (type) {
                switch (title) {
                    case "Kvinner":
                        sex = "Kvinner";
                        if (eduType) {
                            number = currentDetails[type].number[eduType].Kvinner;
                            percent = currentDetails[type].percent[eduType].Kvinner;
                        }
                        else {
                            number = currentDetails[type].number.Kvinner;
                            percent = currentDetails[type].percent.Kvinner;
                        }
                        break;
                    case "Menn":
                        sex = "Menn";
                        if (eduType) {
                            number = currentDetails[type].number[eduType].Menn;
                            percent = currentDetails[type].percent[eduType].Menn;
                        }
                        else {
                            number = currentDetails[type].number.Menn;
                            percent = currentDetails[type].percent.Menn;
                        }
                        break;
                    case "Begge kjønn":
                        sex = "Begge kjønn";
                        // If a percentage velue is present. Some statistics does not have it (when 100%)
                        if (currentDetails[type].percent.total || currentDetails[type].percent[eduType]) {
                            if (eduType) {
                                number = currentDetails[type].number[eduType].total;
                                percent = currentDetails[type].percent[eduType].total;
                            }
                            else {
                                number = currentDetails[type].number.total;
                                percent = currentDetails[type].percent.total;
                            }
                        }
                        else {
                            number = currentDetails[type].number.total;
                            percent = "";
                        }
                        break;
                }
                rowdata = [sex, number, percent];
            }
            else {
                rowdata = [title, "", ""];
            }
            return rowdata;
        }
        // Create table
        const detailsTableHeaders = ["Beskriving ", "Antall", "Prosent"];
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        table.appendChild(thead);
        table.appendChild(tbody);
        // Create table headers
        thead.appendChild(createTableHeader(detailsTableHeaders));
        // Append all rows to table object
        for (let data of rowData) {
            // Destructure array
            let [title, type, eduType] = data;
            createTableRow(tbody, compileRowData(currentDetails, title, type, eduType), headerCells);
        }
        const htmlObject = document.createElement("div");
        const paragraph = createParagraph(currentDetails, id);
        const headerText = `Siste oppdaterte statistikk for ${currentDetails.navn}:`;
        const header = createHeader(headerText, "mainHeader");
        appendElements(htmlObject, header, paragraph, table);
        return htmlObject;
    }
    /**
     * Compile a <div> element containing historical details
     * @param {object} historicalDetails From details.getHistorical(id)
     * @returns {HTMLDivElement} Div element containing all historical details
     */
    function createHistoricalDetails(historicalDetails) {
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
                    } else {
                        switch (desc) {
                            case "Kvinner":
                                if (eduType) {
                                    data = historicalDetails[type][format][eduType].Kvinner[year];
                                } else {
                                    data = historicalDetails[type][format].Kvinner[year];
                                }
                                tr.id = "popKvinner";
                                break;
                            case "Menn":
                                if (eduType) {
                                    data = historicalDetails[type][format][eduType].Menn[year];
                                } else {
                                    data = historicalDetails[type][format].Menn[year];
                                }
                                tr.id = "popMenn";
                                break;
                            case "Begge kjønn":
                                if (eduType) {
                                    data = historicalDetails[type][format][eduType].total[year];
                                } else {
                                    data = historicalDetails[type][format].total[year];
                                }
                                tr.id = "popTotal";
                                break;
                        }
                    }
                    if (format === "number") {
                        // Format large numbers to Norwegian locale
                        data = data.toLocaleString('no');
                    } else if (format === "percent" && typeof data === "number") {
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
            } else if (inputType === "prosent") {
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
        /**
         * Get years from object and store in array
         * @param {string} type "population"/"emplyment"/"education" 
         * @returns {string[]} All years in dataset, to be used as table header
         */
        function createTableHeaders(type) {
            const tableHeaders = [""]; // First cell must be empty 
            let years;
            if (type === "education") {
                years = historicalDetails[type].number["01"].Kvinner;
            } else {
                years = historicalDetails[type].number.Kvinner;
            }
            for (let year in years) {
                tableHeaders.push(year);
            }
            return tableHeaders;
        }
        const htmlObject = document.createElement("div");
        const headerText = `Historisk statistikk for ${currentDetails.navn}:`;
        const header = createHeader(headerText, "mainHeader");
        const populationHeader = createHeader("Befolkning:", "subHeader", "befolkning");
        const employmentHeader = createHeader("Sysselsetting:", "subHeader", "sysselsetting");
        const mainEducationHeader = createHeader("Høyere Utdanning:", "subHeader", "utdanning");
        const educationHeader12 = createHeader("All høyere Utdanning:", "subHeader2", "utdanning12");
        const educationHeader11 = createHeader("Fagskolenivå:", "subHeader2", "utdanning11");
        const educationHeader03a = createHeader("Universitets- og høgskolenivå kort", "subHeader2", "utdanning03a");
        const educationHeader04a = createHeader("Universitets- og høgskolenivå lang", "subHeader2", "utdanning04a");
        ////////////////// todo
        function createHistoricalTable(type, eduType) {
            eduType = eduType || "";
            const className = `${type}${eduType}Table`;
            const tables = document.createElement("div");
            const numberDesciptions = ["Kvinner", "Menn", "Begge kjønn"];
            let percentDesciptions;
            if (type === "population") {
                percentDesciptions = ["Kvinner", "Menn"];
            } else {
                percentDesciptions = ["Kvinner", "Menn", "Begge kjønn"];
            }
            const tableHeaders = createTableHeaders(type);
            numberTable = createTableElement();
            percentTable = createTableElement();
            // Create table headers
            numberTable.tHead.appendChild(createTableHeader(tableHeaders));
            percentTable.tHead.appendChild(createTableHeader(tableHeaders));
            // Create rows
            createTableBody(numberDesciptions, tableHeaders, historicalDetails, numberTable.tBodies[0], "number", type, eduType);
            createTableBody(percentDesciptions, tableHeaders, historicalDetails, percentTable.tBodies[0], "percent", type, eduType);
            // Assign classes
            
            numberTable.classList.add(className, "activeTable");
            percentTable.classList.add(className);
            const tableToggle = createTableToggle(toggleCallback, className, type, eduType);
            appendElements(tables, tableToggle, numberTable, percentTable);
            return tables;
        }
        const populationTables = createHistoricalTable("population");
        const employmentTables = createHistoricalTable("employment");
        const educationTables12 = createHistoricalTable("education", "12");
        const educationTables11 = createHistoricalTable("education", "11");
        const educationTables03a = createHistoricalTable("education", "03a");
        const educationTables04a = createHistoricalTable("education", "04a");
        // Append items to return object
        appendElements(
            htmlObject,
            header,
            populationHeader,
            populationTables,
            employmentHeader,
            employmentTables,
            mainEducationHeader,
            educationHeader12,
            educationTables12,
            educationHeader11,
            educationTables11,
            educationHeader03a,
            educationTables03a,
            educationHeader04a,
            educationTables04a
        );
        return htmlObject;
    }
    // Placeholder to put content in
    const placeholder = document.getElementsByClassName("detailsOutput");
    // Data to use
    const currentDetails = details.getCurrent(id);
    const historicalDetails = details.getHistorical(id);
    // Create items to append
    const currentDetailsObject = createCurrentDetails(currentDetails);
    const historicalDetailsObject = createHistoricalDetails(historicalDetails);
    // Clear placeholder
    removeChildNodes(placeholder[0]);
    // Append item to placeholder
    placeholder[0].appendChild(currentDetailsObject);
    placeholder[0].appendChild(historicalDetailsObject);
}