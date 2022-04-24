//using 'forge.min.js' from npm 'node-forge' package
//const { response } = require("express");

//var keyPair = forge.pki.rsa.generateKeyPair( { bits: 1024 } );



//generer et sauvegarder la clef privee et public en format PEM dans localStorage
function genKeyPair (name) {
  
  // si elle n'y est pas encore...
  var keyPair, pem = localStorage.getItem(name);

  if (pem) {
    privateKey = forge.pki.privateKeyFromPem(pem);
    publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
    keyPair = {privateKey, publicKey};
  } else {
    keyPair = forge.pki.rsa.generateKeyPair({bits: 1024});
    localStorage.setItem(name,forge.pki.privateKeyToPem(keyPair.privateKey));
    //localStorage.setItem("public key", forge.pki.publicKeyToPem(keyPair.publicKey));
  };
  return keyPair;
};
/*
var listeDesContacts = [ {"Yamine": Contact("Yamine")} , 
{"IBRAHIMA": Contact("IBRAHIMA")} , 
{"Justin": Contact("Justin")} , 
{"VALLEE": Contact("VALLEE")} ,
{"Fracjak": Contact("Fracjak")} ,
{"WOJCIECH": Contact("WOJCIECH")} , ];
*/


var listeDesContacts = {
  "Yamine": Contact("Yamine") , 
  "IBRAHIMA": Contact("IBRAHIMA") , 
  "Justin": Contact("Justin") , 
  "VALLEE": Contact("VALLEE") ,
  "Fracjak": Contact("Fracjak") ,
  "WOJCIECH": Contact("WOJCIECH") ,                       
}

console.log(listeDesContacts);

// Ajout des contacts et de leur public keys dans le localStorage
{localStorage.setItem(listeDesContacts.Yamine.name, listeDesContacts.Yamine.privateKPem);
localStorage.setItem(listeDesContacts.IBRAHIMA.name , listeDesContacts.IBRAHIMA.privateKPem);
localStorage.setItem(listeDesContacts.Justin.name , listeDesContacts.Justin.privateKPem);
localStorage.setItem(listeDesContacts.VALLEE.name , listeDesContacts.VALLEE.privateKPem);
localStorage.setItem(listeDesContacts.Fracjak.name , listeDesContacts.Fracjak.privateKPem);
localStorage.setItem(listeDesContacts.WOJCIECH.name , listeDesContacts.WOJCIECH.privateKPem);
}




//call la fonction keyPair
//var keyPair = getKeyPair();

  // Fonction2 : Contact(nom) => Assignation d'une paire de clefs à un contact (Prend en parametre le nom du contact) 
  function Contact(nom){
    let name = nom;
    let keyPair = genKeyPair(name);     // Création des clefs du users
    console.log(keyPair); 
    let publicK = keyPair.publicKey; // valeur de la clef public
    let privateK = keyPair.privateKey; // valeur de la clef privé
    let publicKPem = forge.pki.publicKeyToPem(publicK);
    let privateKPem = forge.pki.privateKeyToPem(privateK);
    
    return{
        //le nom,la clef publique,la clef privée,la paire de clefs
        name,
        publicK : publicK,
        privateK : privateK,
        publicKPem : publicKPem,
        privateKPem : privateKPem,
    }
  }

    // Fonction3 : getRecipientName() => On click du drop down pour get le nom du Destinataire
    function getRecipientName(){
      var recipientNameID = document.getElementById("contactDrop");
      var recipientName = recipientNameID.value;
      
      return {
        recipientName, 
        affiche : console.log("\n Destinataire :"+recipientName),
      } 
    }

    // Stockage des contacts

    // Initialisation du local Storage et de la liste des contacts
    
   
   

   // Fonction4 : EncryptageKey() => Renvoie la publicKey du destinataire (Prend en parametre getRecipientName.recipientName)
   function returnPublicKey(destinataire){
    let nameD = destinataire ; // On stocke le nom du contact

    for(let i in listeDesContacts){ // Parcourir le tableau de contact
      if(nameD == listeDesContacts[i].name){
        return listeDesContacts[i].publicK;
        
      }
    }
    
  }


 // Fonction5 : DecryptageKey() - Détermine privateKey de decryptage dépendemment de la clef public de cryptage ()

function returnPrivateKey(destinataire){
  let nameD = destinataire ; // On stocke le nom du contact

  for(let i in listeDesContacts){ // Parcourir le tal=bleau de contact
    if(nameD == listeDesContacts[i].name){ // S'il ya match
      return listeDesContacts[i].privateK;  // Retourner la clef privée

    }
  }

}



//Ajoute les messages au serveur dans le tableau letters
function addToLetters(){
  /******si on veut store le message dans le localStorage******/
  //var element = document.getElementById('msgResult');
  // localStorage.setItem(element.innerHTML, element.innerHTML);

  var name = getRecipientName().recipientName;
  console.log(name);

  var getPubK = returnPublicKey(name);
  console.log("Before test return pub key");
  console.log(getPubK);
  console.log("After test return pub key");


  var code;//le message crypté avec la clef publique
  var msg = document.getElementById( "msg" ).value;
    
  try {
    code = forge.util.encode64(getPubK.encrypt( forge.util.encodeUtf8( msg )));    
    document.querySelector( ".result" ).innerText = code;
    alert("Message envoyé avec succès!");
  } catch (err) {
    document.querySelector( ".result" ).innerText = err;
    console.log("ADD MARCHE PAS!!!!!!!!");
  };  
  fetch("/addLetters", {method: 'POST', headers: {'Content-Type' :'application/json'}, 
    body: JSON.stringify({msg: code})})
   .then(r => r.json())
   .then(r => console.log(r));


}

