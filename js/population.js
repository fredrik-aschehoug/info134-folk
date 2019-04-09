/**
 * @constructor
 * @param {String} url wildboy dataset
 */
function Population(url) {
    this.url = url;
    this.onload = null;
    this.dataset = null; // Kan strykes dersom det ikke blir brukt!
    this.elements = null;
    /**
     * @method
     * @returns {Array} All municipal names
     */
    this.getNames = function () {
        let names = [];
        for (let element in this.elements) {
            names.push(element);
        }
        return names;
    };
    /**
     * @method
     * @returns {Array} All municipal IDs
     */
    this.getIDs = function () {
        let ids = [];
        for (let element in this.elements) {
            ids.push(this.elements[element].kommunenummer);
        }
        return ids;
    };
    /**
     * @method
     * @param {String} municipalID
     * @returns {Object} Population information about the municipal
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
     * @method
     * @callback this.onload
     */
    this.load = function () {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = (function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                this.dataset = response.datasett;
                this.elements = response.elementer;
                if (this.onload) { // If the onload property has been set
                    this.onload();
                }
            }
        }).bind(this); // Bind the callback's 'this' to the value of Population's 'this'
        xhr.send();
    };
}
