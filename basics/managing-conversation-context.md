---
description: Comment gérer efficacement le contexte des conversations avec l'API d'Ikalas
---

# Gestion du contexte de la conversation dans l'API

La gestion efficace du contexte des conversations est essentielle pour créer des expériences conversationnelles naturelles et cohérentes avec l'API d'Ikalas.

## Comprendre le contexte de conversation

Le contexte de conversation fait référence à l'historique des échanges entre l'utilisateur et l'assistant. Cet historique permet à l'assistant de comprendre les références, de maintenir la cohérence et de fournir des réponses pertinentes.

## Structure des messages

Les conversations avec l'API d'Ikalas sont structurées comme une série de messages, chacun ayant un `role` et un `content` :

```json
{
  "messages": [
    {
      "role": "system",
      "content": "Vous êtes un assistant spécialisé en cuisine française."
    },
    { "role": "user", "content": "Comment faire une ratatouille?" },
    {
      "role": "assistant",
      "content": "La ratatouille est un plat provençal traditionnel..."
    },
    { "role": "user", "content": "Et quels vins accompagnent bien ce plat?" }
  ]
}
```

### Types de rôles

- **system** : Définit le comportement et les connaissances de l'assistant
- **user** : Messages envoyés par l'utilisateur
- **assistant** : Réponses générées par l'IA
- **function** (avancé) : Pour les appels de fonction et leurs résultats

## Méthodes de gestion du contexte

### 1. Conservation de l'historique complet

```javascript
// Exemple avec conservation de l'historique complet
const conversation = [
  { role: "system", content: "Vous êtes un assistant utile." },
  { role: "user", content: "Bonjour!" },
];

// Premier appel API
const reponse1 = await client.conversation.creer({
  messages: conversation,
  modele: "ikalas-v1",
});

// Ajout de la réponse à l'historique
conversation.push(reponse1.choices[0].message);

// Nouvel input utilisateur
conversation.push({
  role: "user",
  content: "Quelle est la capitale de la France?",
});

// Deuxième appel API avec l'historique complet
const reponse2 = await client.conversation.creer({
  messages: conversation,
  modele: "ikalas-v1",
});
```

### 2. Fenêtre glissante

Pour les conversations longues, vous pouvez implémenter une fenêtre glissante qui conserve uniquement les N derniers messages :

```javascript
function fenetreGlissante(conversation, tailleMax = 10) {
  if (conversation.length <= tailleMax) return conversation;

  // Toujours conserver le message système s'il existe
  const messageSysteme = conversation.find((msg) => msg.role === "system");

  // Obtenir les derniers messages (sans le message système s'il existe)
  const messagesRecents = conversation
    .filter((msg) => msg.role !== "system")
    .slice(-tailleMax);

  // Reconstruire la conversation avec le message système au début si nécessaire
  return messageSysteme
    ? [messageSysteme, ...messagesRecents]
    : messagesRecents;
}
```

### 3. Résumé de conversation

Pour les conversations très longues, vous pouvez utiliser l'API pour générer un résumé :

```javascript
async function resumeConversation(conversation) {
  const prompt = {
    role: "system",
    content:
      "Résumez brièvement la conversation suivante, en conservant les informations essentielles.",
  };

  const reponseResume = await client.conversation.creer({
    messages: [prompt, ...conversation],
    modele: "ikalas-v1",
    max_tokens: 200,
  });

  return {
    role: "system",
    content: `Contexte de la conversation précédente: ${reponseResume.choices[0].message.content}`,
  };
}
```

## Bonnes pratiques

1. **Messages système clairs** : Utilisez des messages système précis pour définir le comportement de l'assistant
2. **Gestion de la taille** : Surveillez et limitez la taille totale des tokens dans vos requêtes
3. **Conservation sélective** : Conservez les parties les plus pertinentes de la conversation
4. **Stockage côté serveur** : Pour les applications avec authentification, stockez l'historique des conversations côté serveur

## Exemples de code complets

Consultez la section [Exemples JavaScript/Node.js](../javascript/nodejs-examples.md) pour des implémentations complètes.
