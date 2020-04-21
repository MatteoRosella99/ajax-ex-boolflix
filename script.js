$('.but').click(
  function(){
    var ricerca = $('.inp').val()
    console.log(ricerca);
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?",
      method: "GET",
      dataType: "json",
      data: {
        api_key: "c58c24c4776c99826b097e0cf5a38c20",
        query: ricerca,
      },
      success: function (data){
        var risultati = data.results
        for (var i = 0; i < risultati.length; i++) {
          $('.film').append('<ul><li>' + risultati[i].title + '</li><li>' + risultati[i].original_title + '</li><li>' + risultati[i].original_language + '</li><li>' + risultati[i].vote_average + '</li></ul>')
        }
      },
      error: function(richiesta, stato, errori){
      }
    });
  }
)
