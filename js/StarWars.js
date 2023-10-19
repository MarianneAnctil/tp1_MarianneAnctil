
let arrayPlanetesSelect = [];
let noImg=0;
let intervale;
let valeurVitesse=null;
let statutIntervale = true;

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
vitesseLent.value = '3000';
document.getElementById('vitesse').appendChild(vitesseLent);

let vitesseMoyen = document.createElement('option');
vitesseMoyen.innerHTML = 'Moyen';
vitesseMoyen.value = '1500';
document.getElementById('vitesse').appendChild(vitesseMoyen);

let vitesseRapide = document.createElement('option');
vitesseRapide.innerHTML = 'Rapide';
vitesseRapide.value = '700';
document.getElementById('vitesse').appendChild(vitesseRapide);




document.getElementById('btnPrecedent').addEventListener('click', changerImage);
document.getElementById('btnSuivant').addEventListener('click', changerImage);

if(statutIntervale === true) {
    document.getElementById('btnArret').addEventListener('click', arreterVitesse);
} else if(statutIntervale === false){
    document.getElementById('btnArret').addEventListener('click', demarrerVitesse);

}




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
        fetchPlanetes(arrayPlanetes, objCible.value);
        recupIntervale(3000);
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


function recupIntervale(vitesse){
    intervale = setInterval(modifierVitesse, vitesse);
    console.log('recup')

    document.getElementById('vitesse').addEventListener('change',function(evenement){
        console.log('recup change')
        clearInterval(intervale);
        let objCible = evenement.currentTarget;
        valeurVitesse = objCible.value
        intervale = setInterval(modifierVitesse, valeurVitesse);
    })
}

function modifierVitesse(){
    console.log('modifier')
    noImg++;
    if(noImg > arrayPlanetesSelect.length-1){
        noImg=0;
    }
    nouvImg.src = '../images/' + arrayPlanetesSelect[noImg] + '.jpeg';
    nomPLanete.innerHTML=arrayPlanetesSelect[noImg];
}

function demarrerVitesse(){
    document.getElementById('btnArret').removeEventListener('click', demarrerVitesse);
    document.getElementById('btnArret').addEventListener('click', arreterVitesse);
    document.getElementById('vitesse').classList.remove('noDisplay');
    statutIntervale=true;
    if(valeurVitesse===null){
        recupIntervale(3000);
    }else{
        recupIntervale(valeurVitesse);
    }


    btnArret.innerHTML='Arrêter';
    console.log(valeurVitesse);
}

function arreterVitesse(){
    document.getElementById('btnArret').removeEventListener('click', arreterVitesse);
    document.getElementById('btnArret').addEventListener('click', demarrerVitesse);
    document.getElementById('vitesse').classList.add('noDisplay');
    statutIntervale=false;
    clearInterval(intervale);
    btnArret.innerHTML='Démarrer';
    console.log(statutIntervale)
}

console.log(statutIntervale);