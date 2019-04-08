function Population(url) {
    // Properties
    this.url = url;
    this.onload = null;
    this.dataset = null;
    this.elements = null;

    // Methods
    this.getNames = function () {

    };
    this.getIDs = function () {
        
    };
    this.getInfo = function (municipalID) {

    };
    this.load = function () {
        const callback = this.onload;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = (function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                this.dataset = response.datasett;
                this.elements = response.elementer;
                if (callback) {
                    callback(this.elements);
                }
            
            }
        }).bind(this); // Bind the callback's 'this' to the value of Population's 'this'
        xhr.send();

    };
}
