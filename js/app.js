var URL_wildboy_104857 = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var oversikt = document.getElementsByClassName("oversikt")[0];
const overviewHeaders = ["Navn", "Kommunenummer", "Total befolkning"];

var befolkning = new Population(URL_wildboy_104857);


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
 * Return overview table
 * @param {Array} idList - Municipality numbers to include
 * @param {Array} overviewHeaders - Table headers
 */
function createOverview(idList, overviewHeaders) {
    const overview = document.createElement("table");
    const headerRow = document.createElement("tr");
    // Create teble headers
    for (let i in overviewHeaders) {
        let th = document.createElement("th");
        th.innerHTML = overviewHeaders[i];
        headerRow.appendChild(th);
    }
    overview.appendChild(headerRow);
    // Create table rows
    for (let i in idList) {
        let row = document.createElement("tr");
        let info = befolkning.getInfo(idList[i]);
        let name = document.createElement("td");
        name.innerHTML = info.navn;
        let id = document.createElement("td");
        id.innerHTML = info.kommunenummer;
        let population = document.createElement("td");
        population.innerHTML = info.Kvinner["2018"] + info.Menn["2018"];
        row.appendChild(name);
        row.appendChild(id);
        row.appendChild(population);
        overview.appendChild(row);
    }
    return overview;
}

befolkning.load();
