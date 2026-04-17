# Todo App JS

Une application Todo simple construite avec Node.js (Express.js) pour le backend et HTML/CSS/JavaScript pour le frontend.

## Description

Cette application permet de créer, consulter et gérer une liste de tâches (todos). Elle dispose d'une API REST complète et d'une interface utilisateur intuitive.

## Structure du Projet

```
todoapp_js/
├── backend/
│   ├── app.js                 # Serveur Express principal
│   ├── package.json           # Dépendances du projet
│   ├── data.json              # Fichier de données des todos
│   ├── controller/
│   │   └── todos.js           # Logique métier des todos
│   └── router/
│       └── todos.js           # Routes API
└── frontend/
    ├── index.html             # Page HTML principale
    ├── script.js              # Logique JavaScript client
    └── style.css              # Styles CSS
```

## Stack Technologique

### Backend
- **Node.js** - Runtime JavaScript côté serveur
- **Express.js** - Framework web minimaliste
- **CORS** - Middleware pour gérer les requêtes cross-origin
- **Nodemon** - Outil de développement pour auto-reload

### Frontend
- **HTML5** - Structure
- **CSS3** - Styles
- **JavaScript Vanilla** - Interactivité client

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm

### Étapes d'installation

1. **Cloner ou télécharger le projet**
   ```bash
   cd todoapp_js
   ```

2. **Installer les dépendances du backend**
   ```bash
   cd backend
   npm install
   ```

## Démarrage

### Lancer le serveur
```bash
cd ./backend
npm start
```

Le serveur démarrera sur `http://localhost:8080`

### Accéder à l'application
Ouvrez votre navigateur et accédez à :
```
http://localhost:8080
```

## Utilisation

1. Entrez une nouvelle tâche dans le champ de saisie
2. Cliquez sur le bouton "Ajouter" pour créer la tâche
3. Les tâches s'affichent dans la liste
4. Utilisez les boutons sur chaque tâche pour les modifier ou les supprimer
5. Consultez l'API en cliquant sur le bouton "Voir l'API"

## API REST

### Endpoints disponibles

- **GET /todos** - Récupère toutes les tâches
- **POST /todos** - Crée une nouvelle tâche
- **PUT /todos/:id** - Met à jour une tâche
- **DELETE /todos/:id** - Supprime une tâche

### Format des données

```json
{
  "id": 1,
  "title": "Ma tâche",
  "completed": false
}
```

## Commandes disponibles

```bash
# Lancer le serveur en mode développement (avec auto-reload)
npm start

# Lancer les tests
npm test
```

## Auteur

Theodore Najman