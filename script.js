var searchTerm, searchUrl, randomUrl;

$(document).ready(function() {
  $("#search").click(function() {
    searchTerm = $("#searchTerm").val();
    searchUrl =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      searchTerm +
      "&format=json&callback=?";

    $.ajax({
      type: "GET",
      url: searchUrl,
      async: false,
      dataType: "json",
      success: function(data) {
        $("#output").html(""); // clears the page for new info
        for (var i = 0; i < data[1].length; i++) {
          $("#output").append(
            "<li><h1><a href='" +
              data[3][i] +
              "' target='_blank'>" +
              data[1][i] +
              "</a></h1><p>" +
              data[2][i] +
              "</p></li>"
          );
        }
        $("#searchTerm").val("");
        $("#searchTerm").focus(); // clears the search box
        console.log(data);
      },
      error: function(errorMessage) {
        alert("Try again");
      }
    });
  });
  // function for searching with the enter key
  $("#searchTerm").keypress(function(e) {
    if (e.which == 13) {
      $("#search").click();
    }
  });

  $("#randomButton").click(function() {
    randomUrl =
      "https://en.wikipedia.org/w/api.php?action=query&generator=random&prop=extracts&exintro=&grnnamespace=0&format=json&callback=?";
    $("#output").html(""); // clears the page for new info

    $.ajax({
      type: "GET",
      url: randomUrl,
      async: false,
      dataType: "json",
      success: function(data) {
        $.each(data.query.pages, function(key, page) {
          $("#output").append(
            "<li><h1><a href='http://en.wikipedia.org/?curid=" +
              page.pageid +
              "' target='_blank'>" +
              page.title +
              "</a></h1>" +
              page.extract +
              "</li>"
          );
          $("#searchTerm").focus();
          console.log(data);
        });
      },
      error: function(errorMessage) {
        alert("Try again");
      }
    });
  });
});
