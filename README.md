# 👶 Œil des Parents

## Système intelligent de surveillance de bébé basé sur l'Internet des Objets et l'Intelligence Artificielle

Œil des Parents est un système intelligent de surveillance conçu pour assister les parents dans le suivi en temps réel de l'état de leur bébé.

Le système combine plusieurs capteurs, une caméra Raspberry Pi, l'analyse audio et un moteur d'intelligence artificielle afin de détecter automatiquement différentes situations telles que :

* Bébé éveillé
* Bébé endormi
* Bébé en mouvement
* Pleurs
* Bruit anormal
* Absence du bébé
* Niveau de danger

Toutes les informations sont centralisées dans une interface web moderne permettant de suivre l'état du bébé en temps réel.

---

# Architecture du projet

```
projet-oeilDesParents
│
├── baby_monitor_ai/      # Nœud IoT exécuté sur Raspberry Pi
├── backend/              # API Flask + moteur IA
├── frontend/             # Tableau de bord React
├── docs/                 # Rapport, cahier des charges et documentation
└── README.md
```

---

# Fonctionnalités

## Acquisition des données

* Capture vidéo avec Raspberry Pi Camera IMX477
* Détection de mouvement
* Détection de présence
* Détection des yeux ouverts / fermés
* Acquisition audio
* Lecture des capteurs PIR
* Lecture des capteurs de température
* Contrôle des LED

## Intelligence artificielle

* Analyse des données caméra
* Classification des sons
* Fusion des informations caméra, audio et capteurs
* Calcul d'un score de danger
* Détermination automatique de l'activité du bébé
* Prédiction du comportement
* Génération d'alertes intelligentes

## Tableau de bord

* État du bébé en temps réel
* Résumé des informations
* Analyse comportementale
* Évolution du score de danger
* Recommandations intelligentes
* Historique des événements
* Notifications en direct

---

# Technologies utilisées

## Raspberry Pi

* Raspberry Pi 3 Model B
* Raspberry Pi OS
* Picamera2
* OpenCV
* Python

## Backend

* Python
* Flask
* Flask-CORS
* Flask-SocketIO
* Requests

## Intelligence Artificielle

* TensorFlow / Keras
* Librosa
* NumPy
* Scikit-learn
* Joblib

## Frontend

* React
* Vite
* Socket.IO Client
* CSS3

---

# Matériels utilisés

* Raspberry Pi 3 Model B
* Caméra Raspberry Pi IMX477
* Capteur PIR HC-SR501
* Capteur de son
* Capteur de température
* LED verte
* LED jaune
* LED rouge
* Breadboard
* Résistances 220 Ω
* Carte microSD 16 Go

---

# Structure du système

Le système est composé de trois modules principaux :

### 1. Nœud IoT (Raspberry Pi)

Acquisition des données provenant de la caméra et des différents capteurs.

### 2. Backend

Fusion des données, prise de décision par le moteur d'intelligence artificielle et diffusion des résultats en temps réel.

### 3. Frontend

Affichage des informations sous forme d'un tableau de bord interactif permettant aux parents de surveiller le bébé.

---

# Documentation

Le dossier **docs/** contient :

* Rapport du projet
* Cahier des charges
* Présentation
* Diagrammes UML
* Documentation technique

---

# Installation

## Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Raspberry Pi

```bash
cd baby_monitor_ai
source venv/bin/activate
python main.py
```

---

# Auteur

Roger Camara

Projet de fin d'études — Smart Systems Engineering

---

# Licence

Projet académique réalisé dans le cadre des études de Smart Systems Engineering.
