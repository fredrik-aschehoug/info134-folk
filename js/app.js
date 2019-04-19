const URL_wildboy_104857 = "http://wildboy.uib.no/~tpe056/folk/104857.json";
const URL_wildboy_100145 = "http://wildboy.uib.no/~tpe056/folk/100145.json";
const URL_wildboy_85432 = "http://wildboy.uib.no/~tpe056/folk/85432.json";
const oversikt = document.getElementsByClassName("oversikt")[0];
const overviewHeaders = ["Navn", "Kommunenummer", "Total befolkning"];

const befolkning = new Population(URL_wildboy_104857);
const sysselsatte = new Employment(URL_wildboy_100145);
const utdanning = new Education(URL_wildboy_85432);
const details = new Details(2017);

/**
 * Runs when befolkning is fully loaded
 * @callback
 */
befolkning.onload = function () {
    let names = befolkning.getNames();
    let ids = befolkning.getIDs();
    let info = befolkning.getInfo(ids[1]);
    oversikt.appendChild(createOverview(ids, overviewHeaders));
    sysselsatte.load();
};
/**
 * Runs when sysselsatte is fully loaded
 * @callback
 */
sysselsatte.onload = function () {
    let ids = befolkning.getIDs();
    let info = sysselsatte.getInfo(ids[1]);
    utdanning.load();
};
/**
 * Runs when utdanning is fully loaded
 * @callback
 */
utdanning.onload = function () {
    let ids = befolkning.getIDs();
    for (let id of ids) {
        details.addMunicipal(
            id,
            befolkning.getInfo(id),
            sysselsatte.getInfo(id),
            utdanning.getInfo(id)
        );
    }
    // All data is loaded at this point

    const detailsForm = document.getElementById("detailsForm");
    // Callback when clicking button
    detailsForm.detailsButton.onclick = detailsFormSubmit;
    // Callback when pressing enter while focused on form
    detailsForm.onsubmit = detailsFormSubmit;
    /**
     * Get value from input and create details view.
     * @callback
     */
    function detailsFormSubmit() {
        const detailsForm1 = document.getElementById("detailsForm");
        id = detailsForm1.detailsInput.value;
        createDetails(id);
    }

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