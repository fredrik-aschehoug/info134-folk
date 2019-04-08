function Population(url) {
    // Properties
    this.url = url;
    this.onload = null;
    this.dataset = null;
    this.elements = null;

    // Methods
    this.getNames = function () {
        let names = [];
        for (let element in this.elements) {
            names.push(element);
        }
        return names;
    };
    this.getIDs = function () {
        let ids = [];
        for (let element in this.elements) {
            ids.push(this.elements[element].kommunenummer);
        }
        return ids;
    };
    this.getInfo = function (municipalID) {
        let info;
        for (let element in this.elements) {
            if (this.elements[element].kommunenummer === municipalID) {
                return this.elements[element];
            }
        }
    };
    this.load = function () {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = (function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                this.dataset = response.datasett;
                this.elements = response.elementer;
                if (this.onload) { // If the onload property has been set
                    this.onload(this.elements);
                }
            }
        }).bind(this); // Bind the callback's 'this' to the value of Population's 'this'
        xhr.send();
    };
}
