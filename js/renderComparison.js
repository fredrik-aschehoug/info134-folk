/**
 * Create the entire content for the comparison view and append it to the "samanlikning" DIV
 * @param {string} id1 Municipal ID to get details from
 * @param {string} id2 Municipal ID to get details from
 */
function renderComparison(id1, id2) {
    /**
     * Create two tables inside a <div>. One for number and one for percentage.
     * @param {object} historicalDetails From details.getHistorical(id)
     * @param {string} className The classname to assign to the tables
     * @returns {HTMLDivElement} <div> containing the tables, number and percentage.
     */
    function renderComparisonTable(historicalDetails, className) {
        const tables = document.createElement("div");
        const canvas = document.createElement("div");
        const canvasRend = document.createElement("div");
        const desciptions = ["Kvinner", "Menn", "Begge kjønn"];
        const tableHeaderClass = "tableHeader";
        // Create table elements
        numberTable = renderTableElement();
        percentTable = renderTableElement();
        // Create table headers
        const tableHeaders = createTableHeaders("employment", historicalDetails);
        numberTable.tHead.appendChild(renderTableHeader(tableHeaders, tableHeaderClass));
        percentTable.tHead.appendChild(renderTableHeader(tableHeaders, tableHeaderClass));
        // Create rows
        renderTableBody(desciptions, tableHeaders, historicalDetails, numberTable.tBodies[0], "number", "employment");
        renderTableBody(desciptions, tableHeaders, historicalDetails, percentTable.tBodies[0], "percent", "employment");
        // Assign classes
        numberTable.classList.add(className, "activeTable");
        percentTable.classList.add(className);
        canvas.classList.add("canvasBtn");
        canvasRend.classList.add("canvasRend");
        // Append elements to return element
        appendElements(tables, numberTable, percentTable, canvas, canvasRend);
        return tables;
    }
    /**
     * Takes two tables as parameters, compares them and assigns a class to the table cells 
     * with the highest growth in percentage points.
     * @param {HTMLDivElement} table1 From createComparisonTable
     * @param {HTMLDivElement} table2 From createComparisonTable
     */
    function highlightTables(table1, table2) {
        let rows = ["popKvinner", "popMenn", "popTotal"];
        for (let row of rows) {
            let table1aRow1 = table1.childNodes[1].rows[row].cells;
            let table1bRow1 = table1.childNodes[0].rows[row].cells;
            let table2aRow1 = table2.childNodes[1].rows[row].cells;
            let table2bRow1 = table2.childNodes[0].rows[row].cells;
            // Start loop on third cell. First cell is heading, second does not have anything to compare to
            for (let i = 2; i < table1aRow1.length; i++) {
                let t1ValueNow = parseFloat(table1aRow1[i].innerText);
                let t1ValuePast = parseFloat(table1aRow1[i - 1].innerText);
                let t2ValueNow = parseFloat(table2aRow1[i].innerText);
                let t2ValuePast = parseFloat(table2aRow1[i - 1].innerText);
                let t1Diff = t1ValueNow - t1ValuePast;
                let t2Diff = t2ValueNow - t2ValuePast;
                if (t1Diff > t2Diff) {
                    table1aRow1[i].classList.add("highlightedCell");
                    table1bRow1[i].classList.add("highlightedCell");
                } else if (t1Diff < t2Diff){
                    table2aRow1[i].classList.add("highlightedCell");
                    table2bRow1[i].classList.add("highlightedCell");
                } else if (t1Diff === t2Diff) {
                    table1aRow1[i].classList.add("highlightedCell2");
                    table1bRow1[i].classList.add("highlightedCell2");
                    table2aRow1[i].classList.add("highlightedCell2");
                    table2bRow1[i].classList.add("highlightedCell2");
                }
            }
        }
    }
    // Will be assigned to the tables
    const className = "employmentTable";
    // Placeholder to put content in
    const placeholder = document.getElementsByClassName("comparisonOutput");
    // Data to use
    const historicalDetails1 = details.getHistorical(id1);
    const historicalDetails2 = details.getHistorical(id2);
    // Create headers
    const header1Text = `Sysselsetting i ${historicalDetails1.navn}:`;
    const header2Text = `Sysselsetting i ${historicalDetails2.navn}:`;
    const header1 = renderHeader(header1Text, "subHeader");
    const header2 = renderHeader(header2Text, "subHeader");
    // Create paragraph
    const paragraph = document.createElement("p")
    paragraph.innerHTML = `
        Denne sida lar deg samanlikne sysselsetjinga i to ulike kommuner. Tabellane kan visast med anten prosent eller tal.
        Tabellane markerar også kven av kommunane som har størst vekst i prosentpoeng; per år og per kjønnskategori. </br>
        <span class="highlightedCell">Markering for celle med størst vekst</span></br>
        <span class="highlightedCell2">Markering for celle med lik vekst</span>
    `;
    // Create tables
    const table1 = renderComparisonTable(historicalDetails1, className);
    const table2 = renderComparisonTable(historicalDetails2, className);
    highlightTables(table1, table2);
    // Create one tableToggle for both tables
    const tableToggle = renderTableToggle(toggleCallback, className, "employment", "Comparison");
    // Clear placeholder
    removeChildNodes(placeholder[0]);
    // Append item to placeholder
    appendElements(
        placeholder[0], 
        paragraph,
        tableToggle, 
        header1,
        table1, 
        header2,
        table2
    );
}