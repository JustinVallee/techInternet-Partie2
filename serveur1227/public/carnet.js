
// Code pour la barre de recherche

function getValeur() {
  //Recupérer le contenue de la recherche
  var searchValue = document.getElementById('recherche').value;

  // Si la recherche à une correspondance dans le carnet d'adresse : Switcher
  if (localStorage.getItem(searchValue)) {
    //alert("Vous serez rediriger vers le contact : <" + searchValue+ "> dans le carnet d'adresse");
    window.location = 'carnetdaddresses.html#'+ searchValue; // Chargez la page du carnet d'adresse
    //prompt('Boosso', 'tutu')
  
    
  } 


}
