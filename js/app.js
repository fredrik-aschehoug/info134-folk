// Global variables
const oversikt = document.getElementsByClassName("oversikt")[0];
const overviewHeaders = ["Navn", "Kommunenummer", "Total befolkning"];
let ids; // Will be assigned array of all municipal ID's
// Returns wildboy URL
getURL = (id) => `http://wildboy.uib.no/~tpe056/folk/${id}.json`;
// Instanciate objects
const befolkning = new Population(getURL("104857"));
const sysselsatte = new Employment(getURL("100145"));
const utdanning = new Education(getURL("85432"));
const details = new Details(2017);

/**
 * Runs when befolkning is fully loaded
 * @callback
 */
befolkning.onload = function () {
    // Add overview to DOM
    ids = befolkning.getIDs();
    oversikt.appendChild(createOverview(ids, overviewHeaders));
    sysselsatte.load();
};
/**
 * Runs when sysselsatte is fully loaded
 * @callback
 */
sysselsatte.onload = function () {
    utdanning.load();
};
/**
 * Runs when utdanning is fully loaded
 * @callback
 */
utdanning.onload = function () {
    /**
     * Get value from input and create details view.
     * @callback detailsFormSubmit
     * @type {detailsFormSubmit}
     */
    function detailsFormSubmit() {
        const detailsForm1 = document.getElementById("detailsForm");
        id = detailsForm1.detailsInput.value;
        // Check if valid ID
        if (ids.includes(id)){
            createDetails(id);
        } else {
            alert(`${id} er ikkje eit gyldig kommunenummer`);
        }
    }
    let ids = befolkning.getIDs();
    for (let id of ids) {
        details.addMunicipal(
            id,
            befolkning.getInfo(id),
            sysselsatte.getInfo(id),
            utdanning.getInfo(id)
        );
    }
    /* All data is loaded at this point */
    const detailsForm = document.getElementById("detailsForm");
    // Callback when clicking button
    detailsForm.detailsButton.onclick = detailsFormSubmit;
    // Callback when pressing enter while focused on form
    detailsForm.onsubmit = detailsFormSubmit;
};
/**
 * @param {string[]} idList Municipality numbers to include
 * @param {string[]} overviewHeaders Table headers
 * @returns {HTMLTableElement} Overview table
 */
function createOverview(idList, overviewHeaders) {
    const overview = document.createElement("table");
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

setNavigationBehaviour(buttonHandler);
befolkning.load();