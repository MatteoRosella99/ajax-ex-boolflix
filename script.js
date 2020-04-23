var source = $('.template').html();
var template = Handlebars.compile(source);
var pag = $('.film')

$('.but').click(
  function(){
    pag.html("")
    var ricerca = $('.inp').val()
    console.log(ricerca);
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?",
      method: "GET",
      dataType: "json",
      data: {
        api_key: "c58c24c4776c99826b097e0cf5a38c20",
        query: ricerca
      },
      success: function (data){
        var risultati = data.results
        for (var i = 0; i < risultati.length; i++) {
          var stelle = risultati[i].vote_average / 2
          console.log(stelle);
          var stellestringa = []
          for (var x = 0; x < 5; x++) {
            if (x < stelle) {
              stellestringa.push($('<li><i class="far fa-star"></i></li>'))
            }
            else{
              stellestringa.push($('<li><i class="fas fa-star"></i></li>'))
            }
          }
          console.log(stellestringa);
          var context = {
            titolo: risultati[i].title,
            original: risultati[i].original_title,
            lingua: risultati[i].original_language,
            voto: stellestringa
          }
          var html = template(context)
          $('.film').append(html)
        }
      },
      error: function(richiesta, stato, errori){
      }
    });
  }
)
