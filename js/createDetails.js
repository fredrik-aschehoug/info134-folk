function createDetails(id) {
    const placeholder = document.getElementsByClassName("detaljar");
    const detailsHeader = document.getElementById("detailsHeader");
    const currentDetails = details.getCurrent(id);
    // Append text elements:
    const paragraph = document.createElement("p");
    const kommunenavn = document.createTextNode(`Kommunenavn: ${currentDetails.navn}`);
    const kommunenummer = document.createTextNode(`Kommunenummer: ${id}`);
    paragraph.appendChild(kommunenavn);
    paragraph.appendChild(document.createElement("br"));
    paragraph.appendChild(kommunenummer);
    paragraph.appendChild(document.createElement("br"));
    // Append name to header
    detailsHeader.innerHTML += currentDetails.navn + ":";
    // Create table
    const detailsTableHeaders = ["", "Antall", "Prosent"];
    const table = document.createElement("table");
    // Create table headers
    table.appendChild(createTableHeader(detailsTableHeaders));
    const rowData = [
        ["Befolkning"],
        ["Kvinner", "population"],
        ["Menn", "population"],
        ["Begge kjønn", "population"],
        ["Sysselseting"],
        ["Kvinner", "employment"],
        ["Menn", "employment"],
        ["Begge kjønn", "employment"],
        ["Utdanning"],
        ["Kvinner", "education", "01"],
        ["Menn", "education", "01"],
        ["Begge kjønn", "education", "01"],
        ["Videregående skole-nivå"],
        ["Kvinner", "education", "02a"],
        ["Menn", "education", "02a"],
        ["Begge kjønn", "education", "02a"],
        ["Fagskolenivå"],
        ["Kvinner", "education", "11"],
        ["Menn", "education", "11"],
        ["Begge kjønn", "education", "11"],
        ["Universitets- og høgskolenivå kort"],
        ["Kvinner", "education", "03a"],
        ["Menn", "education", "03a"],
        ["Begge kjønn", "education", "03a"],
        ["Universitets- og høgskolenivå lang"],
        ["Kvinner", "education", "04a"],
        ["Menn", "education", "04a"],
        ["Begge kjønn", "education", "04a"],
        ["Uoppgitt eller ingen fullført utdanning"],
        ["Kvinner", "education", "04a"],
        ["Menn", "education", "04a"],
        ["Begge kjønn", "education", "04a"],

    ];

    for (let data of rowData) {
        // Destructure array
        let [title, type, eduType] = data;
        createTableRow(
            table,
            compileRowData(currentDetails, title, type, eduType)
        );
    }

    // Append items to placeholder
    placeholder[0].appendChild(paragraph);
    placeholder[0].appendChild(table);
    console.log(currentDetails);
}
function compileRowData(currentDetails, title, type, eduType) {
    let rowdata;
    if (type) {
        switch (title) {
            case "Kvinner":
                if (eduType) {
                    rowdata = [
                        "Kvinner",
                        currentDetails[type].number[eduType].Kvinner,
                        currentDetails[type].percent[eduType].Kvinner
                    ];
                } else {
                    rowdata = [
                        "Kvinner",
                        currentDetails[type].number.Kvinner,
                        currentDetails[type].percent.Kvinner
                    ];
                }
                break;
            case "Menn":
                if (eduType) {
                    rowdata = [
                        "Menn",
                        currentDetails[type].number[eduType].Menn,
                        currentDetails[type].percent[eduType].Menn
                    ];
                } else {
                    rowdata = [
                        "Menn",
                        currentDetails[type].number.Menn,
                        currentDetails[type].percent.Menn
                    ];
                }
                break;
            case "Begge kjønn":
                if (currentDetails[type].percent.total || currentDetails[type].percent[eduType]) {
                    if (eduType) {
                        rowdata = [
                            "Begge kjønn",
                            currentDetails[type].number[eduType].total,
                            currentDetails[type].percent[eduType].total
                        ];
                    } else {
                        rowdata = [
                            "Begge kjønn",
                            currentDetails[type].number.total,
                            currentDetails[type].percent.total
                        ];
                    }
                } else {
                    rowdata = [
                        "Begge kjønn",
                        currentDetails[type].number.total,
                        ""
                    ];
                }
                break;
        }
    } else {
        rowdata = [title, "", ""];
    }
    return rowdata;
}
function createTableRow(table, rowData) {
    const befolkningkvinner = table.insertRow(-1);
    const befolkningkvinnerDesc = befolkningkvinner.insertCell(-1);
    befolkningkvinnerDesc.innerHTML = rowData[0];
    const befolkningkvinnerAntall = befolkningkvinner.insertCell(-1);
    befolkningkvinnerAntall.innerHTML = rowData[1];
    const befolkningkvinnerProsent = befolkningkvinner.insertCell(-1);
    befolkningkvinnerProsent.innerHTML = rowData[2];
}

function createTableHeader(headers) {
    const headerRow = document.createElement("tr");
    for (let i in headers) {
        let th = document.createElement("th");
        th.innerHTML = headers[i];
        headerRow.appendChild(th);
    }
    return headerRow;
}
function createCell(text) {
    const node = document.createElement("li");
    const nodeText = document.createTextNode(text);
    node.appendChild(nodeText);
    return node;
}
