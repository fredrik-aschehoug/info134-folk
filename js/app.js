const URL_wildboy_104857 = "http://wildboy.uib.no/~tpe056/folk/104857.json";
const oversikt = document.getElementsByClassName("oversikt")[0];
const overviewHeaders = ["Navn", "Kommunenummer", "Total befolkning"];

const befolkning = new Population(URL_wildboy_104857);

/**
 * Runs when befolkning is fully loaded
 * @callback
 */
befolkning.onload = function() {
    let names = befolkning.getNames();
    let ids = befolkning.getIDs();
    let by = befolkning.getInfo(ids[1]);
    oversikt.appendChild(createOverview(ids, overviewHeaders));
};
/**
 * @param {Array} idList Municipality numbers to include
 * @param {Array} overviewHeaders Table headers
 * @returns {HTMLTableElement} Overview table
 */
function createOverview(idList, overviewHeaders) {
    const overview = document.createElement("table");
    const headerRow = overview.insertRow(-1);
    // Create teble headers
    for (let i in overviewHeaders) {
        let th = document.createElement("th");
        th.innerHTML = overviewHeaders[i];
        headerRow.appendChild(th);
    }
    // Create table rows
    for (let i in idList) {
        let info = befolkning.getInfo(idList[i]);
        let row = overview.insertRow(-1);
        let name = row.insertCell(-1);
        name.innerHTML = info.navn;
        let id = row.insertCell(-1);
        id.innerHTML = info.kommunenummer;
        let population = row.insertCell(-1);
        population.innerHTML = info.Kvinner["2018"] + info.Menn["2018"];
    }
    return overview;
}

befolkning.load();
