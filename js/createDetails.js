/**
 * Create the entire content for the details view and append it to the "detaljar" DIV
 * @param {string} id Municipal ID to get details from
 */
function createDetails(id) {
    /**
     * Creates a HTML <header> element with text.
     * @param {string} headerText The text to use in the header element
     * @returns {HTMLElement} Header element with specified text.
     */
    function createHeader(headerText) {
        const headerNode = document.createElement("header");
        const textNode = document.createTextNode(headerText);
        headerNode.appendChild(textNode);
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
        ];
        // Cells to be given HTML class "headerCell"
        const headerCells = [
            "Befolkning",
            "Sysselsetting",
            "Høyere utdanning",
            "Videregående skole-nivå",
            "Fagskolenivå",
            "Universitets- og høgskolenivå kort",
            "Universitets- og høgskolenivå lang",
            "Uoppgitt eller ingen fullført utdanning"
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
        const header = createHeader(headerText);
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
         */
        function createTableBody(desciptions, tableHeaders, historicalDetails, tbody, format) {
            for (let desc of desciptions) {
                let tr = tbody.insertRow(-1);
                tr.classList.add("mouseOver")
                for (let year of tableHeaders) {
                    let td = tr.insertCell(-1);
                    let data;
                    if (year === "") {
                        data = desc;
                    } else {
                        switch (desc) {
                            case "Kvinner":
                                data = historicalDetails.population[format].Kvinner[year];
                                tr.id = "popKvinner";
                                break;
                            case "Menn":
                                data = historicalDetails.population[format].Menn[year];
                                tr.id = "popMenn";
                                break;
                            case "Begge kjønn":
                                data = historicalDetails.population[format].total[year];
                                tr.id = "popTotal"
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
         * @returns {HTMLFormElement} <form> element containing the toggle button
         */
        function createTableToggle(callback, cbParam){
            // Create DOM elements
            const tableToggle = document.createElement("form");
            const input1 = document.createElement("input");
            const label1 = document.createElement("label");
            const input2 = document.createElement("input");
            const label2 =  document.createElement("label");
            // Set attributes
            input1.id = "toggle-antall";
            input1.classList.add("toggle", "toggle-left", "toggle-active");
            input1.name = "toggle";
            input1.value = "false";
            input1.type = input2.type = "radio";
            input1.checked = true;
            input1.onclick = () => callback(cbParam, "antall");
            label1.htmlFor = "toggle-antall";
            label1.classList.add("tableToggle");
            label1.innerText = "Antall";
            input2.id = "toggle-prosent";
            input2.classList.add("toggle", "toggle-right");
            input2.name = "toggle";
            input2.value = "true";
            input2.onclick = () => callback(cbParam, "prosent");
            label2.htmlFor = "toggle-prosent";
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
         */
        function toggleCallback(className, inputType) {
            let radios = document.getElementsByClassName("toggle");
            let correctClick = false;
            if (inputType === "antall") {
                // If prosent radio is active
                if (radios.namedItem("toggle-prosent").classList.contains("toggle-active")){
                    correctClick = true;
                }
            } else if (inputType === "prosent") {
                // If antall radio is active
                if (radios.namedItem("toggle-antall").classList.contains("toggle-active")){
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
        const htmlObject = document.createElement("div");
        const headerText = `Historisk statistikk for ${currentDetails.navn}:`;
        const header = createHeader(headerText);
        const populationHeaderText = "Befolkning:";
        const populationHeader = createHeader(populationHeaderText);

        // Create table
        // Get years from object, to be used as headers
        const tableHeaders = [""]; // First cell must be empty  
        for (let year in historicalDetails.population.number.Kvinner) {
            tableHeaders.push(year);
        }

        populationNumberTable = createTableElement(tableHeaders);
        populationPercentTable = createTableElement(tableHeaders);
        // Create table headers
        populationNumberTable.tHead.appendChild(createTableHeader(tableHeaders));
        populationPercentTable.tHead.appendChild(createTableHeader(tableHeaders));
        // Create rows
        const numberDesciptions = ["Kvinner", "Menn", "Begge kjønn"];
        const percentDesciptions = ["Kvinner", "Menn"];
        createTableBody(numberDesciptions, tableHeaders, historicalDetails, populationNumberTable.tBodies[0], "number");
        createTableBody(percentDesciptions, tableHeaders, historicalDetails, populationPercentTable.tBodies[0], "percent");

        // Assign classes
        populationNumberTable.classList.add("populationTable", "activeTable");
        populationPercentTable.classList.add("populationTable");
        const tableToggle = createTableToggle(toggleCallback, "populationTable");
        // Append items to return object
        appendElements(htmlObject, header, populationHeader, tableToggle, populationNumberTable,populationPercentTable);
        return htmlObject;
    }

    // Placeholder to put content in
    const placeholder = document.getElementsByClassName("detailsOutput");
    // Data to use
    const currentDetails = details.getCurrent(id);
    const historicalDetails = details.getHistorical(id);

    const currentDetailsObject = createCurrentDetails(currentDetails);
    const historicalDetailsObject = createHistoricalDetails(historicalDetails);
    // Clear placeholder
    removeChildNodes(placeholder[0]);
    // Append item to placeholder
    placeholder[0].appendChild(currentDetailsObject);
    placeholder[0].appendChild(historicalDetailsObject);
}