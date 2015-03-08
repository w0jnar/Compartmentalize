// The basic Slack Module.
function generateSlackModule() {
    var returnString = "";
    returnString += "<div>";
    returnString += "<div id='slackKeyInput'>";
    returnString += "Slack URL: <input type='text' name='url' id='slackURL'><br /><br />";
    returnString += "Bot Key: &nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='key' id='slackKey'><br /><br />";
    returnString += "<button id='slackKeyButton' type='button' class='btn btn-primary' onclick='javascript:startConnection();'>Initialize Connection</button>";
    returnString += "</div>";
    returnString += "<div id='slackTAContainer' style='display:none; height:300px;'>";
    returnString += "</div>";
    returnString += "</div>";
    return returnString;
};

// The actual connection attempt.
function startConnection() {
    var slackBaseUrl = $("#slackURL").val() + "/api/";
    var url = slackBaseUrl + "rtm.start?token=" + $("#slackKey").val();
    $.getJSON(
    url,
    function (data, status) {
        if (status === "success") {
            $("#slackKeyInput").hide();
            $("#slackTAContainer").show();
            $("#slackTAContainer").append("<textarea id='slackTA' readonly style='width:" + ($("#slackIdModule .panel").innerWidth() - 30) + "px; resize: none; height: 300px; border: none;'></textarea>");
            var urlForRTM = data.url;
            connectToMessageServer(urlForRTM);
        }
    }
    ).fail(function () {
        $("#keyInput").append("<br /><br />-ERROR: Connection not made.<br />");
    });
};

// The rules for the connection.
function connectToMessageServer(urlForRTM) {
    // Intentional Global so the WebSocket can be closed if needed in the slackReset() function.
    ws = new WebSocket(urlForRTM);
    ws.onmessage = function (msg) {
        var messageText = JSON.parse(msg.data);

        if (typeof messageText.user === "string") {
            if (typeof messageText.text === "string") {
                $("#slackTA").val($("#slackTA").val() + "User: " + messageText.user + ", Channel: " + messageText.channel + ", Type: " + messageText.type + ", Text: " + messageText.text + "\n\n");
            } else if (typeof messageText.presence === "string") {
                $("#slackTA").val($("#slackTA").val() + "User: " + messageText.user + ", Type: " + messageText.type + ", Presence: " + messageText.presence + "\n\n");
            } else {
                $("#slackTA").val($("#slackTA").val() + "User: " + messageText.user + ", Type: " + messageText.type + "\n\n");
            }
        }
        $("#slackTA").scrollTop($("#slackTA")[0].scrollHeight);
    };
    ws.onclose = function (msg) {
        $("#slackTA").val($("#slackTA").val() + "~~~ERROR: Connection was closed.\n\n");
    }
    ws.error = function (err) {
        $("#slackTA").val($("#slackTA").val() + "~~~ERROR: " + err + "\n\n");
    }
};

// The specific resize function for Slack Modules.
function slackResize() {
    $("#slackTA").width(($("#slackIdModule .panel").innerWidth() - 30));
    $("#slackTA").scrollTop($("#slackTA")[0].scrollHeight);
}

// Slack requires a reset function to close the WebSocket.
function slackReset() {
    if (typeof ws !== "undefined") {
        ws.onclose = function () { }; // Disable onclose function, as we are forcefully closing the connection.
        ws.close();
        ws = null;
    }
}