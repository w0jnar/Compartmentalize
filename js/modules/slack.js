var ws;

// The basic Slack Module.
function generateSlackModule() {
    var returnString = "";
    returnString += "<div>";
    returnString += "<div id='slackKeyInput' style='height: 126px;'>";
    returnString += "<div class='input-group'>";
    returnString += "<span class='input-group-addon' id='slack-sizing-addon1'>Slack URL:&nbsp;</span>";
    returnString += "<input type='text' class='form-control' placeholder='URL' aria-describedby='slack-sizing-addon1' id='slackURL'>";
    returnString += "</div>";
    returnString += "<div class='input-group'>";
    returnString += "<span class='input-group-addon' id='slack-sizing-addon1'>Bot Key:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
    returnString += "<input type='text' class='form-control' placeholder='Key' aria-describedby='slack-sizing-addon1' id='slackKey'>";
    returnString += "</div><br />";
    returnString += "<button id='slackKeyButton' type='button' class='btn btn-primary' onclick='javascript:startConnection();'>Initialize Connection</button>";
    returnString += "</div>";
    returnString += "<div id='slackTAContainer' style='display:none; height:382px;'>";
    returnString += "</div>";
    returnString += "</div>";
    return returnString;
};

// The actual connection attempt.
function startConnection() {
    if ($("#slackURL").val() !== "" && $("#slackKey").val() !== "") {
        var slackBaseUrl = $("#slackURL").val() + "/api/";
        var url = slackBaseUrl + "rtm.start?token=" + $("#slackKey").val();
        $.getJSON(
        url,
        function (data, status) {
            if (status === "success") {
                $("#slackKeyInput").hide();
                $("#slackTAContainer").show();
                $("#slackTAContainer").append("<textarea id='slackTA' readonly style='width:" + ($("#slackIdModule .panel").innerWidth() - 30) + "px; resize: none; height: 390px; border: none;'></textarea>");
                resetShapeShift();
                var urlForRTM = data.url;
                connectToMessageServer(urlForRTM);
            }
        }
        ).fail(function () {
            $("#slackKeyInput").prepend("-ERROR: Connection not made.<br />");
            $("#slackKeyInput").height($("#slackKeyInput").height() + 20);
        });
    } else {
        $("#slackKeyInput").prepend("Invalid URL or Key. Request not made.<br />");
        $("#slackKeyInput").height($("#slackKeyInput").height() + 20);
    }
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
    if ($("#slackTA").is(":visible")) {
        $("#slackTA").width(($("#slackIdModule .panel").innerWidth() - 30));
        $("#slackTA").scrollTop($("#slackTA")[0].scrollHeight);
    }
}

// Slack requires a reset function to close the WebSocket.
function slackReset() {
    if (typeof ws !== "undefined") {
        ws.onclose = function () { }; // Disable onclose function, as we are forcefully closing the connection.
        ws.close();
        ws = null;
    }
}