/**
 * Create the entire content for the details view and append it to the "detaljar" DIV
 * @function
 * @param {String} id - Municipal ID to get details from
 */
function createDetails(id) {
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
        for (let i in headers) {
            let th = document.createElement("th");
            th.innerHTML = headers[i];
            headerRow.appendChild(th);
        }
        return headerRow;
    }
    /**
     * Appends rowData to table. 3 cells per row.
     * @function
     * @param {HTMLTableElement} table - The table to append data to
     * @param {Array} rowData          - The data to append
     */
    function createTableRow(table, rowData) {
        const row = table.insertRow(-1);
        const rowDesc = row.insertCell(-1);
        rowDesc.innerHTML = rowData[0];
        const rowAntall = row.insertCell(-1);
        rowAntall.innerHTML = rowData[1];
        const rowProsent = row.insertCell(-1);
        rowProsent.innerHTML = rowData[2];
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
        let rowdata;
        if (type) {
            switch (title) {
                case "Kvinner":
                    if (eduType) {
                        rowdata = [
                            "Kvinner",
                            currentDetails[type].number[eduType].Kvinner,
                            currentDetails[type].percent[eduType].Kvinner
                        ];
                    } else {
                        rowdata = [
                            "Kvinner",
                            currentDetails[type].number.Kvinner,
                            currentDetails[type].percent.Kvinner
                        ];
                    }
                    break;
                case "Menn":
                    if (eduType) {
                        rowdata = [
                            "Menn",
                            currentDetails[type].number[eduType].Menn,
                            currentDetails[type].percent[eduType].Menn
                        ];
                    } else {
                        rowdata = [
                            "Menn",
                            currentDetails[type].number.Menn,
                            currentDetails[type].percent.Menn
                        ];
                    }
                    break;
                case "Begge kjønn":
                    if (currentDetails[type].percent.total || currentDetails[type].percent[eduType]) {
                        if (eduType) {
                            rowdata = [
                                "Begge kjønn",
                                currentDetails[type].number[eduType].total,
                                currentDetails[type].percent[eduType].total
                            ];
                        } else {
                            rowdata = [
                                "Begge kjønn",
                                currentDetails[type].number.total,
                                currentDetails[type].percent.total
                            ];
                        }
                    } else {
                        rowdata = [
                            "Begge kjønn",
                            currentDetails[type].number.total,
                            ""
                        ];
                    }
                    break;
            }
        } else {
            rowdata = [title, "", ""];
        }
        return rowdata;
    }
    /**
     * Removes all childnodes of the given DOM node.
     * @function
     * @param {HTMLElement} node 
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
    // Array with parameters for the compileRowData function
    const rowData = [
        ["Befolkning"],
        ["Kvinner", "population"],
        ["Menn", "population"],
        ["Begge kjønn", "population"],
        ["Sysselseting"],
        ["Kvinner", "employment"],
        ["Menn", "employment"],
        ["Begge kjønn", "employment"],
        ["Utdanning"],
        ["Kvinner", "education", "01"],
        ["Menn", "education", "01"],
        ["Begge kjønn", "education", "01"],
        ["Videregående skole-nivå"],
        ["Kvinner", "education", "02a"],
        ["Menn", "education", "02a"],
        ["Begge kjønn", "education", "02a"],
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
        ["Uoppgitt eller ingen fullført utdanning"],
        ["Kvinner", "education", "04a"],
        ["Menn", "education", "04a"],
        ["Begge kjønn", "education", "04a"],
    ];
    // Append all rows to table object
    for (let data of rowData) {
        // Destructure array
        let [title, type, eduType] = data;
        createTableRow(
            table,
            compileRowData(currentDetails, title, type, eduType)
        );
    }
    const paragraph = createParagraph(currentDetails, id);
    const headerText = `Siste oppdaterte statistikk for ${currentDetails.navn}:`;
    const header = createHeader(headerText);
    // Clear placeholder
    removeChildNodes(placeholder[0]);
    // Append items to placeholder
    placeholder[0].appendChild(header);
    placeholder[0].appendChild(paragraph);
    placeholder[0].appendChild(table);
}