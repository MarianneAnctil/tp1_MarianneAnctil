fetch('https://randomuser.me/api?results=10')
    .then(response => response.json())
    .then(json => data = json.results)
    .then(data => afficherUsers(data));


function afficherUsers(data) {
    const section = document.getElementById('liste');

    let nouvListe = document.createElement('ul');
    section.appendChild(nouvListe);
    nouvListe.classList.add('liste');

    for (let cpt = 0; cpt < data.length; cpt++) {

        let nouvItemListe = document.createElement('li');
        nouvItemListe.classList.add('liste__item' + cpt);
        nouvListe.appendChild(nouvItemListe);

        let nouvBoutons = document.createElement('button');
        nouvBoutons.setAttribute('id', cpt);
        nouvItemListe.appendChild(nouvBoutons);

        let imgUser = document.createElement('img');
        imgUser.src = data[cpt].picture.large;
        imgUser.alt = 'afficher la fiche de ' + data[cpt].name.first + ' ' + data[cpt].name.last;
        nouvBoutons.appendChild(imgUser);
    }

    let boutons = document.querySelectorAll('button');
    let idUser = boutons.id;

    // boutons.addEventListener('click', afficherFiche())

    for (cptBtn = 0; cptBtn < boutons.length; cptBtn++) {
        boutons[cptBtn].addEventListener('click', function (evenement) {
            let objCible = evenement.currentTarget;
            let listeInfo = document.querySelectorAll('#fiche>ul>li');

            document.querySelector('#fiche>img').src = data[objCible.id].picture.large;
            document.querySelector('#fiche>img').alt = 'photo de ' + data[objCible.id].name.first + ' ' + data[objCible.id].name.last;
            document.querySelector('h2').innerHTML = data[objCible.id].name.first + ' ' + data[objCible.id].name.last;
            listeInfo[0].innerHTML = data[objCible.id].location.street.number + ' ' + data[objCible.id].location.street.name;
            listeInfo[1].innerHTML = data[objCible.id].location.city;
            listeInfo[2].innerHTML = data[objCible.id].location.state;
            listeInfo[3].innerHTML = data[objCible.id].location.postcode;

        })
    }
}
