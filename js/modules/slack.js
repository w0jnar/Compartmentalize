function generateSlackModule() {
    var returnString = "";
    returnString += "<div>";
    returnString += "<div id='keyInput'>";
    returnString += "Bot Key: <input type='text' name='key' value=''><br /><br />";
    returnString += "<button id='slackKeyButton' type='button' class='btn btn-primary' onclick='javascript:startConnection();'>Initialize Connection</button>";
    returnString += "</div>";



    returnString += "</div>";
    return returnString;
}

function startConnection() {
    
}