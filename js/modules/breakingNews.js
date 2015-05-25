var timerHolder;

// The basic Breaking News Module.
function generateBreakingNewsModule() {
    var domString = "";
    domString += "<div id='breakingNewsContainer'>";
    domString +=     "<div id='breakingNewsLogging'>";
    domString +=     "</div>";
    domString +=     "<div id='breakingNewsInfo' style='height:126px'>";
    domString +=         "<div class='input-group'>";
    domString +=             "<span class='input-group-addon' id='breakingNews-sizing-addon'>Time between Polls:</span>";
    domString +=             "<input type='text' class='form-control' placeholder='5' aria-describedby='breakingNews-sizing-addon' id='breakingNewsInputId'>";
    domString +=             "<span class='input-group-addon'>Minute(s)</span>";
    domString +=         "</div>";
    domString +=         "<br />";
    domString +=         "<button id='breakingNewsButton' type='button' class='btn btn-primary' onclick='javascript:getBreakingNews();'>Get Breaking News Posts</button>";
    domString +=     "</div>";
    domString += "</div>";
    return domString;
}

// On button press, attempt to get News, and start an interval.
function getBreakingNews() {
    var input = $("#breakingNewsInputId").val();
    var numToSend;
    // If no input, use 5 as the input, otherwise, check if the input is a digit.
    if (/^\d+$/.test(input)) {
        numToSend = input;
    } else if (input === "") {
        numToSend = "5";
    } else {
        $("#breakingNewsLogging").text("-ERROR: Please enter a valid number of articles.\n");
    }
    // If it was valid, start an interval to automatically get articles.
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
    // Breaking News' JSON Api does not have a CORS header, so we have to make 
    // due with what we can.
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
    $("#breakingNewsContainer").height(382);
    $("#breakingNewsInfo").height(78);
    $("#breakingNewsLogging").empty();
    $("#breakingNewsLogging").height(216);
    $("#breakingNewsLogging").css("overflow-y", "scroll");
    var htmlString = "<table class='table table-striped'>";
    for (var i = 0, ii = jsonArray.length; i < ii; i++) {
        htmlString += "<tr>";
        htmlString +=     "<td>" + "<a href='" + jsonArray[i].link + "'>" + jsonArray[i].title + "</a></td>";
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