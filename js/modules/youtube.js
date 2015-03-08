var videoArray = [];
var currentVideo = 0;
var timeOut;

// The basic Youtube Module.
function generateYoutubeModule() {
    var returnString = "";
    returnString += "<div>";
    returnString += "<div id='youtubePlayer'>";
    returnString += "</div>";
    returnString += "<div id='youtubePlayerInput' style='height:128px;'>";
    returnString += "Video Id: <input type='text' name='vidId' id='youtubeInputId'><br /><br />";
    returnString += "<button id='youtubeAddButton' type='button' class='btn btn-primary' onclick='javascript:addVideo();'>Add Video</button>";
    returnString += "&nbsp;<button id='youtubeRemoveButton' type='button' class='btn btn-primary' onclick='javascript:removeVideo();'>Remove Video</button>";
    returnString += "&nbsp;<button id='youtubeStartButton' type='button' class='btn btn-primary' onclick='javascript:startVideos();'>Start Playlist</button>";
    returnString += "<br /><br /><div id='youtubeStatus' style='height:30px;'>";
    returnString += "</div>";
    returnString += "</div>";
    returnString += "</div>";
    return returnString;
};

function addVideo() {
    videoArray.push($("#youtubeInputId").val());
    $("#youtubeStatus").text($("#youtubeInputId").val() + " added!");
    $("#youtubeInputId").val("");
}

function removeVideo() {
    var index = videoArray.indexOf($("#youtubeInputId").val());
    if (index > -1) {
        videoArray.splice(index, 1);
        $("#youtubeStatus").text($("#youtubeInputId").val() + " removed!");
    } else {
        $("#youtubeStatus").text($("#youtubeInputId").val() + " was not in the queue.");
    }
}