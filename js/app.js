var URL_wildboy_104857 = "http://wildboy.uib.no/~tpe056/folk/104857.json";

var befolkning = new Population(URL_wildboy_104857);
befolkning.onload = function(elements) {
    console.log(elements);
    let names = befolkning.getNames();
    let ids = befolkning.getIDs();
    console.log(befolkning.getInfo(ids[1]));
   
};

befolkning.load();
