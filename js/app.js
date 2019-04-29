// Global variables
const oversikt = document.getElementsByClassName("oversikt")[0];
const overviewHeaders = ["Navn", "Kommunenummer", "Total befolkning"];
let ids; // Will be assigned array of all municipal ID's
/**
 * @param {string} id The dataset ID
 */
getURL = (id) => `http://wildboy.uib.no/~tpe056/folk/${id}.json`;
// Instanciate objects
const befolkning = new Dataset(getURL("104857"));
const sysselsatte = new Dataset(getURL("100145"));
const utdanning = new Dataset(getURL("85432"));
const details = new Details(2017);
// Assign callback functions
befolkning.onload = befolkningCallback;
sysselsatte.onload = sysselsatteCallback;
utdanning.onload = utdanningCallback;
/**
 * Runs when befolkning is fully loaded.
 * Loads sysselsatte.
 */
function befolkningCallback() {
    sysselsatte.load();
}
/**
 * Runs when sysselsatte is fully loaded.
 * Loads utdanning.
 */
function sysselsatteCallback() {
    utdanning.load();
}
/**
 * Runs when utdanning is fully loaded
 */
function utdanningCallback() {
    let ids = befolkning.getIDs();
    // Add overview to DOM
    oversikt.appendChild(createOverview(ids, overviewHeaders));
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
    const comparisonForm = document.getElementById("comparisonForm");
    // Callback when clicking button
    detailsForm.detailsButton.onclick = () => detailsFormSubmit(ids);
    comparisonForm.comparisonButton.onclick = () => comparisonFormSubmit(ids);
    // Callback when pressing enter while focused on form
    detailsForm.onsubmit = () => detailsFormSubmit(ids);
    comparisonForm.addEventListener("keydown", key => {
        if (key.keyCode === 13) {
            comparisonFormSubmit(ids);
        }
    });
}
<<<<<<< HEAD
/**
 * Get value from input and create details view.
 * @callback detailsFormSubmit
 * @type {detailsFormSubmit}
 * @param {string[]} ids Array of all municipal ids.
 */
function detailsFormSubmit(ids) {
    const detailsForm = document.getElementById("detailsForm");
    const id = detailsForm.detailsInput.value;
    // Check if valid ID
    if (ids.includes(id)) {
        createDetails(id);
        getAll('.mouseOver', '.activeTable')
        mouseOverFunc(id);
    } else if (id === "5061") {
        alert(`Rindal (${id}) har ikkje noko statistikk, du vil bli omdirigert til Rindal (-2018) (1567)`);
        createDetails("1567");
        mouseOverFunc("1567");

    } else {
        alert(`${id} er ikkje eit gyldig kommunenummer`);
    }
}
/**
 * Get value from input and create comparison view.
 * @callback detailsFormSubmit
 * @type {detailsFormSubmit}
 * @param {string[]} ids Array of all municipal ids.
 */
function comparisonFormSubmit(ids) {
    const comparisonForm = document.getElementById("comparisonForm");
    const id1 = comparisonForm.comparisonInput1.value;
    const id2 = comparisonForm.comparisonInput2.value;
    // Check if valid IDs
    if (ids.includes(id1) && ids.includes(id2) && id1 !== id2) {
        createComparison(id1, id2);
    } else if (id1 === "5061" && id2 === "5061") {
        alert("Du kan ikkje samanlikne to like kommuner");
    } else if (id1 === "5061") {
        alert(`Rindal (${id1}) har ikkje noko statistikk, du vil bli omdirigert til Rindal (-2018) (1567)`);
        createComparison("1567", id2);
    } else if (id2 === "5061") {
        alert(`Rindal (${id2}) har ikkje noko statistikk, du vil bli omdirigert til Rindal (-2018) (1567)`);
        createComparison(id1, "1567");
    } else if (!ids.includes(id1) && !ids.includes(id2)) {
        alert(`Verken ${id1} eller ${id2} er eit gyldig kommunenummer`);
    } else if (!ids.includes(id1)) {
        alert(`${id1} er ikkje eit gyldig kommunenummer`);
    } else if (!ids.includes(id2)) {
        alert(`${id2} er ikkje eit gyldig kommunenummer`);
    } else if (id1 === id2) {
        alert("Du kan ikkje samanlikne to like kommuner");
    }
}
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

=======
>>>>>>> 8a87a9c2efe157894c03cd9f9b944f5b1cd196d7
setNavigationBehaviour(buttonHandler);
befolkning.load();