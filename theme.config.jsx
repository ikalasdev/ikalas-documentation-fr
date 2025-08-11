export default {
  logo: <span>Ikalas Documentation</span>,
  project: {
    link: "https://github.com/ikalasdev/ikalas-documentation-fr",
  },
  docsRepositoryBase: "https://github.com/ikalasdev/ikalas-documentation-fr",
  footer: {
    text: "© 2024 Ikalas. Tous droits réservés.",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s | Ikalas Documentation",
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Ikalas Documentation" />
      <meta
        property="og:description"
        content="Documentation officielle de l'API Ikalas - Plateforme d'intelligence artificielle et d'automatisation"
      />
      <meta property="og:locale" content="fr_FR" />
      <meta
        name="keywords"
        content="Ikalas, API, Intelligence Artificielle, IA, Automatisation, Documentation"
      />
    </>
  ),
  primaryHue: 210,
  primarySaturation: 100,
  toc: {
    float: true,
    title: "Sur cette page",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  editLink: {
    text: "Modifier cette page sur GitHub MDR →",
  },
  feedback: {
    content: "Question ? Donnez-nous votre avis →",
  },
  search: {
    placeholder: "Rechercher dans la documentation...",
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: "system",
  },
  banner: {
    key: "ikalas-docs-banner",
    text: "🚀 Bienvenue sur la documentation Ikalas !",
  },
};
