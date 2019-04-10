/**
 * 
 * Kommunens navn, kommunenummer, siste målte befolkning, 
 * siste målte statistikk for sysselseting og
 * høyere utdanning (antall og prosent). 
 */

function Details() {
    this.elements = {};
    this.getCurrent = function (id) {
        // TODO
    };
    this.getHistorical = function (id) {
        // TODO
    };
    /**
     * Store all relevant information of a municipal in this.elements using "kommunenummer" as the key
     * @method
     * @param {String} id           - The "kommunenummer" to add
     * @param {Object} population   - The returned value from Population.getInfo()
     * @param {Object} employment   - The returned value from Employment.getInfo()
     * @param {Object} education    - The returned value from Education.getInfo()
     */
    this.addMunicipal = function (id, population, employment, education) {
        // Create object to store municipal
        let element = {};
        element.navn = population.navn;
        // Add population to object
        element.population = this.addPopulation(population);
        // Add employment to object
        element.employment = this.addEmployment(employment);
        // Add employment to object
        element.education = this.addEducation(education);
        // Add municipal to elements, using municipal ID as key
        this.elements[id] = element;
    };
    /**
     * Return useful information from object
     * @method 
     * @param {Object} population
     * @returns {Object} All properties of @param population except "navn" and "kommunenummer",
     * and adds total population.
     */
    this.addPopulation = function (population) {
        let populationElement = {};
        populationElement.kvinner = population.Kvinner;
        populationElement.menn = population.Menn;
        populationElement.total = {};
        // Calculate total population for each year
        for (let year in populationElement.kvinner) {
            let kvinner = populationElement.kvinner[year];
            let menn = populationElement.menn[year];
            populationElement.total[year] = kvinner + menn;
        }
        return populationElement;
    };
    /**
     * Return useful information from object
     * @method 
     * @param {Object} 
     * @returns {Object} All properties of @param employment except "navn" and "kommunenummer" 
     */
    this.addEmployment = function (employment) {
        let employmentElement = {};
        employmentElement.kvinner = employment.Kvinner;
        employmentElement.menn = employment.Menn;
        employmentElement.total = employment["Begge kjønn"];
        return employmentElement;
    };
    /**
     * Return useful information from object
     * @method 
     * @param {Object} 
     * @returns {Object} All properties of @param education except "navn" and "kommunenummer" 
     */
    this.addEducation = function (education) {
        let educationElement = {};
        for (let element in education) {
            if (element !== "kommunenummer" && element !== "navn") {
                educationElement[element] = education[element];
            }
        }
        return educationElement;
    };
}