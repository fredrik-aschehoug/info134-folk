/**
 * 
 * Kommunens navn, kommunenummer, siste målte befolkning, 
 * siste målte statistikk for sysselseting og
 * høyere utdanning (antall og prosent). 
 * @constructor
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
        element.education = this.addEducation(education, population);
        // Add municipal to elements, using municipal ID as key
        this.elements[id] = element;
        console.log(element);
    };
    /**
     * @method 
     * @param {Object} population
     * @returns {Object} All properties of population object except "navn" and "kommunenummer",
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
     * @method 
     * @param {Object} 
     * @returns {Object} All properties of employment object except "navn" and "kommunenummer" 
     */
    this.addEmployment = function (employment) {
        let employmentElement = {};
        employmentElement.kvinner = employment.Kvinner;
        employmentElement.menn = employment.Menn;
        employmentElement.total = employment["Begge kjønn"];
        return employmentElement;
    };
    /**
     * @method 
     * @param {Object} education
     * @param {Object} population
     * @returns {Object} Education level stats. Amount in number and percentage.
     */
    this.addEducation = function (education, population) {
        let educationElement = {};
        educationElement.percent = {};
        educationElement.number = {};
        // Add existing data (percent)
        for (let element in education) {
            if (element !== "kommunenummer" && element !== "navn") {
                educationElement.percent[element] = education[element];
            }
        }
        /**
         * Calculate new data (number)
         * Using population because there are more data in education, 
         * that way we only get the overlapping years
         */
        for (let eduLevel in education) {
            educationElement.number[eduLevel] = {};
            educationElement.number[eduLevel].kvinner = {}; 
            educationElement.number[eduLevel].menn = {}; 
            for (let year in population.Kvinner) {
                // Find population based on percentage
                if (eduLevel !== "kommunenummer" && eduLevel !== "navn") {
                    if (education[eduLevel].Menn[year]) {
                        // Calculate number from total population and percentage of population
                        let kvinnerNumber = (population.Kvinner[year] * education[eduLevel].Kvinner[year]) / 100; 
                        let mennNumber = (population.Menn[year] * education[eduLevel].Menn[year]) / 100; 
                        // Add result to object
                        educationElement.number[eduLevel].kvinner[year] = Math.round(kvinnerNumber);
                        educationElement.number[eduLevel].menn[year] = Math.round(mennNumber);
                    }
                }
            }
        }
        return educationElement;
    };
}