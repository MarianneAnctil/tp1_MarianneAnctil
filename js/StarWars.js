// fetch('https://swapi.dev/api/planets/')
//     .then(response=>response.json())
//     // .then(json=>console.log(json));
//     .then(json=>data = json.results)
//     .then(data=>afficherPlanetes(data));
let arrayPlanetesSelect = [];


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
        nouvSelectFilm.setAttribute('value', cpt);
        liste.appendChild(nouvSelectFilm)
    }

    liste.addEventListener('change', function(evenement)
    {
        arrayPlanetesSelect=[];
        document.querySelector('option[value=base]').classList.add('noDisplay');
        let objCible = evenement.currentTarget;
        console.log(objCible.value)
        let arrayPlanetes = data[objCible.value].planets;
        fetchPlanetes(arrayPlanetes, objCible.value)
    });
}


function fetchPlanetes(array, id){
    console.log(array);
    console.log(id);
    let test='';
for(cpt=0; cpt<array.length;cpt++) {
    fetch(array[cpt])
        .then(response => response.json())
        // .then(json=>console.log(json));
        .then(json => data = json.name)
        .then(data => afficherPlanetes(data));
}
}

function afficherPlanetes(data){
    arrayPlanetesSelect.push(data)
console.log(arrayPlanetesSelect);
}