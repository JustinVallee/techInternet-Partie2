# Projet de fin de session "Mini-serveur pour courriel"

Réalisé par Justin Vallée et Yamine Ibrahima
            valj27@uqo.ca  -  ibry01@uqo.ca
            
Voici la Partie 2 du projet de messagerie Web pour le cours INF4533


## I - Spécification
	

### A- Contexte du projet 

Le but du projet est de concevoir et d'implémenter un mini-serveur et une interface web à partir de laquelle un utilisateur (client web) peut envoyer et recevoir des messages. Le mini-serveur s'exécute localement sur la machine du client afin que l'interface web puisse fonctionner sans connexion internet.	

### B- Exigences principales / Fonctionnement général

L'interface web doit être un Single Page Application (SPA). 
Les messages doivent être cryptés suivant le modèle de chiffrement asymétrique, et stockés dans le mini-serveur.
Chaque utilisateur de l'interface doit posséder une paire de clefs (publique et privée).
La clef publique fait office d'adresse tandis que la clef privée sert à décrypter les messages.
Avant qu'un message ne soit envoyé, il doit être crypté avec la clef publique du destinataire. Ainsi, seul ce dernier, en possession de la clef privée correspondante, pourra décrypter le message qui lui est destiné.


## II - Architecture de la solution

### A- Décomposition du problème

Pour pouvoir mener à bien ce projet et mettre sur pied cette interface, nous avons établi 8 principales tâches :

1. Créer une SPA
2. Stocker le carnet d'adresse et les données
3. Établir la communication Client - Serveur
4. Chiffrer les messages
5. Envoyer les messages chiffrés au serveur
6. Renvoyer tous les messages stockés dans un serveur
7. Déchiffrer les messages
8. Établir une communication Serveur - Serveur 

### B- Développement de la solution

L'environnement de développement utilisé est Visual Studio Code. Les langages utilisés pour la réalisation de l'interface sont : HTML - CSS & JavaScript (JS). La plateforme logicielle utilisée pour le côté serveur est NodeJS. Toutes les pages web de l'interface s'exécutent sur une seule page ( Single Page Application). Le stockage du carnet d'adresse (contacts + clefs publiques) est effectué via le localStorage. Pour l'instanciation des serveurs, nous avons utilisé le framework node Express JS. La collecte des messages est effectuée par 2 serveurs sur les ports 1226 et 1227 du LocalHost. 
Pour établir la communication client - serveur, nous avons utilisé les méthodes POST et GET :

- POST  => Poste / Stocke les messages du client.
- GET  => Retourne tous les messages stockés sur un serveur.

Pour établir la communication serveur - serveur, nous avons utilisé la méthode GET :
- GET => Retourne tous les messages stockés sur un serveur et la liste des pairs.


### IL EST IMPORTANT D'INSTALLER LES DÉPENDANCES REQUISES POUR QUE L'APPLICATION FONCTIONNE

  "dependencies": {
  
    "cors": "^2.8.5",
    
    "express": "^4.17.3",
    
    "forge": "^2.3.0",
    
    "http-get-json": "^1.0.1"
  },
  
  "devDependencies": {
  
    "node-forge": "^1.3.1"
  }
  
### Serveur pour notre réseau de peers

1. Serveur 1226
2. Serveur 1227


