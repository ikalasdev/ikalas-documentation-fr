---
description: Démarrez rapidement avec l'API d'Ikalas
---

# Démarrage rapide

Ce guide vous aidera à démarrer rapidement avec l'API d'Ikalas.

## Prérequis

- Un compte Ikalas
- Une clé API valide
- Node.js (pour les exemples JavaScript)

## Installation

Pour les projets JavaScript/Node.js, installez le client officiel :

```bash
npm install ikalas-api-client
```

## Premier appel à l'API

Voici un exemple simple pour commencer à utiliser l'API d'Ikalas :

```javascript
const { IkalasClient } = require("ikalas-api-client");

// Initialisez le client avec votre clé API
const client = new IkalasClient("VOTRE_CLE_API");

// Exemple de requête simple
async function exempleRequete() {
  const reponse = await client.conversation.creer({
    messages: [
      { role: "user", content: "Bonjour, comment puis-je utiliser Ikalas?" },
    ],
    modele: "ikalas-v1",
  });

  console.log(reponse.data);
}

exempleRequete();
```

## Étapes suivantes

Après ce démarrage rapide, consultez les sections suivantes pour approfondir vos connaissances :

- [Vue d'ensemble de l'API](../basics/editor.md)
- [Gestion du contexte des conversations](../basics/managing-conversation-context.md)
- [Exemples JavaScript/Node.js](../javascript/nodejs-examples.md)
