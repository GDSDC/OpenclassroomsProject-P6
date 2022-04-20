# OpenClassRooms Project-P6

OpenClassRooms Project-P6 est un projet ayant un but d'apprentissage dans le cadre de la formation OpenClassRooms Développeur d'Application Python.
Thème du projet : Développez une interface utilisateur pour une application web Python.

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

