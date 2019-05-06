/**
 * Gather all relevant information about all municipals for all years.
 * Municipal name, municipal number, population, employment and
 * education. Both in count and percentage.
 * @constructor
 * @param {string} currentYear The current year. Used in .getCurrent().
 */
function Details(currentYear) {
    this.elements = {};
    this.currentYear = currentYear;
    /**
     * Get an object with stats only for the current year.
     * @param {string} id Municipal ID
     * @returns {object} Current stats for municipal
     */
    this.getCurrent = function (id) {
        /**
         * Reduces an object. Only the value in the current year is returned.
         * @param {object} historicalObj The object to get the value from
         * @param {string} year The year to get the value from
         * @returns {number} The value for the current year
         */
        function reduceYears(historicalObj, year) {
            let filtered = Object.keys(historicalObj)
                .filter((item) =>  item === year)
                .map((item) => historicalObj[item]);
            console.log(typeof filtered[0]);
            return filtered[0];
        }
        /**
         * Filter out all years except current year.
         * @param {object} obj The object to filter
         * @param {string} year The current year, all others will be filtered out.
         */
        function filterHistorical(obj, year) {
            Object.keys(obj).forEach((key) => {
                let value = reduceYears(obj[key], year);
                obj[key] = value;
            });
        }
        // Define object to return, clone from this so that this is not affected by changes.
        let current = JSON.parse(JSON.stringify(this.elements[id]));
        // Filter out all other years than currentYear
        Object.keys(current.population).forEach((key) => filterHistorical(current.population[key], currentYear));
        Object.keys(current.employment).forEach((key) => filterHistorical(current.employment[key], currentYear));
        // Education has one more level of objects
        for (let format of Object.keys(current.education)) {
            Object.keys(current.education[format]).forEach((key) => filterHistorical(current.education[format][key], currentYear));
        }
        return current;
    };
    /**
     * Get all historical data for a municipal.
     * @param {string} id Municipal ID
     * @returns {object} Historical stats for municipal
     */
    this.getHistorical = function (id) {
        return this.elements[id];
    };
    /**
     * Store all relevant information of a municipal in this.elements using "kommunenummer" as the key
     * @param {string} id The "kommunenummer" to add
     * @param {object} population The returned value from Population.getInfo()
     * @param {object} employment The returned value from Employment.getInfo()
     * @param {object} education The returned value from Education.getInfo()
     */
    this.addMunicipal = function (id, population, employment, education) {
        // Define the object to return
        let element = {};
        element.navn = population.navn;
        // Add population, employment and education to object
        element.population = this.addPopulation(population);
        element.employment = this.addEmployment(employment, population);
        element.education = this.addEducation(education, population);
        // Add municipal to elements, using municipal ID as key
        this.elements[id] = element;
    };
    /** Compile and return population stats for a municipal
     * @param {object} population
     * @returns {object} Population stats. Amount in number and percentage.
     */
    this.addPopulation = function (population) {
        // Define the object to return
        let populationElement = {
            number: {
                total: {}
            },
            percent: {
                Kvinner: {},
                Menn: {}
            }
        };
        // Add population number
        populationElement.number.Kvinner = population.Kvinner;
        populationElement.number.Menn = population.Menn;
        for (let year in populationElement.number.Kvinner) {
            // Calculate total population for each year
            let kvinner = populationElement.number.Kvinner[year];
            let menn = populationElement.number.Menn[year];
            populationElement.number.total[year] = kvinner + menn;
            // Calculate new data (percentage)
            // andel / total * 100
            let kvinnerPercent = (kvinner / populationElement.number.total[year]) * 100;
            let mennPercent = (menn / populationElement.number.total[year]) * 100;
            // Round to max 1 decimal
            populationElement.percent.Kvinner[year] = Math.round(kvinnerPercent * 10) / 10;
            populationElement.percent.Menn[year] = Math.round(mennPercent * 10) / 10;
        }
        return populationElement;
    };
    /**
    /* Compile and return employment stats for a municipal 
     * @param {object} employment
     * @param {object} population
     * @returns {object} Employment level stats. Amount in number and percentage.
     */
    this.addEmployment = function (employment, population) {
        // Define the object to return
        let employmentElement = {
            percent: {},
            number: {
                Kvinner: {},
                Menn: {},
                total: {}
            }
        };
        // Add employment percent
        employmentElement.percent.Kvinner = employment.Kvinner;
        employmentElement.percent.Menn = employment.Menn;
        employmentElement.percent.total = employment["Begge kjønn"];
        /**
         * Calculate new data (number)
         * Using population because there are more data in employment, 
         * that way we only get the overlapping years
         */
        for (let year in population.Kvinner) {
            let kvinner = employmentElement.percent.Kvinner[year];
            let menn = employmentElement.percent.Menn[year];
            // Prosentandel * total / 100
            let kvinnerNumber = population.Kvinner[year] * kvinner / 100;
            let mennNumber = population.Menn[year] * menn / 100;
            // Round number
            employmentElement.number.Kvinner[year] = Math.round(kvinnerNumber);
            employmentElement.number.Menn[year] = Math.round(mennNumber);
            employmentElement.number.total[year] = Math.round(kvinnerNumber) + Math.round(mennNumber);
        }
        return employmentElement;
    };
    /**
     * Compile and return education stats for a municipal 
     * @param {object} education
     * @param {object} population
     * @returns {object} Education level stats. Amount in number and percentage.
     */
    this.addEducation = function (education, population) {
        let educationElement = {
            percent: {},
            number: {}
        };
        /**
        * Calculate new data (number)
        * Using population because there are more data in education, 
        * that way we only get the overlapping years
        * @param {object} population 
        * @param {string} eduLevel Education level code
        * @param {object} education 
        * @param {object} educationElement Defined in parent function
        */
        function calculateEducation(population, eduLevel, education, educationElement) {
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
                        educationElement.number[eduLevel].Kvinner[year] = Math.round(kvinnerNumber);
                        educationElement.number[eduLevel].Menn[year] = Math.round(mennNumber);
                        educationElement.number[eduLevel].total[year] = Math.round(totalNumber);
                        // Round to max 1 decimal
                        educationElement.percent[eduLevel].total[year] = Math.round(totalPercent * 10) / 10;
                    }
                }
            }
        }
        /**
         * Create a new edulevel: 12. Consolidates 11, 03a and 04a.
         * @param {object} educationElement Defined in parent function
         * @returns {object} Consolidated education stats for a municipal.
         */
        function consolidateHigherEdu(educationElement) {
            /**
             * @param {object} educationElement Defined in parent function
             * @param {string} type
             * @param {string} sex
             * @param {string} year
             * @returns {number} The sum of 11, 03a and 04a edu types for the specified type, sex and year.
             */
            function calculateHigherEdu(educationElement, type, sex, year) {
                let calculatedValue = 0;
                calculatedValue += educationElement[type]["11"][sex][year];
                calculatedValue += educationElement[type]["03a"][sex][year];
                calculatedValue += educationElement[type]["04a"][sex][year];
                // Round to max 1 decimal
                return Math.round(calculatedValue * 10) / 10;
            }
            let highEdu = {
                number: {
                    Kvinner: {},
                    Menn: {},
                    total: {}
                },
                percent: {
                    Kvinner: {},
                    Menn: {},
                    total: {}
                }
            };
            // If municipal exists in education dataset
            if (educationElement.number["11"]) {
                let years = educationElement.number["11"].Kvinner;
                for (let year in years) {
                    highEdu.number.Kvinner[year] = calculateHigherEdu(educationElement, "number", "Kvinner", year);
                    highEdu.number.Menn[year] = calculateHigherEdu(educationElement, "number", "Menn", year);
                    highEdu.number.total[year] = calculateHigherEdu(educationElement, "number", "total", year);
                    highEdu.percent.Kvinner[year] = calculateHigherEdu(educationElement, "percent", "Kvinner", year);
                    highEdu.percent.Menn[year] = calculateHigherEdu(educationElement, "percent", "Menn", year);
                    highEdu.percent.total[year] = calculateHigherEdu(educationElement, "percent", "total", year);
                }
            }
            return highEdu;
        }
        for (let eduLevel in education) {
            if (eduLevel !== "kommunenummer" && eduLevel !== "navn") {
                // Add existing data (percent)
                educationElement.percent[eduLevel] = education[eduLevel];
                educationElement.percent[eduLevel].total = {};
                // Append objects 
                educationElement.number[eduLevel] = {
                    Kvinner: {},
                    Menn: {},
                    total: {}
                };
            }
            calculateEducation(population, eduLevel, education, educationElement);
        }
        let higherEdu = consolidateHigherEdu(educationElement);
        educationElement.number["12"] = higherEdu.number;
        educationElement.percent["12"] = higherEdu.percent;
        return educationElement;
    };
}