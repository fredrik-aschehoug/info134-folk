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
        element.employment = this.addEmployment(employment, population);
        // Add employment to object
        element.education = this.addEducation(education, population);
        // Add municipal to elements, using municipal ID as key
        this.elements[id] = element;
        console.log(element);
    };
    /**
     * @method 
     * @param {Object} population
     * @returns {Object} - Population stats. Amount in number and percentage.
     * 
     */
    this.addPopulation = function (population) {
        let populationElement = {};
        // Add population number
        populationElement.number = {};
        populationElement.number.kvinner = population.Kvinner;
        populationElement.number.menn = population.Menn;
        // Calculate total population for each year
        populationElement.number.total = {};
        for (let year in populationElement.number.kvinner) {
            let kvinner = populationElement.number.kvinner[year];
            let menn = populationElement.number.menn[year];
            populationElement.number.total[year] = kvinner + menn;
        }
        // Calculate new data (percentage)
        populationElement.percent = {};
        populationElement.percent.kvinner = {};
        populationElement.percent.menn = {};
        for (let year in populationElement.number.kvinner) {
            let kvinner = populationElement.number.kvinner[year];
            let menn = populationElement.number.menn[year];
            // andel / total * 100
            let kvinnerPercent = (kvinner / populationElement.number.total[year]) * 100;
            let mennPercent = (menn / populationElement.number.total[year]) * 100;
            // Round to max 1 decimal
            populationElement.percent.kvinner[year] = Math.round(kvinnerPercent * 10) / 10;
            populationElement.percent.menn[year] = Math.round(mennPercent * 10) / 10;
        }
        return populationElement;
    };
    /**
     * @method 
     * @param {Object} employment
     * @param {Object} population
     * @returns {Object} Employment level stats. Amount in number and percentage.
     */
    this.addEmployment = function (employment, population) {
        let employmentElement = {};
        // Add employment percent
        employmentElement.percent = {};
        employmentElement.percent.kvinner = employment.Kvinner;
        employmentElement.percent.menn = employment.Menn;
        employmentElement.percent.total = employment["Begge kjønn"];
        // Calculate new data (number)
        employmentElement.number = {};
        employmentElement.number.kvinner = {};
        employmentElement.number.menn = {};
        employmentElement.number.total = {};
        /**
         * Using population because there are more data in employment, 
         * that way we only get the overlapping years
         */ 
        for (let year in population.Kvinner) {
            let kvinner = employmentElement.percent.kvinner[year];
            let menn = employmentElement.percent.menn[year];
            // Prosentandel * total / 100
            let kvinnerNumber = population.Kvinner[year] * kvinner  / 100;
            let mennNumber = population.Menn[year] * menn  / 100;
            // Round to max 1 decimal
            employmentElement.number.kvinner[year] = Math.round(kvinnerNumber);
            employmentElement.number.menn[year] = Math.round(mennNumber);
            employmentElement.number.total[year] = Math.round(kvinnerNumber) + Math.round(mennNumber);

        }
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
        // Calculate new data (number)
        for (let eduLevel in education) {
            educationElement.number[eduLevel] = {};
            educationElement.number[eduLevel].kvinner = {}; 
            educationElement.number[eduLevel].menn = {};
            /**
             * Using population because there are more data in education, 
             * that way we only get the overlapping years
             */ 
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