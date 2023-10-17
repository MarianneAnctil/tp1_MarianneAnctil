// fetch('https://swapi.dev/api/planets/')
//     .then(response=>response.json())
//     // .then(json=>console.log(json));
//     .then(json=>data = json.results)
//     .then(data=>afficherPlanetes(data));
let arrayPlanetesSelect = [];
let noImg=0;
let intervale;

let nomPLanete = document.createElement('h2');
nomPLanete.innerHTML='';
document.getElementById('image').appendChild(nomPLanete);

let nouvImg = document.createElement('img');
nouvImg.src='';
nouvImg.alt='';
document.getElementById('image').appendChild(nouvImg);


let btnPrecedent = document.createElement('button');
btnPrecedent.innerHTML='Précédent';
btnPrecedent.id='btnPrecedent';
btnPrecedent.classList.add('noDisplay');
document.getElementById('image').appendChild(btnPrecedent);

let btnArret = document.createElement('button');
btnArret.innerHTML='Arrêter';
btnArret.id='btnArret';
btnArret.classList.add('noDisplay');
document.getElementById('image').appendChild(btnArret);

let btnSuivant = document.createElement('button');
btnSuivant.innerHTML='Suivant';
btnSuivant.id='btnSuivant';
btnSuivant.classList.add('noDisplay');
document.getElementById('image').appendChild(btnSuivant);



let vitesseLent = document.createElement('option');
vitesseLent.innerHTML = 'Lent';
document.getElementById('vitesse').appendChild(vitesseLent);

let vitesseMoyen = document.createElement('option');
vitesseMoyen.innerHTML = 'Moyen';
document.getElementById('vitesse').appendChild(vitesseMoyen);

let vitesseRapide = document.createElement('option');
vitesseRapide.innerHTML = 'Rapide';
document.getElementById('vitesse').appendChild(vitesseRapide);




document.getElementById('btnPrecedent').addEventListener('click', changerImage);
document.getElementById('btnSuivant').addEventListener('click', changerImage);


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
        btnSuivant.classList.remove('noDisplay');
        btnArret.classList.remove('noDisplay');
        btnPrecedent.classList.remove('noDisplay');
        document.getElementById('vitesse').classList.remove('noDisplay');
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
    nouvImg.src = '../images/' + arrayPlanetesSelect[0] + '.jpeg';
    nomPLanete.innerHTML=arrayPlanetesSelect[0];
   console.log(nouvImg.src);

}

function changerImage(evenement){
    let objCible = evenement.currentTarget;

        if(objCible.id === 'btnSuivant'){
            noImg++;
            if(noImg > arrayPlanetesSelect.length-1){
                noImg=0;
            }
        }
            if (objCible.id === 'btnPrecedent') {
                noImg--;
                if(noImg < 0) {
                    noImg=arrayPlanetesSelect.length-1;
            }
        }
    nouvImg.src = '../images/' + arrayPlanetesSelect[noImg] + '.jpeg';
    nomPLanete.innerHTML=arrayPlanetesSelect[noImg];
    console.log(noImg)
}