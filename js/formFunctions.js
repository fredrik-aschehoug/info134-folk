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
        renderDetails(id);
        createCanvas();
        createGraph(id);
        // Activate sidenav
        addClass("sidenav", "activeSidenav");
    } else if (id === "5061") {
        alert(`Rindal (${id}) har ikkje noko statistikk, du vil bli omdirigert til Rindal (-2018) (1567)`);
        renderDetails("1567");
        createGraph("1567");
        // Activate sidenav
        activateElement("sidenav", "activeSidenav");
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
        renderComparison(id1, id2);
        createGraphCompare(id1, id2);
    } else if (id1 === "5061" && id2 === "5061") {
        alert("Du kan ikkje samanlikne to like kommuner");
    } else if (id1 === "5061") {
        alert(`Rindal (${id1}) har ikkje noko statistikk, du vil bli omdirigert til Rindal (-2018) (1567)`);
        renderComparison("1567", id2);
    } else if (id2 === "5061") {
        alert(`Rindal (${id2}) har ikkje noko statistikk, du vil bli omdirigert til Rindal (-2018) (1567)`);
        renderComparison(id1, "1567");
        createGraphCompare(id1, id2);
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
 * Sets classname on tr elements according to search query.
 */
function overviewTableFilter() {
    const input = document.getElementById("overviewInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("overviewTable").tBodies[0];
    const rows = table.getElementsByTagName("tr");
    let tdText;
    for (let row of rows) {
        // Select first column
        let td = row.getElementsByTagName("td")[0];
        if (td) {
            tdText = td.innerText;
            if (tdText.toUpperCase().indexOf(filter) > -1) {
                row.className = "visibleRow";
            } else {
                row.className = "hiddenRow";
            }
        }
    }
}
