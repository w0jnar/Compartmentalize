var timerHolder;

// The basic Breaking News Module.
function generateBreakingNewsModule() {
    var returnString = "";
    returnString += "<div id='breakingNewsContainer'>";
    returnString += "<div id='breakingNewsLogging'>";
    returnString += "</div>";
    returnString += "<div id='breakingNewsInfo' style='height:125px'>";
    returnString += "<div class='input-group'>";
    returnString += "<span class='input-group-addon' id='breakingNews-sizing-addon'>Time between Polls:</span>";
    returnString += "<input type='text' class='form-control' placeholder='5' aria-describedby='breakingNews-sizing-addon' id='breakingNewsInputId'>";
    returnString += "<span class='input-group-addon'>Minute(s)</span>";
    returnString += "</div><br />";
    returnString += "<button id='breakingNewsButton' type='button' class='btn btn-primary' onclick='javascript:getBreakingNews();'>Get Breaking News Posts</button>";
    returnString += "</div>";
    returnString += "</div>";
    return returnString;
}

function getBreakingNews() {
    var input = $("#breakingNewsInputId").val();
    var numToSend;
    if (/\d+/.test(input)) {
        numToSend = input;
    } else if (input === "") {
        numToSend = "5";
    } else {
        $("#breakingNewsLogging").text("-ERROR: Please enter a valid number of articles.\n");
    }
    if (typeof numToSend !== "undefined") {
        if (timerHolder !== null) {
            clearInterval(timerHolder);
        }
        getArticles();
        timerHolder = setInterval(getArticles, (parseInt(numToSend) * 60000));
    }
}

function getArticles() {
    var newsUrl = 'http://api.breakingnews.com/api/v1/item/?format=rss';
    // http://stackoverflow.com/questions/11346990/reading-rss-feed-with-jquery
    // Breaking News' JSON Api does not have a CORS header, so have to make due with
    // what we can.
    $.ajax({
        type: "GET",
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(newsUrl),
        dataType: 'json',
        error: function () {
            alert('Unable to load feed, Incorrect path or invalid feed');
        },
        success: function (xml) {
            var data = xml.responseData.feed.entries;
            buildbreakingNewsList(data);
        }
    });
}

function buildbreakingNewsList(jsonArray) {
    $("#breakingNewsContainer").height(395);
    $("#breakingNewsInfo").height(78);
    $("#breakingNewsLogging").empty();
    $("#breakingNewsLogging").height(219);
    $("#breakingNewsLogging").css("overflow-y", "scroll");
    var htmlString = "<table class='table table-striped'>";
    for (var i = 0; i < jsonArray.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + "<a href='" + jsonArray[i].link + "'>" + jsonArray[i].title + "</a></td>";
        htmlString += "</tr>";
    }
    htmlString += "</table>";
    $("#breakingNewsLogging").append(htmlString);
    resetShapeShift();
}

function breakingNewsReset() {
    clearInterval(timerHolder);
    timerHolder = null;
}