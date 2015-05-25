// New modules need to be added here.
var supportedModules = [
    {
        name: "Breaking News",
        functionPointer: generateBreakingNewsModule,
        id: "breakingNewsId"
    },
    {
        name: "Reddit",
        functionPointer: generateRedditModule,
        id: "redditId"
    },
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

// Resize functions, if needed, need to be added here.
function resize() {
    // The actual page.
    pageResize();

    // The Module Functions.
    slackResize();
    youtubeResize();
}

window.onresize = resize;

// Reset functions, if needed, need to be added here.
function reset() {
    breakingNewsReset();
    resetReddit();
    slackReset();
    youtubeReset();
}

function generateList() {
    pageResize();
    var listElementString = "";
    for (var i = 0, ii = supportedModules.length; i < ii; i++) {
        listElementString += "<li><a href=\"javascript:void(0);\"  onclick=\"javascript:checkCheckBox('" + supportedModules[i].id + "');\"><input type=\"checkbox\" id=\"" + supportedModules[i].id + "\"/>&nbsp;" + supportedModules[i].name + "</a></li>";
    }
    if (listElementString.length > 0) {
        $("#selectionDropdown").append(listElementString);
    }
    // Essentially, triple click the checkboxes to deal with the issues of it being within the <a> element for nicer formatting, caused by the FireFox formatting.
    $("input").filter(function () {
        return $(this).attr("type") === "checkbox";
    }).click(function () {
        $(this).prop('checked', !$(this).is(':checked'));
    });
};

function checkCheckBox(idName) {
    $("#" + idName).prop('checked', !$("#" + idName).is(':checked'));
}

function toggleModules(isOnButton) {
    for (var i = 0, ii = supportedModules.length; i < ii; i++) {
        // If it is check and we are from the toggle off button, toggle it off.
        if ($("#" + supportedModules[i].id).is(':checked') && !isOnButton) {
            $("#" + supportedModules[i].id).prop('checked', false);
        } else if (!$("#" + supportedModules[i].id).is(':checked') && isOnButton) {
            // If it is not check and we are from the toggle on button, toggle it on.
            $("#" + supportedModules[i].id).prop('checked', true);
        }
    }
}

// Generates the Modules strings, for each selected item.
function generateModules() {
    reset();
    $("#rowContent").empty();
    var domElementString = "";
    for (var i = 0, ii = supportedModules.length; i < ii; i++) {
        if ($("#" + supportedModules[i].id).is(':checked')) {
            domElementString += generateModuleString(supportedModules[i]);
        }
    }
    if (domElementString.length > 0) {
        $("#rowContent").append(domElementString);
        resetShapeShift();
    }
};

// Generates the individual Module Strings, with the basic template, 
// then calling the specific function to generate the chosen module.
function generateModuleString(specificObjectToGenerate) {
    var domString = "";
    domString += "<div id='" + specificObjectToGenerate.id + "Module' class='contentChild'>";
    domString +=    "<div class='well well-sm'>";
    domString +=        "<div class='panel panel-primary'>";
    domString +=            "<div class='panel-heading'>";
    domString +=                "<h3 class='panel-title'>";
    domString +=                    specificObjectToGenerate.name;
    domString +=                "</h3>";
    domString +=            "</div>";
    domString +=            "<div class='panel-body'>";
    domString +=                specificObjectToGenerate.functionPointer();
    domString +=            "</div>";
    domString +=        "</div>";
    domString +=    "</div>";
    domString += "</div>";
    return domString;
}

function resetShapeShift() {
    // shapeShift breaks itself if there is only one element.
    if ($("#rowContent").children().length > 1) {
        $(".row-fluid").shapeshift({
            gutterY: 0,
        });
    }
}

function pageResize() {
    $("body").css("padding-top", ($(".container-fluid").height() + 20));
}
