/**
 * Create the entire content for the comparison view and append it to the "samanlikning" DIV
 * @param {string} id1 Municipal ID to get details from
 * @param {string} id2 Municipal ID to get details from
 */
function createComparison(id1, id2) {
    function createComparisonTable(historicalDetails) {
        const tables = document.createElement("div");
        const className = "employmentTable";
        const desciptions = ["Kvinner", "Menn", "Begge kjønn"];

        // Create tables
        numberTable = createTableElement();
        percentTable = createTableElement();

        // Create table headers
        const tableHeaders = createTableHeaders("employment", historicalDetails);
        numberTable.tHead.appendChild(createTableHeader(tableHeaders));
        percentTable.tHead.appendChild(createTableHeader(tableHeaders));
        // Create rows
        createTableBody(desciptions, tableHeaders, historicalDetails, numberTable.tBodies[0], "number", "employment");
        createTableBody(desciptions, tableHeaders, historicalDetails, percentTable.tBodies[0], "percent", "employment");
        // Assign classes
        numberTable.classList.add(className, "activeTable");
        percentTable.classList.add(className);

        appendElements(tables, numberTable, percentTable);
        return tables;

    }
    // Placeholder to put content in
    const placeholder = document.getElementsByClassName("ComparisonOutput");
    // Data to use
    const historicalDetails1 = details.getHistorical(id1);
    const historicalDetails2 = details.getHistorical(id2);

    const table1 = createComparisonTable(historicalDetails1);

    // Clear placeholder
    removeChildNodes(placeholder[0]);
    // Append item to placeholder
    placeholder[0].appendChild(table1);

}