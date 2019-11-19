$(document).ready(function(){

$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&rating=PG&api_key=Q5CeRLTcc4mA4AROS0aoH0ydGDpEXgF9&limit=10";

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
            var animalImg = $("<img>");
            animalImg.attr("src", results[i].images.fixed_height_still.url);
            animalImg.attr("data-still", results[i].images.fixed_height_still.url);
            animalImg.attr("data-animate", results[i].images.fixed_height.url);
            animalImg.attr("data-state", "still");
            animalImg.attr("class", "gif");

            gifDiv.prepend(p);
            gifDiv.append(animalImg);

            $("#animal-gifs-here").prepend(gifDiv);

            };
            $("body").on("click", ".gif", function() {
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

$("#searchForm").submit(function(e) {
        e.preventDefault();
});

    $("#searchBtn").click(function() { 
        var newBtn = $("<button>");
        newBtn.attr("type", "button");
        

        newBtn.append(newBtn);

});

});