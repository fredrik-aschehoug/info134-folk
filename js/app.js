// Global variables
const oversikt = document.getElementsByClassName("oversikt")[0];
const overviewHeaders = ["Navn", "Kommunenummer", "Total befolkning"];
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
    let ids = befolkning.getIDs();
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
     * @callback
     */
    function detailsFormSubmit() {
        const detailsForm1 = document.getElementById("detailsForm");
        id = detailsForm1.detailsInput.value;
        createDetails(id);
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
 * @param {Array} idList Municipality numbers to include
 * @param {Array} overviewHeaders Table headers
 * @returns {HTMLTableElement} Overview table
 */
function createOverview(idList, overviewHeaders) {
    const overview = document.createElement("table");
    const headerRow = overview.insertRow(-1);
    // Create table headers
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

setNavigationBehaviour();
befolkning.load();