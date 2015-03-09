// New modules need to be added here.
var supportedModules = [
    {
        name: "Slack",
        functionPointer: generateSlackModule,
        id: "slackId"
    },
    {
        name: "Youtube Playlist",
        functionPointer: generateYoutubeModule,
        id: "youtubeId"
    },
];

// Resize functions need to be added here.
function resize() {
    pageResize();
    slackResize();
    youtubeResize();
}

window.onresize = resize;

// Reset functions, if needed, need to be added here.
function reset() {
    slackReset();
    youtubeReset();
}

function generateList() {
    pageResize();
    var listElementString = "";
    for (var i = 0; i < supportedModules.length; i++) {
        listElementString += "<li><a href=\"javascript:void(0);\"  onclick=\"javascript:checkCheckBox('" + supportedModules[i].id + "');\">" + supportedModules[i].name + "<input type=\"checkbox\" id=\"" + supportedModules[i].id + "\" style=\"float:right;\"/></a></li>";
    }
    if (listElementString.length > 0) {
        $("#selectionDropdown").append(listElementString);
    }
};

function checkCheckBox(idName) {
    // If clicked on the actual input box, do not double click it.
    if (event.target.nodeName !== "INPUT") {
        $("#" + idName).prop('checked', !$("#" + idName).is(':checked'));
    }
}

// Generates the Modules strings, for each selected item.
function generateModules() {
    reset();
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

// Generates the individual Module Strings, with the basic template, 
// then calling the specific function to generate the chosen module.
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

function pageResize() {
    $("body").css("padding-top", ($(".container-fluid").height() + 20));
}