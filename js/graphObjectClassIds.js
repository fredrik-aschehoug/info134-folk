function graphRender(id) {
    id = id;
    const graphDataObject = {
        "elementIdArrays": [
            ["popKvinner", "popMenn", "popTotal", "popKvinnerPercent", "popMennPercent", "empKvinner", "empMenn",
                "empTotal", "empKvinnerPercent", "empMennPercent", "empTotalPercent", "highEduKvinner", "highEduMenn",
                "highEduTotal", "highEduKvinnerPercent", "highEduMennPercent", "HighEduTotalPercent", "fagskoleKvinner",
                "fagskoleMenn", "fagskoleTotal", "fagskoleKvinnerPercent", "fagskoleMennPercent", "fagskoleTotalPercent",
                "highEduShortK", "highEduShortM", "highEduShortTot", "highEduShortKPercent", "highEduShortMPercent",
                "highEduShortTotPercent", "highEduLongK", "highEduLongM", "highEduLongTot", "highEduLongKPercent",
                "highEduLongMPercent", "highEduLongTotPercent",],
            ["population",
                "employment",
                "education1",
                "education2",
                "education3",
                "education4",]],
        "elementIdObj": [" number",
            " number",
            " number",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent",
            " number",
            " number",
            " number",
            " percent",
            " percent",
            " percent"],
        "elementIdObj2": ["", "", "", "", "", "", "", "", "", "",
            "", " 12", " 12", " 12", " 12", " 12", " 12", " 11", " 11", " 11",
            " 11", " 11", " 11", " 03a", " 03a", " 03a", " 03a", " 03a", " 03a", " 04a",
            " 04a", " 04a", " 04a", " 04a", " 04a"],
        "elementIdObj3": [
            " population", " population", " population", " population", " population",
            " employment", " employment", " employment", " employment", " employment", " employment",
            " education1", " education1", " education1", " education1", " education1", " education1",
            " education2", " education2", " education2", " education2", " education2", " education2",
            " education3", " education3", " education3", " education3", " education3", " education3",
            " education4", " education4", " education4", " education4", " education4", " education4",],
        "elementIdObj4": [
            " kvinner", " menn", " totalt", " kvinner", " menn",
            " kvinner", " menn", " totalt", " kvinner", " menn", " totalt",
            " kvinner", " menn", " totalt", " kvinner", " menn", " totalt",
            " kvinner", " menn", " totalt", " kvinner", " menn", " totalt",
            " kvinner", " menn", " totalt", " kvinner", " menn", " totalt",
            " kvinner", " menn", " totalt", " kvinner", " menn", " totalt",

        ]
    };
    setHtmlIds('.mouseOver', graphDataObject.elementIdArrays, 0);
    setHtmlIds('.canvasDiv', graphDataObject.elementIdArrays, 1);
    setHtmlClass(".mouseOver", graphDataObject.elementIdObj);
    setHtmlClass(".mouseOver", graphDataObject.elementIdObj3);
    setHtmlClass(".mouseOver", graphDataObject.elementIdObj2);
    //setHtmlClass(".mouseOver", graphDataObject.elementIdObj4);
    return graphDataObject;
}