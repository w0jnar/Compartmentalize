var videoArray = [];
var currentVideo = 0;
var player;

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
    returnString += "<div id='youtubeStatus' style='height:30px;'>";
    returnString += "</div>";
    returnString += "</div>";
    returnString += "</div>";
    return returnString;
};

function addVideo() {
    var vidToAdd = $("#youtubeInputId").val();
    if (vidToAdd !== "") {
        videoArray.push(vidToAdd);
        $("#youtubeStatus").text(vidToAdd + " added!");
        $("#youtubeInputId").val("");
    } else {
        $("#youtubeStatus").text("There is nothing there to add.");
    }
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

function startVideos() {
    if (videoArray.length !== 0) {
        player = new YT.Player('youtubePlayer', {
            height: '168',
            width: ($("#youtubeIdModule .panel").innerWidth() - 30),
            videoId: videoArray[0],
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
        youtubeResize();
    } else {
        $("#youtubeStatus").text("There are no videos in the queue.");
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        currentVideo++;
        if (currentVideo >= videoArray.length) {
            currentVideo = 0;
        }
        if (videoArray.length !== 0) {
            player.cueVideoById(videoArray[currentVideo], 0);
            event.target.playVideo();
        }
    }
}

function stopVideo() {
    player.stopVideo();
}

function youtubeResize() {
    $("#youtubePlayer").width(($("#youtubeIdModule .panel").innerWidth() - 30));
}

function youtubeReset() {
    videoArray = [];
    currentVideo = 0;
    player = null;
}