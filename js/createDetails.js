/**
 * Create the entire content for the details view and append it to the "detaljar" DIV
 * @function
 * @param {String} id - Municipal ID to get details from
 */
function createDetails(id) {
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
     * @function
     * @param {Object} currentDetails   - From getCurrent() method
     * @param {String} id               - Municipal ID
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
     * Create a row with headers.
     * @function
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
     * Appends rowData to table. 3 cells per row.
     * Adds a DOM class to each cell type for CSS formatting.
     * @function
     * @param {HTMLTableElement} table - The table to append data to
     * @param {Array} rowData          - The data to append
     */
    function createTableRow(table, rowData, headerCells) {
        const row = table.insertRow(-1);
        let i = 0;
        while (i < rowData.length) {
            let cell = row.insertCell(-1);
            let data = rowData[i];
            if (headerCells.includes(data)) {
                cell.classList.add("headerCell");
            } else if (typeof data === "string") {
                cell.classList.add("dataCell");
            } else if (i === 1) {
                cell.classList.add("numberCell");
                // Format large numbers to Norwegian locale
                data = data.toLocaleString('no');
            } else {
                cell.classList.add("percentCell");
            }
            cell.innerHTML = data;
            i++;
        }
    }
    /**
     * Compile data for a table row.
     * Logic for different types of rows.
     * @function
     * @param {Object} currentDetails   - From getCurrent() method
     * @param {String} title            - The text in the leftmost row
     * @param {String} type             - population/employment/education
     * @param {String} eduType          - The level of education
     * @returns {Array}                 - To be used in createTableRow() function
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
                    } else {
                        number = currentDetails[type].number.Kvinner;
                        percent = currentDetails[type].percent.Kvinner;
                    }
                    break;
                case "Menn":
                    sex = "Menn";
                    if (eduType) {
                        number = currentDetails[type].number[eduType].Menn;
                        percent = currentDetails[type].percent[eduType].Menn;
                    } else {
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
                        } else {
                            number = currentDetails[type].number.total;
                            percent = currentDetails[type].percent.total;
                        }
                    } else {
                        number = currentDetails[type].number.total;
                        percent = "";
                    }
                    break;
            }
            rowdata = [sex, number, percent];
        } else {
            rowdata = [title, "", ""];
        }
        return rowdata;
    }
    /**
     * Removes all childnodes of the given DOM node.
     * @function
     * @param {HTMLElement} node - The node to remove childenodes from
     */
    function removeChildNodes(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    /**
     * Creates a HTML <header> element with text.
     * @param {String} headerText   - The text to use in the header element
     * @returns {HTMLElement}       - Header element with specified text.
     */
    function createHeader(headerText) {
        const headerNode = document.createElement("header");
        const textNode = document.createTextNode(headerText);
        headerNode.appendChild(textNode);
        return headerNode;
    }
    // Placeholder to put content in
    const placeholder = document.getElementsByClassName("detailsOutput");
    // Data to use
    const currentDetails = details.getCurrent(id);
    // Create table
    const detailsTableHeaders = ["", "Antall", "Prosent"];
    const table = document.createElement("table");
    // Create table headers
    table.appendChild(createTableHeader(detailsTableHeaders));
    
    // Append all rows to table object
    for (let data of rowData) {
        // Destructure array
        let [title, type, eduType] = data;
        createTableRow(
            table,
            compileRowData(currentDetails, title, type, eduType),
            headerCells
        );
    }
    const paragraph = createParagraph(currentDetails, id);
    const headerText = `Siste oppdaterte statistikk for ${currentDetails.navn}:`;
    const header = createHeader(headerText);
    const historyHeaderText = `Historisk statistikk for ${currentDetails.navn}:`;
    const historyHeader = createHeader(historyHeaderText);
    // Clear placeholder
    removeChildNodes(placeholder[0]);
    // Append items to placeholder
    placeholder[0].appendChild(header);
    placeholder[0].appendChild(paragraph);
    placeholder[0].appendChild(table);
    placeholder[0].appendChild(historyHeader);
}