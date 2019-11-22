$(document).ready(function(){

var topicBtns = ["Pulp Fiction", "Bart Simpson", "Futurama", "Rick Sanchez", "Mr Meeseeks"]
for(var j = 0; j < topicBtns.length; j++) {
    var btnCreate = $("<button>" + topicBtns[j] + "</button>")
        btnCreate.attr("type", "button");
        btnCreate.attr("class", "btn btn-success m-1 myButtons");
        btnCreate.attr("data-topic", topicBtns[j]);
        btnCreate.appendTo("#buttonArray")
}

$(document).on("click", ".myButtons", function() {
    var topic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&rating=PG&api_key=Q5CeRLTcc4mA4AROS0aoH0ydGDpEXgF9&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var topicImg = $("<img>");
            topicImg.attr("src", results[i].images.fixed_height_still.url);
            topicImg.attr("data-still", results[i].images.fixed_height_still.url);
            topicImg.attr("data-animate", results[i].images.fixed_height.url);
            topicImg.attr("data-state", "still");
            topicImg.attr("class", "gif");

            gifDiv.prepend(p);
            gifDiv.append(topicImg);

            $("#topic-gifs-here").prepend(gifDiv);

            };
            $(document).on("click", ".gif", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            
            });
        })

    });

    $("#searchForm").on("click", function(e) {
        e.preventDefault();
    });

    $("#addTopic").on("click", function() {

        var newButton = $("<button>");
        var newTopic = $("#searchInput").val().trim();
        console.log(newTopic);
        newButton.attr("type", "submit");
        newButton.attr("class", "btn btn-success m-1 myButtons")
        newButton.attr("data-topic", newTopic);
        newButton.append(newTopic);
        
        $("#buttonArray").append(newButton);
    });


});