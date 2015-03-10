var redditSort = "hot";

// The basic Reddit Module.
function generateRedditModule() {
    var returnString = "";
    returnString += "<div id='redditContainer'>";
    returnString += "<div id='redditLogging'>";
    returnString += "</div>";
    returnString += "<div id='redditInfo' style='height:126px'>";
    returnString += "<div class='input-group'>";
    returnString += "<span class='input-group-addon' id='reddit-sizing-addon'>Subreddit:</span>";
    returnString += "<input type='text' class='form-control' placeholder='Subreddit' aria-describedby='reddit-sizing-addon' id='subredditInputId'>";
    returnString += "</div><br />";
    returnString += "<div class='btn-group' role='group' aria-label='...'>";
    returnString += "<button id='redditButton' type='button' class='btn btn-primary' onclick='javascript:getReddit();'>Get Reddit Posts</button>";
    returnString += "<div id='redditDropdown' class='btn-group pull-right' role='group'>";
    returnString += "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>";
    returnString += "Sort: Hot<span class='caret'></span>";
    returnString += "</button>";
    returnString += "<ul id='selectionDropdown' class='dropdown-menu' role='menu'>"
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('hot');\">Hot</a></li>";
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('new');\">New</a></li>";
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('rising');\">Rising</a></li>";
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('controversial');\">Controversial</a></li>";
    returnString += "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('top');\">Top</a></li>";
    returnString += "</ul>";
    returnString += "</div>";
    returnString += "</div>";
    returnString += "</div>";
    returnString += "</div>";
    return returnString;
}

function changeRedditSort(newSort) {
    redditSort = newSort;
    $("#redditDropdown button").empty().append("Sort: " + newSort.charAt(0).toUpperCase() + newSort.slice(1) + "<span class='caret'></span>");
}

function getReddit() {
    if ($("#subredditInputId").val() !== "") {
        var redditUrl = 'https://www.reddit.com/r/' + $("#subredditInputId").val() + '/' + redditSort + '/.json';
        $.getJSON(
        redditUrl,
        function (data, status) {
            if (status === "success") {
                var dataToChart = data.data.children;
                buildChart(dataToChart);
                $("#redditContainer").height(382);
                resetShapeShift();
            }
        }
        ).fail(function () {
            $("#redditLogging").text("-ERROR: Connection not made.\n");
        });
    } else {
        $("#redditLogging").text("-ERROR: Please enter a valid subreddit.\n");
    }
    resetShapeShift();
}

function buildChart(jsonArray) {
    // console.log(jsonArray);
    //$("#redditLogging").width(
    $("#redditInfo").height(0);
    $("#redditLogging").empty();
    $("#redditLogging").height(219);
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

function resetReddit() {
    redditSort = "hot";
}