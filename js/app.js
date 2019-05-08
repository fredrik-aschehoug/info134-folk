// Global variables
const oversikt = document.getElementsByClassName("overview")[0];
let ids; // Will be assigned array of all municipal ID's
/**
 * @param {string} id The dataset ID
 * @returns {string} The url for the dataset id
 */
getURL = (id) => `http://wildboy.uib.no/~tpe056/folk/${id}.json`;
// Instanciate objects
const befolkning = new Dataset(getURL("104857"));
const sysselsatte = new Dataset(getURL("100145"));
const utdanning = new Dataset(getURL("85432"));
const details = new Details("2017");
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
    oversikt.appendChild(renderOverview(ids, befolkning));
    // Add data to details object.
    for (let id of ids) {
        details.addMunicipal(
            id,
            befolkning.getInfo(id),
            sysselsatte.getInfo(id),
            utdanning.getInfo(id)
        );
    }
    /* All data is loaded at this point */
    setNavigationBehaviour(buttonHandler);
    const detailsForm = document.getElementById("detailsForm");
    const comparisonForm = document.getElementById("comparisonForm");
    const overviewForm = document.getElementById("overviewForm");
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
    // Callback when pressing any key while focused on form
    overviewForm.onkeyup = overviewTableFilter;
}
befolkning.load();