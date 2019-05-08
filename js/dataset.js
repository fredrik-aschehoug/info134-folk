/**
 * @constructor
 * @param {string} url wildboy dataset url
 */
function Dataset(url) {
    this.url = url;
    this.onload = null;
    this.elements = null;
    /**
     * @returns {string[]} All municipal names
     */
    this.getNames = function () {
        let names = [];
        for (let element in this.elements) {
            names.push(element);
        }
        return names;
    };
    /**
     * @returns {string[]} All municipal IDs
     */
    this.getIDs = function () {
        let ids = [];
        for (let element in this.elements) {
            ids.push(this.elements[element].kommunenummer);
        }
        return ids;
    };
    /**
     * @param {string} municipalID The id of the municipal to get info from
     * @returns {object} Information about the municipal
     */
    this.getInfo = function (municipalID) {
        for (let element in this.elements) {
            if (this.elements[element].kommunenummer === municipalID) {
                let info = this.elements[element];
                info.navn = element;
                return info;
            }
        }
    };
    /**
     * Uses AJAX to load JSON data from url and assign it to the object.
     * Runs a callback when completed.
     */
    this.load = function () {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = (function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.elementer.Rindal) {
                    delete response.elementer.Rindal;
                }
                this.elements = response.elementer;
                if (this.onload) { // If the onload property has been set
                    this.onload();
                }
            }
        }).bind(this); // Bind the callback's 'this' to the value of Dataset's 'this'
        xhr.send();
    };
}