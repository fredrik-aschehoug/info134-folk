/**
 * Create the entire content for the details view and append it to the "detaljar" DIV
 * @param {string} id Municipal ID to get details from
 */
function renderDetails(id) {
    /**
     * Compile a <div> element containing current details
     * @param {object} currentDetails From details.getCurrent(id)
     * @returns {HTMLDivElement} Div element containing all current details
     */
    function renderCurrentDetails(currentDetails) {
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
        function renderParagraph(currentDetails, id) {
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
        function renderTableRow(table, rowData, headerCells) {
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
         * @param {string} type "population"/"employment"/"education"
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
        table.id = "overviewTable";
        // Create table headers
        thead.appendChild(renderTableHeader(detailsTableHeaders));
        // Append all rows to table object
        for (let data of rowData) {
            // Destructure array
            let [title, type, eduType] = data;
            renderTableRow(tbody, compileRowData(currentDetails, title, type, eduType), headerCells);
        }
        const htmlObject = document.createElement("div");
        const paragraph = renderParagraph(currentDetails, id);
        const headerText = `Siste oppdaterte statistikk for ${currentDetails.navn} (2017):`;
        const header = renderHeader(headerText, "mainHeader");
        htmlObject.id = "latestStats";
        appendElements(htmlObject, header, paragraph, table);
        return htmlObject;
    }
    /**
     * Compile a <div> element containing historical details
     * @param {object} historicalDetails From details.getHistorical(id)
     * @returns {HTMLDivElement} Div element containing all historical details
     */
    function renderHistoricalDetails(historicalDetails) {
        const htmlObject = document.createElement("div");
        htmlObject.classList.add("historicalOverview");
        const headerText = `Historisk statistikk for ${currentDetails.navn}:`;
        const header = renderHeader(headerText, "mainHeader");
        const populationHeader = renderHeader("Befolkning:", "subHeader", "befolkning");
        const employmentHeader = renderHeader("Sysselsetting:", "subHeader", "sysselsetting");
        const mainEducationHeader = renderHeader("Høyere Utdanning:", "subHeader", "utdanning");
        const educationHeader12 = renderHeader("All høyere Utdanning:", "subHeader2", "utdanning12");
        const educationHeader11 = renderHeader("Fagskolenivå:", "subHeader2", "utdanning11");
        const educationHeader03a = renderHeader("Universitets- og høgskolenivå kort", "subHeader2", "utdanning03a");
        const educationHeader04a = renderHeader("Universitets- og høgskolenivå lang", "subHeader2", "utdanning04a");
        /**
         * Generate a table with historical data. Both in percent and count. 
         * It is possible to toggle between count and percentage.
         * @param {string} type "population"/"employment"/"education"
         * @param {string} eduType The level of education
         * @returns {HTMLDivElement} <div> containing the table and other elements
         */
        function renderHistoricalTable(type, eduType) {
            eduType = eduType || "";
            const className = `${type}${eduType}Table`;
            const tableHeaderClass = "tableHeader";
            const tables = document.createElement("div");
            tables.classList.add("graphPointer");
            const numberDesciptions = ["Kvinner", "Menn", "Begge kjønn"];
            let percentDesciptions;
            if (type === "population") {
                percentDesciptions = ["Kvinner", "Menn"];
            } else {
                percentDesciptions = ["Kvinner", "Menn", "Begge kjønn"];
            }
            // Create tables
            numberTable = renderTableElement();
            percentTable = renderTableElement();
            // Create table headers
            const tableHeaders = createTableHeaders(type, historicalDetails);
            numberTable.tHead.appendChild(renderTableHeader(tableHeaders, tableHeaderClass));
            percentTable.tHead.appendChild(renderTableHeader(tableHeaders,tableHeaderClass));
            // Create rows
            renderTableBody(numberDesciptions, tableHeaders, historicalDetails, numberTable.tBodies[0], "number", type, eduType);
            renderTableBody(percentDesciptions, tableHeaders, historicalDetails, percentTable.tBodies[0], "percent", type, eduType);
            // Assign classes
            numberTable.classList.add(className, "activeTable");
            percentTable.classList.add(className);
            // Create tableToggle
            const tableToggle = renderTableToggle(toggleCallback, className, type, eduType);
            appendElements(tables, tableToggle, numberTable, percentTable);
            return tables;
        }
        // Render tables for all the historical stats 
        const populationTables = renderHistoricalTable("population");
        const employmentTables = renderHistoricalTable("employment");
        const educationTables12 = renderHistoricalTable("education", "12");
        const educationTables11 = renderHistoricalTable("education", "11");
        const educationTables03a = renderHistoricalTable("education", "03a");
        const educationTables04a = renderHistoricalTable("education", "04a");
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
    const currentDetailsObject = renderCurrentDetails(currentDetails);
    const historicalDetailsObject = renderHistoricalDetails(historicalDetails);
    // Clear placeholder
    removeChildNodes(placeholder[0]);
    // Append item to placeholder
    placeholder[0].appendChild(currentDetailsObject);
    placeholder[0].appendChild(historicalDetailsObject);
}