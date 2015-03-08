var supportedModules = [
    {
        name: "Slack",
        functionPointer: generateSlackModule,
        id: "slackId"
    }
];

function generateList() {
    var listElementString = "";
    for (var i = 0; i < supportedModules.length; i++) {
        listElementString += "<li><a href=\"javascript:void(0);\"  onclick=\"javascript:checkCheckBox('" + supportedModules[i].id + "');\">" + supportedModules[i].name + "<input type=\"checkbox\" id=\"" + supportedModules[i].id + "\" style=\"float:right;\"/></a></li>";
        // listElement = "<li><a href=\"javascript:void(0);\" onclick=\"javascript:console.log('meow');\">" + supportedModules[i].name + "<input type=\"checkbox\" id=\"" + supportedModules[i].id + "\" onclick=\"javascript: console.log('meow');\" style=\"float:right;\"/></a></li>";
    }
    if (listElementString.length > 0) {
        $("#selectionDropdown").append(listElementString);
    }
};

function checkCheckBox(idName) {
    if (event.target.nodeName !== "INPUT") {
        $("#" + idName).prop('checked', !$("#" + idName).is(':checked'));
    }
}

function generateModules() {
    $("#rowContent").empty();
    var domElementString = "";
    for (var i = 0; i < supportedModules.length; i++) {
        if ($("#" + supportedModules[i].id).is(':checked')) {
            domElementString += generateModuleString(supportedModules[i]);
        }
    }
    if (domElementString.length > 0) {
        $("#rowContent").append(domElementString);
    }
};

function generateModuleString(specificObjectToGenerate) {
    var returnString = "<div id='" + specificObjectToGenerate.id + "Module' class='col-md-4'>";
    // var functionReturn = specificObjectToGenerate.functionPointer();
    returnString += "<div class='well well-sm'>";

    returnString += "<div class='panel panel-primary'>";
    returnString += "<div class='panel-heading'>";
    returnString += "<h3 class='panel-title'>";
    returnString += specificObjectToGenerate.name;
    returnString += "</h3>";
    returnString += "</div>";
    returnString += "<div class='panel-body'>";
    returnString += specificObjectToGenerate.functionPointer();
    returnString += "</div>";
    returnString += "</div>";

    returnString += "</div>";
    returnString += "</div>";
    return returnString;
}