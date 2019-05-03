/**
 * Create a table containing all municipals.
 * @param {string[]} idList Municipality numbers to include
 * @param {string[]} overviewHeaders Table headers
 * @returns {HTMLTableElement} Overview table
 */
function createOverview(idList, overviewHeaders) {
    const overview = document.createElement("table");
    overview.id = "overviewTable";
    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    overview.appendChild(tableHeader);
    overview.appendChild(tableBody);
    const headerRow = tableHeader.insertRow(-1);
    // Create table headers
    for (let i in overviewHeaders) {
        let th = document.createElement("th");
        th.innerHTML = overviewHeaders[i];
        headerRow.appendChild(th);
    }
    // Create table rows
    for (let i in idList) {
        let info = befolkning.getInfo(idList[i]);
        let row = tableBody.insertRow(-1);
        let name = row.insertCell(-1);
        name.innerHTML = info.navn;
        let id = row.insertCell(-1);
        id.innerHTML = info.kommunenummer;
        let population = row.insertCell(-1);
        // Calcualte population
        let populationCount = info.Kvinner["2018"] + info.Menn["2018"];
        // Format large numbers to Norwegian locale
        populationCount = populationCount.toLocaleString('no');
        population.innerHTML = populationCount;
    }
    return overview;
}