//Get les messages(letters) cryptés pour les afficher dans nouveauMessage
//function getLetters(){
 fetch("/getLetters")
 .then(response => {return response.json()})
 .then(data => {
    data.forEach(letter => {
      const message = `<p>${letter}</p>`
      monId.insertAdjacentHTML("beforeend", message)
    })
 })
 .catch(err => console.log(err))
//}

//Get les messages(letters) cryptés pour les afficher dans messagesEnvoyes
fetch("/getLetters")
.then(response => {return response.json()})
.then(data => {
   data.forEach(letter => {
    const message = `<a class="inb-active list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
    <div class="d-flex w-100 align-items-center justify-content-between">
      <span class="mb-1">Envoyé avec succès!</span>
      <small>Wed</small>
    </div>
    <div class="col-10 mb-1 small">${letter}</div>
  </a>`
  boiteEnvoye.insertAdjacentHTML("beforeend", message)
   
   
    })
})
.catch(err => console.log(err))




fetch("http://localhost:1227/getPeers")
.then(response => {return response.json()})
.then(data => {
   data.forEach(peer => {

     const message = `<a href="#" class="env-active list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
     <div class="d-flex w-100 align-items-center justify-content-between">
       <strong class="mb-1">${peer}</strong>
     </div>
     </a>`
     peerDiv.insertAdjacentHTML("beforeend", message)
   })
})
.catch(err => console.log(err))

fetch("http://localhost:1227/getLetters")
.then(response => {return response.json()})
.then(data => {
   data.forEach(letter => {

     const message = `<a href="#" class="env-active list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
     <div class="d-flex w-100 align-items-center justify-content-between">
       <strong class="mb-1">${letter}</strong>
     </div>
     </a>`
     peerMsgDiv.insertAdjacentHTML("beforeend", message)
   })
})
.catch(err => console.log(err))

//Get les messages(letters) décryptés pour les afficher dans index (boite de réception)
fetch("/getLetters")
.then(response => {return response.json()})
.then(data => {
   data.forEach(letter => {
    try {
    var name = "WOJCIECH";
    var getPriK = returnPrivateKey(name);
      var msg = forge.util.decodeUtf8(getPriK.decrypt( forge.util.decode64( letter )));
      const message = `<a id="${msg}" href="#" class="inb-active list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
     <div class="d-flex w-100 align-items-center justify-content-between">
       <strong class="mb-1">${name}</strong>
       <small>Wed</small>
     </div>
     <div class="col-10 mb-1 small">${msg}</div>
   </a>`
   boite.insertAdjacentHTML("beforeend", message)

    } catch (err) {
      console.log(err);
    };

     
   })
})
.catch(err => console.log(err))

//Get les messages(letters) décryptés pour les afficher dans messagesEnvoyes
/*
fetch("/getLetters")
.then(response => {return response.json()})
.then(data => {
   data.forEach(letter => {
    try {
    var name = "WOJCIECH";
    var getPriK = returnPrivateKey(name);
      var msg = forge.util.decodeUtf8(getPriK.decrypt( forge.util.decode64( letter )));
      const message = `<a id="${msg}" href="#" class="inb-active list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
     <div class="d-flex w-100 align-items-center justify-content-between">
       <span class="mb-1">${name}</span>
       <small>Wed</small>
     </div>
     <div class="col-10 mb-1 small">${msg}</div>
   </a>`
   boiteEnvoye.insertAdjacentHTML("beforeend", message)

    } catch (err) {
      console.log(err);
    };

     
   })
})
.catch(err => console.log(err))
*/
/*
document.getElementById ("btnsave").addEventListener ("click", resetEmotes, false);

function displayOnRight(msg){

  if (lsOutput){
    lsOutput.innerHTML = "";
}
  lsOutput.innerHTML += `${msg}`;
}
*/

document.getElementById( "decrypt" ).addEventListener( "click", event => {

  var name = getRecipientName().recipientName;
  console.log(name);
  var getPriK = returnPrivateKey(name);
  console.log(getPriK);

  var msg = document.getElementById( "msg" ).value;

  console.log(msg);
  try {
    document.querySelector( ".resultDecrypt" ).innerText =
    forge.util.decodeUtf8(getPriK.decrypt( forge.util.decode64( msg )));
    alert("Message décrypté avec succès!");
  } catch (err) {
    document.querySelector( ".resultDecrypt" ).innerText = err;
    console.log("DECRYPT NE FONCTIONNE PAS!!!");
  };
});


//Quand on click sur envoyer dans nouveauMessage, on call la fonction addToLetters
var form = document.getElementById('formId');
form.addEventListener("submit", addToLetters);

/***********************************************/
/*********fonction encrypt du prof*************/
/***********************************************/
/*
document.getElementById( "encrypt" ).addEventListener( "click", event => {
  var msg = document.getElementById( "msg" ).value;
  try {
    document.querySelector( ".result" ).innerText =
      forge.util.encode64( keyPair.publicKey.encrypt( forge.util.encodeUtf8( msg )));
  } catch (err) {
    document.querySelector( ".result" ).innerText = err;
  };
});
*/

/***********************************************/
/*********fonction decrypt du prof*************/
/***********************************************/
/*
document.getElementById( "decrypt" ).addEventListener( "click", event => {
  var msg = document.getElementById( "msg" ).value;
  try {
    document.querySelector( ".result" ).innerText =
      forge.util.decodeUtf8( keyPair.privateKey.decrypt( forge.util.decode64( msg )));
  } catch (err) {
    document.querySelector( ".result" ).innerText = err;
  };
});
*/

//localStorage.setItem("Object.keys(letters)[0]", Object.keys(letters)[0]);