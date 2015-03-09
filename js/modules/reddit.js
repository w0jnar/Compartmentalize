var redditSort = "hot";

// The basic Reddit Module.
function generateRedditModule() {
    var returnString = "";
    returnString += "<div>";
    returnString += "<div id='redditLogging'>";
    returnString += "</div>";
    returnString += "<div>";
    returnString += "Subreddit: <input type='text' name='url' id='subreddit'><br /><br />";

    returnString += "<div id='redditDropdown' class='btn-group pull-right' role='group'>";
    returnString += "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>";
    returnString += "Sort<span class='caret'></span>";
    returnString += "</button>";
    returnString += "<ul id='selectionDropdown' class='dropdown-menu' role='menu'>"
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('hot');\">Hot</a></li>";
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('new');\">New</a></li>";
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('rising');\">Rising</a></li>";
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('controversial');\">Controversial</a></li>";
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('top');\">Top</a></li>";
    //returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('gilded');\">Gilded</a></li>";
    //returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('wiki');\">Wiki</a></li>";
    //returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('promoted');\">Promoted</a></li>";
    returnString += "</ul>";
    returnString += "</div>";
    returnString += "<button id='redditButton' type='button' class='btn btn-primary' onclick='javascript:getReddit();'>Get Reddit Posts</button>";
    returnString += "</div>";
    returnString += "</div>";
    return returnString;
}

function changeRedditSort(newSort) {
    redditSort = newSort;
}

function getReddit() {
    var redditUrl = 'https://www.reddit.com/r/' + $("#subreddit").val() + '/' + redditSort + '/.json';
    $.getJSON(
    redditUrl,
    function (data, status) {
        if (status === "success") {
            var dataToChart = data.data.children;
            buildChart(dataToChart);
        }
    }
    ).fail(function () {
        $("#redditLogging").text("-ERROR: Connection not made.");
    });
}

function buildChart(jsonArray) {
    // console.log(jsonArray);
    //$("#redditLogging").width(
    $("#redditLogging").empty();
    $("#redditLogging").height(222);
    $("#redditLogging").css("overflow-y", "scroll");
    var htmlString = "<table class='table table-striped'>";
    for (var i = 0; i < jsonArray.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonArray[i].data.subreddit + "</td>";
        htmlString += "<td>" + "<a href='" + jsonArray[i].data.url + "'>" + jsonArray[i].data.title + "</a></td>";
        htmlString += "</tr>";
    }
    htmlString += "</table>";
    $("#redditLogging").append(htmlString);
}