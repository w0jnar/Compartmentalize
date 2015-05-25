var redditSort = "hot";

// The basic Reddit Module.
function generateRedditModule() {
    var domString = "";
    domString += "<div id='redditContainer'>";
    domString +=    "<div id='redditLogging'>";
    domString +=    "</div>";
    domString +=    "<div id='redditInfo' style='height:126px'>";
    domString +=        "<div class='input-group'>";
    domString +=            "<span class='input-group-addon' id='reddit-sizing-addon'>Subreddit:</span>";
    domString +=            "<input type='text' class='form-control' placeholder='Subreddit' aria-describedby='reddit-sizing-addon' id='subredditInputId'>";
    domString +=        "</div>";
    domString +=        "<br />";
    domString +=        "<div class='btn-group' role='group' aria-label='...'>";
    domString +=            "<button id='redditButton' type='button' class='btn btn-primary' onclick='javascript:getReddit();'>Get Reddit Posts</button>";
    domString +=            "<div id='redditDropdown' class='btn-group pull-right' role='group'>";
    domString +=                "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>";
    domString +=                    "Sort: Hot<span class='caret'></span>";
    domString +=                "</button>";
    domString +=                "<ul id='selectionDropdown' class='dropdown-menu' role='menu'>"
    domString +=                    "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('hot');\">Hot</a></li>";
    domString +=                    "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('new');\">New</a></li>";
    domString +=                    "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('rising');\">Rising</a></li>";
    domString +=                    "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('controversial');\">Controversial</a></li>";
    domString +=                    "<li><a href='javascript:void(0);' onclick=\"javascript:changeRedditSort('top');\">Top</a></li>";
    domString +=                "</ul>";
    domString +=            "</div>";
    domString +=        "</div>";
    domString +=    "</div>";
    domString += "</div>";
    return domString;
}

// Update the sort for the results of the Reddit request.
function changeRedditSort(newSort) {
    redditSort = newSort;
    $("#redditDropdown button").empty().append("Sort: " + newSort.charAt(0).toUpperCase() + newSort.slice(1) + "<span class='caret'></span>");
}

// Get the actual Reddit requests.
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

// Build the Reddit output.
function buildChart(jsonArray) {
    $("#redditInfo").height(0);
    $("#redditLogging").empty();
    $("#redditLogging").height(219);
    $("#redditLogging").css("overflow-y", "scroll");
    var htmlString = "<table class='table table-striped'>";
    for (var i = 0, ii = jsonArray.length; i < ii; i++) {
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