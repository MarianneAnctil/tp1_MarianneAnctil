let arrayPlanetesSelect = [];
let noImg = 0;
let intervale;
let valeurVitesse = null;
let statutIntervale = true;


/**
 * Elements HTML
 * @type {HTMLHeadingElement}
 */
let nomPLanete = document.createElement('h2');
nomPLanete.innerHTML = '';
document.getElementById('image').appendChild(nomPLanete);

let nouvSpan = document.createElement('span');
nouvSpan.classList.add('noDisplay');
nouvSpan.classList.add('underline');
document.getElementById('image').appendChild(nouvSpan);

let nouvImg = document.createElement('img');
nouvImg.src = '';
nouvImg.alt = '';
document.getElementById('image').appendChild(nouvImg);


let btnPrecedent = document.createElement('button');
btnPrecedent.innerHTML = 'Précédent';
btnPrecedent.id = 'btnPrecedent';
btnPrecedent.classList.add('noDisplay');
document.getElementById('buttons').appendChild(btnPrecedent);

let btnArret = document.createElement('button');
btnArret.innerHTML = 'Arrêter';
btnArret.id = 'btnArret';
btnArret.classList.add('noDisplay');
document.getElementById('buttons').appendChild(btnArret);

let btnSuivant = document.createElement('button');
btnSuivant.innerHTML = 'Suivant';
btnSuivant.id = 'btnSuivant';
btnSuivant.classList.add('noDisplay');
document.getElementById('buttons').appendChild(btnSuivant);


let vitesseLent = document.createElement('option');
vitesseLent.innerHTML = 'Lent';
vitesseLent.value = '1500';
document.getElementById('vitesse').appendChild(vitesseLent);

let vitesseMoyen = document.createElement('option');
vitesseMoyen.innerHTML = 'Moyen';
vitesseMoyen.value = '1000';
document.getElementById('vitesse').appendChild(vitesseMoyen);

let vitesseRapide = document.createElement('option');
vitesseRapide.innerHTML = 'Rapide';
vitesseRapide.value = '500';
document.getElementById('vitesse').appendChild(vitesseRapide);

/**
 * Event listener
 */
document.getElementById('btnPrecedent').addEventListener('click', changerImage);
document.getElementById('btnSuivant').addEventListener('click', changerImage);

if (statutIntervale === true) {
    document.getElementById('btnArret').addEventListener('click', arreterVitesse);
} else if (statutIntervale === false) {
    document.getElementById('btnArret').addEventListener('click', demarrerVitesse);

}


fetch('https://swapi.dev/api/films/')
    .then(response => response.json())
    .then(json => data = json.results)
    .then(data => afficherFilms(data));


/**
 * @param data
 * afficher la liste des films et ajout d'un event change pour faire apparaitre
 * les images et boutons lorsqu'un film est sélectionné
 */

function afficherFilms(data) {
    const liste = document.getElementById('films');

    for (cpt = 0; cpt < 3; cpt++) {
        let nouvSelectFilm = document.createElement('option');
        nouvSelectFilm.innerHTML = data[cpt].title;
        nouvSelectFilm.setAttribute('value', cpt);
        liste.appendChild(nouvSelectFilm);
    }

    liste.addEventListener('change', function (evenement) {
        arrayPlanetesSelect = [];
        document.querySelector('option[value=base]').classList.add('noDisplay');
        btnSuivant.classList.remove('noDisplay');
        btnArret.classList.remove('noDisplay');
        btnPrecedent.classList.remove('noDisplay');
        nouvSpan.classList.remove('noDisplay');
        document.getElementById('vitesse').classList.remove('noDisplay');
        let objCible = evenement.currentTarget;
        let arrayPlanetes = data[objCible.value].planets;
        fetchPlanetes(arrayPlanetes, objCible.value);
        recupIntervale(1500);
    });
}


/**
 * @param array
 * @param id
 * Appel API pour fetch les planetes selon le films a partir d'un tableau.
 * Le tableau contient les liens api de chaque planetes
 */

