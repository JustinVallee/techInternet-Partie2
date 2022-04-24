//var get = require("http-get-json");

//instances des packages désirés
var express = require("express"),
    get = require("http-get-json"),
    bodyParser = require('body-parser'),
    app = express();

const cors =require("cors");
app.use(cors());


// exemple du contenu d'un message : {msg: "asfasdfasdfasdf....="}
//pour stocker les données des lettres (messages) et les peers (les différents serveurs)
var letters = {"Message1" : "Message1","Message2" : "Message2"};
var peers = {"http://localhost1227" : "http://localhost1227"};


//les fichiers statics
app.use(express.static("public"));

//mettre dans le console.log les requêtes
app.use((req,res,next) =>{ console.log(req.url);next();});

//pour get les letters (les messages)
app.get("/getLetters",(req,res,next)=>{
    
    res.json(Object.values(letters));
    
});

/********Je crois que ca fonctionne mais pas encore testé**********/
//pour get les peers (les différents serveurs)
app.get("/getPeers", (req, res)=>{
    res.json(Object.values(peers));
});

app.get("http://localhost:1227/getPeers", (req, res)=>{
    res.json(Object.values(peers));
});

app.get("http://localhost:1227/getLetters", (req, res)=>{
    res.json(Object.values(letters));
});


//pour ajouter une letter (écrire un message)
app.post("/addLetters", bodyParser.json(), (req,res,next)=>{ 
   var msg = req.body.msg;
   letters[msg] = msg;
   
    res.json("Requête d'ajouter un message complétée.");
    
 });

//numéro de port que le serveur run
app.listen(1226);

/********Je crois que ca fonctionne mais pas encore testé**********/
//requete pour faire un serveur vers l'autre
/*
setInterval(()=> get(`${Object.values(peers)[1]}/peers`, (err, newPeers)=> {
    if (err) return console.error(err);
    console.log();
    newPeers.forEach(newPeer => peers[newPeers] = newPeer);
}

), 30000);*/
/*
app.get(`${Object.values(peers)[1]}/peers`, (req, res)=>{
    res.json(Object.values(peers));
});*/

