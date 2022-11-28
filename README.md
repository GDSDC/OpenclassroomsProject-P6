<h3 align="center">
    <img alt="Logo" title="#logo" width="250px" src="/assets/16004298163529_P5.png">
    <br>
</h3>


# OpenClassrooms Projet P6

- [Objectif](#obj)
- [Compétences](#competences)
- [Technologies](#techs)
- [Requirements](#reqs)
- [Architecture](#architecture)
- [Configuration locale](#localconfig)
- [Présentation](#presentation)

<a id="obj"></a>
## Objectif

L’association JustStreamIt est connue pour ses newsletters de classement de films. Ces classements ont sauvé bien des soirées à ses abonnés toujours plus nombreux, comme le dit leur slogan : “Tu ne sais pas quoi regarder pour passer une bonne soirée ? Alors JustStreamIt”. 
L'objectif du projet de développer une application web permettant de visualiser en temps réel un classement de films intéressants en utilistant l'api fournie (repository Github : [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)).

<a id="competences"></a>
## Compétences acquises
- Développer la partie Front-End d’une application avec HTML, CSS et JavaScript
- Interagir avec une API REST

<a id="techs"></a>
## Technologies Utilisées
- [HTML](https://developer.mozilla.org/fr/docs/Web/HTML)
- [JavaScrip](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [CSS](https://developer.mozilla.org/fr/docs/Web/CSS)

<a id="reqs"></a>
## Requirements
aucun

<a id="architecture"></a>
## Architecture et répertoires
```
Project
├── src
│   ├── assets : package contenant les algorithmes développés
│   ├── css : répertoire contenant le css
│   ├── js : répertoire contenant le javascript
│   ├── index.html : page principale
```

<a id="localconfig"></a>
## Configuration locale
## Installation

### 1. Récupération du projet sur votre machine locale

Clonez le repository sur votre machine.

```bash
git clone https://github.com/GDSDC/OpenclassroomsProject-P6.git
```

Accédez au répertoire cloné.
```bash
cd OpenclassroomsProject-P6
```

### 2. Récupération et mise en service de l'API OCMovies-API

Clonez le repository à la base du réportoire du Project-P6.

```bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```

Accédez au répertoire cloné.
```bash
cd OCMovies-API-EN-FR
```

Créez l'environnement virtuel env.
```bash
python -m venv env
```

Activez votre environnement virtuel env nouvellement créé.
```bash
source env/bin/activate
```

Installez les paquets présents dans la liste requirements.txt
```bash
pip install -r requirements.txt
```

Créer et alimenter la base de données
```bash
python manage.py create_db
```

Démarrer le serveur
```bash
python manage.py runserver
```


## Utilisation

Ouvrez le ficher OpenclassroomsProject-P6/src/index.html à l'aide d'un navigateur.


<a id="presentation"></a>
### Présentation

[<img alt="presentation" width="480px" src="/assets/presentation.png">](https://docs.google.com/presentation/d/e/2PACX-1vTSUxaJ2euwfwH8mSxhuextNAM0EVNOrpA11h7_2QxJR-eYARsewN8XxMk4ULvYtevuFTQ3FMvCgFQ8/pub?start=true&loop=false&delayms=5000)




