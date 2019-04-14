/**
 * 
 * Kommunens navn, kommunenummer, siste målte befolkning, 
 * siste målte statistikk for sysselseting og
 * høyere utdanning (antall og prosent). 
 * @constructor
 * @param {Number} currentYear - The current year. Used in .getCurrent().
 */
function Details(currentYear) {
    this.elements = {};
    this.currentYear = currentYear;
    /**
     * @method
     * @param {String} id
     * @returns {Object} Current stats for municipal
     */
    this.getCurrent = function (id) {
        // Define the object to return
        let current = {
            population: {
                number: {},
                percent: {}
            },
            employment: {
                number: {},
                percent: {}
            },
            education: {
                number: {},
                percent: {}
            }
        };
        current.navn = this.elements[id].navn;
        current.year = this.currentYear;
        // Add population data
        let population = this.elements[id].population;
        for (let type in population) {
            for (let gender in population[type]) {
                current.population[type][gender] = population[type][gender][current.year];
            }
        }
        // Add employment data
        let employment = this.elements[id].employment;
        for (let type in employment) {
            for (let gender in employment[type]) {
                current.employment[type][gender] = employment[type][gender][current.year];
            }
        }
        // Add education data
        let education = this.elements[id].education;
        for (let type in education) {
            for (let eduLevel in education[type]) {
                current.education[type][eduLevel] = {};
                for (let gender in education[type][eduLevel]) {
                    let currentGender = education[type][eduLevel][gender][current.year];
                    current.education[type][eduLevel][gender] = currentGender;
                }
            }
        }
        return current;
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
        // Define the object to return
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
    };
    /**
     * @method 
     * @param {Object} population
     * @returns {Object} - Population stats. Amount in number and percentage.
     * 
     */
    this.addPopulation = function (population) {
        // Define the object to return
        let populationElement = {
            number: {
                total: {}
            },
            percent: {
                kvinner: {},
                menn: {}
            }
        };
        // Add population number
        populationElement.number.kvinner = population.Kvinner;
        populationElement.number.menn = population.Menn;
        // Calculate total population for each year
        for (let year in populationElement.number.kvinner) {
            let kvinner = populationElement.number.kvinner[year];
            let menn = populationElement.number.menn[year];
            populationElement.number.total[year] = kvinner + menn;
        }
        // Calculate new data (percentage)
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
        // Define the object to return
        let employmentElement = {
            percent: {},
            number: {
                kvinner: {},
                menn: {},
                total: {}
            }
        };
        // Add employment percent
        employmentElement.percent.kvinner = employment.Kvinner;
        employmentElement.percent.menn = employment.Menn;
        employmentElement.percent.total = employment["Begge kjønn"];
        /**
         * Calculate new data (number)
         * Using population because there are more data in employment, 
         * that way we only get the overlapping years
         */
        for (let year in population.Kvinner) {
            let kvinner = employmentElement.percent.kvinner[year];
            let menn = employmentElement.percent.menn[year];
            // Prosentandel * total / 100
            let kvinnerNumber = population.Kvinner[year] * kvinner / 100;
            let mennNumber = population.Menn[year] * menn / 100;
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
        let educationElement = {
            percent: {},
            number: {}
        };
        for (let eduLevel in education) {
            if (eduLevel !== "kommunenummer" && eduLevel !== "navn") {
                // Add existing data (percent)
                educationElement.percent[eduLevel] = education[eduLevel];
                educationElement.percent[eduLevel].total = {};
                // Append objects 
                educationElement.number[eduLevel] = {
                    kvinner: {},
                    menn: {},
                    total: {}
                };
            }
            /**
             * Calculate new data (number)
             * Using population because there are more data in education, 
             * that way we only get the overlapping years
             */
            for (let year in population.Kvinner) {
                // Find population based on percentage
                if (eduLevel !== "kommunenummer" && eduLevel !== "navn") {
                    // The year needs to exist, but can be === 0
                    if (education[eduLevel].Menn[year] || education[eduLevel].Menn[year] === 0) {
                        // Calculate number from total population and percentage of population
                        let kvinnerNumber = (population.Kvinner[year] * education[eduLevel].Kvinner[year]) / 100;
                        let mennNumber = (population.Menn[year] * education[eduLevel].Menn[year]) / 100;
                        let totalNumber = kvinnerNumber + mennNumber;
                        let totalPopulation = population.Kvinner[year] + population.Menn[year];
                        // andel / total * 100
                        let totalPercent = (totalNumber / totalPopulation) * 100;
                        // Add result to object
                        educationElement.number[eduLevel].kvinner[year] = Math.round(kvinnerNumber);
                        educationElement.number[eduLevel].menn[year] = Math.round(mennNumber);
                        educationElement.number[eduLevel].total[year] = Math.round(totalNumber);
                        educationElement.percent[eduLevel].total[year] = Math.round(totalPercent);
                    }
                }
            }
        }
        return educationElement;
    };
}