function fetchPlanetes(array, id) {
    let test = '';
    for (cpt = 0; cpt < array.length; cpt++) {
        fetch(array[cpt])
            .then(response => response.json())
            .then(json => data = json.name)
            .then(data => afficherPlanetes(data));
    }
}

/**
 * @param data
 * afficher la première planete trouver par l'API
 */

function afficherPlanetes(data) {
    arrayPlanetesSelect.push(data);
    nouvImg.src = '../images/' + arrayPlanetesSelect[0] + '.jpeg';
    nomPLanete.innerHTML = 'Planète ' + arrayPlanetesSelect[0];

}

/**
 * @param evenement
 * selon le bouton presse, l'image va changer
 */

function changerImage(evenement) {
    let objCible = evenement.currentTarget;

    if (objCible.id === 'btnSuivant') {
        noImg++;
        if (statutIntervale === true && valeurVitesse !== null) {
            clearInterval(intervale);
            intervale = setInterval(modifierVitesse, valeurVitesse);
        } else if (statutIntervale === true && valeurVitesse === null) {
            clearInterval(intervale);
            intervale = setInterval(modifierVitesse, 1500);
        }
        if (noImg > arrayPlanetesSelect.length - 1) {
            noImg = 0;
        }
    }
    if (objCible.id === 'btnPrecedent') {
        noImg--;
        if (statutIntervale === true && valeurVitesse !== null) {
            clearInterval(intervale);
            intervale = setInterval(modifierVitesse, valeurVitesse);
        } else if (statutIntervale === true && valeurVitesse === null) {
            clearInterval(intervale);
            intervale = setInterval(modifierVitesse, 1500);
        }
        if (noImg < 0) {
            noImg = arrayPlanetesSelect.length - 1;
        }
    }
    nouvImg.src = '../images/' + arrayPlanetesSelect[noImg] + '.jpeg';
    nomPLanete.innerHTML = 'Planète ' + arrayPlanetesSelect[noImg];
}

/**
 * @param vitesse
 * recuperation de l'intervale et appel d'un event change pour pour envoyer la valeur
 * de la vitesse selectionnee
 */


function recupIntervale(vitesse) {
    intervale = setInterval(modifierVitesse, vitesse);

    document.getElementById('vitesse').addEventListener('change', function (evenement) {
        clearInterval(intervale);
        let objCible = evenement.currentTarget;
        valeurVitesse = objCible.value;
        intervale = setInterval(modifierVitesse, valeurVitesse);
    })
}

/**
 * modifier la vitesse selon celle qui a ete selecitonnee
 */

function modifierVitesse() {
    noImg++;
    if (noImg > arrayPlanetesSelect.length - 1) {
        noImg = 0;
    }
    nouvImg.src = '../images/' + arrayPlanetesSelect[noImg] + '.jpeg';
    nomPLanete.innerHTML = 'Planète ' + arrayPlanetesSelect[noImg];
}

/**
 * fonction pour demarrer le deroulement automatique
 */

function demarrerVitesse() {
    document.getElementById('btnArret').removeEventListener('click', demarrerVitesse);
    document.getElementById('btnArret').addEventListener('click', arreterVitesse);
    document.getElementById('vitesse').classList.remove('noDisplay');
    statutIntervale = true;
    if (valeurVitesse === null) {
        recupIntervale(1500);
    } else {
        recupIntervale(valeurVitesse);
    }


    btnArret.innerHTML = 'Arrêter';
}

/**
 * fonction pour supprimer l'intervale et arreter le deroulement automatique
 */

function arreterVitesse() {
    document.getElementById('btnArret').removeEventListener('click', arreterVitesse);
    document.getElementById('btnArret').addEventListener('click', demarrerVitesse);
    document.getElementById('vitesse').classList.add('noDisplay');
    statutIntervale = false;
    clearInterval(intervale);
    btnArret.innerHTML = 'Démarrer';
}
