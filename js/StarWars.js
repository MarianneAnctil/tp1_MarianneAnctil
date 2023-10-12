fetch('https://swapi.dev/api/planets/')
    .then(response=>response.json())
    // .then(json=>console.log(json));
    .then(json=>data = json.results)
    .then(data=>afficherPlanetes(data));

fetch('https://swapi.dev/api/films/')
    .then(response=>response.json())
    // .then(json=>console.log(json));
    .then(json=>data = json.results)
    .then(data=>afficherFilms(data));


function afficherFilms(data){
    console.log(data)
    const liste = document.getElementById('films');

    for (cpt=0; cpt < 3; cpt++){
        let nouvSelectFilm = document.createElement('option');
        nouvSelectFilm.innerHTML = data[cpt].title;
        liste.appendChild(nouvSelectFilm)
    }
}
function afficherPlanetes(data){
    console.log(data)
}