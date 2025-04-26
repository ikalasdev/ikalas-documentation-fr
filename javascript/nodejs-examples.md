---
description: Exemples d'utilisation de l'API d'Ikalas avec JavaScript et Node.js
---

# Exemples JavaScript/Node.js

Cette page présente des exemples concrets d'utilisation de l'API d'Ikalas avec JavaScript et Node.js.

## Installation

Commencez par installer le client officiel Ikalas pour Node.js :

```bash
npm install ikalas-api-client
```

## Configuration du client

```javascript
const { IkalasClient } = require("ikalas-api-client");

// Initialisez le client avec votre clé API
const client = new IkalasClient("VOTRE_CLE_API");

// Optionnel: Configuration supplémentaire
client.setTimeout(30000); // Timeout de 30 secondes
```

## Exemples de base

### Conversation simple

```javascript
async function conversationSimple() {
  try {
    const reponse = await client.conversation.creer({
      messages: [
        { role: "system", content: "Vous êtes un assistant utile et concis." },
        { role: "user", content: "Qu'est-ce que l'intelligence artificielle?" },
      ],
      modele: "ikalas-v1",
      temperature: 0.7,
    });

    console.log(reponse.choices[0].message.content);
  } catch (erreur) {
    console.error("Erreur:", erreur);
  }
}
```

### Génération de texte avec paramètres avancés

```javascript
async function genererTexteAvance() {
  try {
    const reponse = await client.conversation.creer({
      messages: [
        {
          role: "system",
          content: "Vous êtes un poète qui écrit en français.",
        },
        { role: "user", content: "Écrivez un court poème sur la nature." },
      ],
      modele: "ikalas-v1",
      temperature: 0.9, // Augmente la créativité
      top_p: 0.95, // Échantillonnage avec top-p
      max_tokens: 200, // Limite la longueur de la réponse
      presence_penalty: 0.6, // Encourage la diversité
      frequency_penalty: 0.2, // Réduit les répétitions
    });

    console.log(reponse.choices[0].message.content);
  } catch (erreur) {
    console.error("Erreur:", erreur);
  }
}
```

## Gestion des conversations

### Conservation de l'historique

```javascript
async function conversationAvecHistorique() {
  const conversation = [
    {
      role: "system",
      content: "Vous êtes un guide touristique expert sur Paris.",
    },
    {
      role: "user",
      content: "Quels sont les monuments incontournables à Paris?",
    },
  ];

  try {
    // Premier échange
    const reponse1 = await client.conversation.creer({
      messages: conversation,
      modele: "ikalas-v1",
    });

    // Ajouter la réponse à l'historique
    conversation.push(reponse1.choices[0].message);
    console.log("Assistant:", reponse1.choices[0].message.content);

    // Deuxième question
    conversation.push({
      role: "user",
      content: "Combien de temps faut-il pour visiter la Tour Eiffel?",
    });

    // Deuxième échange avec l'historique complet
    const reponse2 = await client.conversation.creer({
      messages: conversation,
      modele: "ikalas-v1",
    });

    console.log("Assistant:", reponse2.choices[0].message.content);
  } catch (erreur) {
    console.error("Erreur:", erreur);
  }
}
```

## Gestion des erreurs

```javascript
async function gestionErreurs() {
  try {
    const reponse = await client.conversation.creer({
      messages: [{ role: "user", content: "Bonjour" }],
      modele: "modele-inexistant", // Modèle invalide qui causera une erreur
    });
  } catch (erreur) {
    if (erreur.response) {
      console.error(
        "Erreur API:",
        erreur.response.status,
        erreur.response.data
      );
      // Gérer les différents codes d'erreur
      if (erreur.response.status === 401) {
        console.error("Authentification échouée. Vérifiez votre clé API.");
      } else if (erreur.response.status === 400) {
        console.error("Requête invalide:", erreur.response.data.error.message);
      }
    } else if (erreur.request) {
      console.error("Erreur réseau. Pas de réponse reçue.");
    } else {
      console.error("Erreur:", erreur.message);
    }
  }
}
```

## Application Express complète

```javascript
const express = require("express");
const { IkalasClient } = require("ikalas-api-client");
const app = express();
const port = 3000;

// Configuration
app.use(express.json());
const client = new IkalasClient("VOTRE_CLE_API");

// Stocker les conversations (dans une application réelle, utilisez une base de données)
const conversations = {};

// Créer une nouvelle conversation
app.post("/api/conversations", (req, res) => {
  const id = Date.now().toString();
  conversations[id] = {
    id,
    messages: [{ role: "system", content: "Vous êtes un assistant utile." }],
  };
  res.json({ id, messages: conversations[id].messages });
});

// Ajouter un message à une conversation existante
app.post("/api/conversations/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!conversations[id]) {
      return res.status(404).json({ error: "Conversation non trouvée" });
    }

    // Ajouter le message utilisateur
    conversations[id].messages.push({ role: "user", content });

    // Obtenir la réponse de l'API
    const reponse = await client.conversation.creer({
      messages: conversations[id].messages,
      modele: "ikalas-v1",
    });

    // Ajouter la réponse à l'historique
    const messageAssistant = reponse.choices[0].message;
    conversations[id].messages.push(messageAssistant);

    res.json({
      message: messageAssistant,
      conversation_id: id,
    });
  } catch (erreur) {
    console.error("Erreur:", erreur);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Obtenir l'historique d'une conversation
app.get("/api/conversations/:id", (req, res) => {
  const { id } = req.params;

  if (!conversations[id]) {
    return res.status(404).json({ error: "Conversation non trouvée" });
  }

  res.json(conversations[id]);
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
```

## Ressources supplémentaires

- [Vue d'ensemble de l'API](../basics/editor.md)
- [Gestion du contexte de la conversation](../basics/managing-conversation-context.md)
