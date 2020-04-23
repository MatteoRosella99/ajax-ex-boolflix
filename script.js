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
      success: function(data){
        var risultati = data.results
        operazione(risultati, "film")
      },
      error: function(richiesta, stato, errori){
      }
    });
    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv?",
      method: "GET",
      dataType: "json",
      data: {
        api_key: "c58c24c4776c99826b097e0cf5a38c20",
        query: ricerca
      },
      success: function(data){
        var risultati = data.results
        operazione(risultati, "tv")
      },
      error: function(richiesta, stato, errori){
      }
  })
})
function operazione(risultati, tipo, stellestringa, voto){
  for (var i = 0; i < risultati.length; i++) {
    if (tipo === "film") {
      title = risultati[i].title
      original = risultati[i].original_title
    }
    else if(tipo === "tv"){
      title = risultati[i].name
      original = risultati[i].original_name
    }
    var context = {
      titolo: title,
      original: original,
      lingua: risultati[i].original_language,
      voto: stelline(risultati[i].vote_average),
      img: risultati[i].poster_path
    }
    console.log(context);
    var html = template(context)
    $('.film').append(html)
  }
}

function stelline(voto){
  var stelle = Math.ceil(voto/2)
  var stellestringa = ""
  for (var x = 0; x < 5; x++) {
    if (x < stelle) {
      stellestringa += '<i class="fas fa-star"></i>'
    }
    else{
      stellestringa += '<i class="far fa-star"></i>'
    }
  }
  return stellestringa;
}
