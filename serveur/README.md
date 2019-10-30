# REST API sous NodeJs

## Documentation 
**Note importante: toutes les durées sont en minutes** 

```
/all [Retourne toutes les lignes avec temps, prix du voyage ainsi que les arrêts].
```

```
/cheap [Retourne les lignes les moins cher].
```

```
/speed [Retourne les lignes les plus rapide].
```

```
/search/:price/:time [Retourne les ligne cohérentes avec les crytères demandés (:time|:price)]
```
**A savoir que :price :time sont des variables renseignées à partir du formulaire de recherche**

* Les données sont stockées sur sqlite3 **bdd.sqlite** 
* Il est fournis avec l'API un fichier **insert.sql** qui contiens un jeu de données
Si vous voulez remettre au propre la base :
```
$ sqlite3 bdd.sqlite
```
Vous êtes dans la console sqlite
```
> DELETE FROM ligne;
```
```
> .read insert.sql
```

## Auteur
**Alexandre Blerreau**

## Licence
L'API est soumise à la licence Do **What the Fuck You Want to Public License (WTFPL)**
