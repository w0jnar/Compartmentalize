var supportedModules = [
    {
        name: "Slack",
        functionPointer: "generateSlackModule",
        id: "slackId"
    }
];

function generateList() {
    var listElement;
    for (var i = 0; i < supportedModules.length; i++) {
        listElement = "<li><a href=\"javascript:void(0);\"  onclick=\"javascript:checkCheckBox('" + supportedModules[i].id + "');\">" + supportedModules[i].name + "<input type=\"checkbox\" id=\"" + supportedModules[i].id + "\" style=\"float:right;\"/></a></li>";
        // listElement = "<li><a href=\"javascript:void(0);\" onclick=\"javascript:console.log('meow');\">" + supportedModules[i].name + "<input type=\"checkbox\" id=\"" + supportedModules[i].id + "\" onclick=\"javascript: console.log('meow');\" style=\"float:right;\"/></a></li>";
        $("#selectionDropdown").append(listElement);
    }
};

function checkCheckBox(idName) {
    if (event.target.nodeName !== "INPUT") {
        $("#" + idName).prop('checked', !$("#" + idName).is(':checked'));
    }
}

function generateModules() {
    for (var i = 0; i < supportedModules.length; i++) {
        if ($("#" + supportedModules[i].id).is(':checked')) {
            console.log("meow");
        }
    }
};