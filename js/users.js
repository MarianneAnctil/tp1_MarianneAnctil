


    fetch('https://randomuser.me/api?results=10')
        .then(response=>response.json())
        .then(json=>data = json.results)
        .then(data=>afficherUsers(data));


function afficherUsers(data){
    const section=document.getElementById('liste');
    console.log(data);

    let nouvListe = document.createElement('ul');
    section.appendChild(nouvListe);
    nouvListe.classList.add('liste');

    for(let cpt=0; cpt<data.length; cpt++){
        console.log('info');

        let nouvItemListe = document.createElement('li');
        nouvItemListe.classList.add('liste__item'+cpt);
        nouvListe.appendChild(nouvItemListe);

        let nouvBoutons = document.createElement('button');
        nouvBoutons.setAttribute('data-index-user', cpt);
        nouvItemListe.appendChild(nouvBoutons);

        let imgUser = document.createElement('img');
        imgUser.src=data[cpt].picture.large;
        nouvBoutons.appendChild(imgUser);





        console.log(section);
    }
}