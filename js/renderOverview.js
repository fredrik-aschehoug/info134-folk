/**
 * Create a table containing all municipals.
 * @param {string[]} idList Municipality numbers to include
 * @returns {HTMLTableElement} Overview table
 */
function renderOverview(idList, befolkning) {
    const overviewHeaders = ["Navn", "Kommunenummer", "Total befolkning (2018)"];
    const overview = renderTableElement();
    overview.id = "overviewTable";
    overview.tHead.appendChild(renderTableHeader(overviewHeaders));
    // Create table rows
    for (let i in idList) {
        let info = befolkning.getInfo(idList[i]);
        let row = overview.tBodies[0].insertRow(-1);
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
