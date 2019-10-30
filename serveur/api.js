
/** NODEJS API | AutoCar Challenge **/


/** modules **/
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');

/* Configuration globale **/
var app = express();
var port = process.env.PORT || 8080;
var db = new sqlite3.Database('bdd.sqlite');

//////////////////////////////////////////////////////////////////


app.use(bodyParser.json()); /* Réponse en Json */
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
/* le header */
res.header("Access-Control-Allow-Origin", "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,    Content-Type, Accept");
next();
});

//////////////////////////////////////////////////////////////////
/* Init base */

/** ajout de la table ligne si elle n'existe pas **/
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS ligne (id INTEGER PRIMARY KEY , prix INTEGER, temps INTEGER, ARRETS TEXT);");
});


//////////////////////////////////////////////////////////////////


/** ça marche ? juste pour le débug
app.get('/', function(req, res){
res.send("L'API est fonctionelle");
}); **/

//////////////////////////////////////////////////////////////////


/* Liste toutes les lignes */
app.get('/all', function(req, res, next) {

res.setHeader("Content-Type", "application/json");
db.all("SELECT * FROM ligne;", function(err, rows) {
   
    if (err) {
    // erreur du coté de l'api, l'intitulé de l'erreur d'affiche sur la console	
    console.error(err);
    res.status(500);    
    res.json({ "error" : err });
    } else {
        
        // ça marche! les données sont retournés en format json
        res.status(200);    
        res.json(rows);
    }
  });
});



//////////////////////////////////////////////////////////////////

 /* Retourne la ligne la plus rapide */

app.get('/speed', function(req,res,next){

res.setHeader("Content-Type", "application/json");
db.all("SELECT MIN(temps) as temps,prix,ARRETS from ligne", function(err,rows){

  if(err){
    // erreur du coté de l'api, l'intitulé de l'erreur d'affiche sur la console	
    res.status(500);
    res.json({"error" : err});
  }
  else {
    // ça marche! les données sont retournés en format json
    res.status(200);
    res.json(rows);
  }
 });
});

//////////////////////////////////////////////////////////////////

/* Retourne la ligne la moins cher */

app.get('/cheap', function(req,res,next){

res.setHeader("Content-Type", "application/json");
db.all("SELECT MIN(prix) as prix,temps,ARRETS from ligne", function(err,rows){

  if(err){
    // erreur du coté de l'api, l'intitulé de l'erreur d'affiche sur la console	
    res.status(500);
    res.json({"error" : err});
  }
  else {
    // ça marche! les données sont retournés en format json
    res.status(200);
    res.json(rows);
  }
 });
});

//////////////////////////////////////////////////////////////////

/* Recherche en base selon les crytères endUser */

app.get('/search/:price/:time', function(req,res,next){


    /* Dans le cas ou tous les crytères sont reseignés*/
    res.setHeader("Content-Type", "application/json");
    db.all("SELECT * FROM ligne WHERE temps <= :time AND prix <= :price", [req.params.time, req.params.price], function(err,rows){
      if(err){
        // erreur du coté de l'api, l'intitulé de l'erreur d'affiche sur la console	
        res.status(500);
        res.json({"error" : err});
      }
      else {
        // ça marche! les données sont retournés en format json
        res.status(200);
        res.json(rows);
      }
    });
  });




//////////////////////////////////////////////////////////////////

/* serveur rest*/

// Evite l'erreur 304 ?
app.disable('etag');

app.listen(port);

console.log('En écoute sur ' + port);

//////////////////////////////////////////////////////////////////