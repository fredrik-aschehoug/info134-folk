/**
 * Create the entire content for the comparison view and append it to the "samanlikning" DIV
 * @param {string} id1 Municipal ID to get details from
 * @param {string} id2 Municipal ID to get details from
 */
function createComparison(id1, id2) {
    function createComparisonTable(historicalDetails, className) {
        const tables = document.createElement("div");
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
    const className = "employmentTable";
    // Placeholder to put content in
    const placeholder = document.getElementsByClassName("comparisonOutput");
    // Data to use
    const historicalDetails1 = details.getHistorical(id1);
    const historicalDetails2 = details.getHistorical(id2);
    // Create headers
    const header1Text = `Sysselsetting i ${historicalDetails1.navn}:`;
    const header2Text = `Sysselsetting i ${historicalDetails2.navn}:`;
    const header1 = createHeader(header1Text, "subHeader");
    const header2 = createHeader(header2Text, "subHeader");
    
    const table1 = createComparisonTable(historicalDetails1, className);
    const table2 = createComparisonTable(historicalDetails2, className);
    // Create one tableToggle for both tables
    const tableToggle = createTableToggle(toggleCallback, className, "employment");

    // Clear placeholder
    removeChildNodes(placeholder[0]);
    // Append item to placeholder
    appendElements(
        placeholder[0], 
        tableToggle, 
        header1,
        table1, 
        header2,
        table2
    );
}