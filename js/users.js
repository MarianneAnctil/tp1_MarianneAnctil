


function fetchInput(){
    fetch('https://randomuser.me/api?results=10')
        .then(response=>response.json())
        .then(data=>afficherUsers(data));
}

function afficherUsers(data){
    const section=document.getElementById('liste');
    console.log(data)

    // for(let cpt=0; cpt<data.length; cpt++){
    //     console.log('info');
    // }
}