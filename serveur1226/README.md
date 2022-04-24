# Projet de fin de session "Mini-serveur pour courriel"
-----------------------------------------------------------------------
# Pour voir les messages dans la page "Boîte de réception" (de WOJCIECH), il faut d'abord en créer :

1. clicker sur le boutton Noveau message

2. sélectionner WOJCIECH, et écrire un message

3. faire Envoyer et 'ok' sur l'alerte de succès

4. voir dans la page "Boîte de réception" de (WOJCIECH)

Pour voir les messages envoyés dans la page "Messages envoyés" :

1. clicker sur le boutton Noveau message

2. sélectionner un contact, et écrire un message

3. faire Envoyer et 'ok' sur l'alerte de succès

4. voir dans la page "Messages envoyés"

'Tous les messages dans "Messages envoyés" sont les messages envoyés à partir du serveur 1226, bien sur qu'il sont cryptés, car seul le destinaire peut les décrypter avec sa clef privé.' 


Pour tester le décryptage de tous les messages envoyés :

1. aller dans la page message envoyés

2. copier le message désiré

3. clicker sur le boutton Noveau message

4. sélectionner la bonne clef (le bon contact)

5. faire Decrypter et 'ok' sur l'alerte de succès

6. voir le message décrypté un peu plus bas dans la page


Pour voir les informations des peers du serveur 1227 tel que les peers et les messages :

1. lancer les deux serveurs

2. voir les informations dans la page "Peer"


Pour ajouter un message dans la page "Peer" du serveur 1226 :

1. aller sur le serveur 1227

2. clicker sur le boutton Noveau message

3. sélectionner un contact, et écrire un message

4. faire Envoyer et 'ok' sur l'alerte de succès

4. voir dans la page "Peer" du serveur 1226



# Dépendances

Il faut installer les dépendances suivantes

  "dependencies": {
  
    "cors": "^2.8.5",
    
    "express": "^4.17.3",
    
    "forge": "^2.3.0",
    
    "http-get-json": "^1.0.1"
  },
  
  "devDependencies": {
  
    "node-forge": "^1.3.1"
  }

# Fichiers de la solution

        ├── index.js         --- code js du serveur
        ├── package.json     --- fichier des dépendances 
        ├── node_modules     --- tous les packages
        ├── public           --- répertoire avec ressources statiques
        │              ├── carnet.js --- fichier copié de la partie 1 : pour chercher un contact
        │              ├── client.js     --- fichier pour le côté client
        │              ├── forge.min.js    --- fichier copié de 'node-forge'.
        │              └── index.html      --- fichier copié de la partie 1 : page d'accueil du site
        │              ├── nouveauMessage.html   --- fichier copié de la partie 1 : page pour envoyer un message
        │              ├── messages_envoyes.html   --- fichier copié de la partie 1 : page pour consulter les messages envoyés.
		    │              ├── peer.html --- fichier pour les informations d'un autre serveur (peer)
        │              ├── carnetdaddresses.html   --- fichier copié de la partie 1 : page pour consulter la liste    des contacts.
		    │              ├── custom.css fichier copié de la partie 1 : le css

        └── README.md


