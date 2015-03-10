var videoArray = [];
var currentVideo = 0;
var player;

// The basic Youtube Module.
function generateYoutubeModule() {
    var returnString = "";
    returnString += "<div>";
    returnString += "<div id='youtubePlayer'>";
    returnString += "</div>";
    returnString += "<div id='youtubePlayerInput' style='height:126px;'>";
    //returnString += "Video Id: <input type='text' name='vidId' id='youtubeInputId'><br /><br />";

    returnString += "<div class='input-group'>";
    returnString += "<span class='input-group-addon' id='youtube-sizing-addon'>Video Id:</span>";
    returnString += "<input type='text' class='form-control' placeholder='Id' aria-describedby='youtube-sizing-addon' id='youtubeInputId'>";
    returnString += "</div><br />";

    returnString += "<div class='btn-group' role='group' aria-label='...'>";
    returnString += "<button id='youtubeAddButton' type='button' class='btn btn-primary' onclick='javascript:addVideo();'>Add Video</button>";
    returnString += "<button id='youtubeRemoveButton' type='button' class='btn btn-primary' onclick='javascript:removeVideo();'>Remove Video</button>";
    returnString += "<button id='youtubeStartButton' type='button' class='btn btn-primary' onclick='javascript:startVideos();'>Start Playlist</button>";
    returnString += "</div>";

    returnString += "<div id='youtubeStatus' style='height:30px;'>";
    returnString += "</div>";
    returnString += "</div>";
    returnString += "</div>";
    return returnString;
};

function addVideo() {
    var vidToAdd = $("#youtubeInputId").val();
    if (/^[a-z0-9_-]{11}$/i.test(vidToAdd)) {
        videoArray.push(vidToAdd);
        $("#youtubeStatus").text(vidToAdd + " added!");
        $("#youtubeInputId").val("");
    } else if (vidToAdd === "") {
        $("#youtubeStatus").text("There is nothing there to add.");
    } else {
        $("#youtubeStatus").text("The Id you have entered is invalid.");
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
            height: '251',
            width: ($("#youtubeIdModule .panel").innerWidth() - 30),
            videoId: videoArray[0],
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
        youtubeResize();
        resetShapeShift();
    } else {
        $("#youtubeStatus").text("There are no videos in the queue.");
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    nextVideo(event);
}

function onPlayerError(event) {
    //$("#youtubeStatus").text("There was an error with id: " + videoArray[currentVideo] + ". It will be removed.");
    //console.log(videoArray);
    //videoArray.splice(currentVideo, 1);
    //if (currentVideo !== 0) {
    //    currentVideo--;
    //}
    //console.log(videoArray);
    event.data = 0;
    nextVideo(event);
}

function nextVideo(event) {
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