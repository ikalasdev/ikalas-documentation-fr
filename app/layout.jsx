import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import { IkalasLogo } from "../components/icons";

export const metadata = {
  description:
    "Documentation officielle de l'API Ikalas - Plateforme d'intelligence artificielle et d'automatisation.",
  metadataBase: new URL("https://ikalas.com"),
  keywords: [
    "Ikalas",
    "API",
    "Intelligence Artificielle",
    "IA",
    "Automatisation",
    "Documentation",
    "Développement",
    "Intégration",
  ],
  generator: "Next.js",
  applicationName: "Ikalas Documentation",
  appleWebApp: {
    title: "Ikalas Documentation",
  },
  title: {
    default: "Ikalas Documentation – API et Intelligence Artificielle",
    template: "%s | Ikalas Documentation",
  },
  openGraph: {
    url: "./",
    siteName: "Ikalas Documentation",
    locale: "fr_FR",
    type: "website",
    title: "Ikalas Documentation",
    description: "Documentation officielle de l'API Ikalas",
  },
  other: {
    "msapplication-TileColor": "#3b82f6",
  },
  twitter: {
    site: "https://ikalas.com",
  },
  alternates: {
    canonical: "./",
  },
};

const banner = (
  <Banner dismissible={false}>
    🚀 Bienvenue sur la documentation Ikalas ! Découvrez notre API complète et
    nos fonctions d'IA .
  </Banner>
);

const navbar = (
  <Navbar
    logo={
      <IkalasLogo
        height="20"
        className="logo-animation hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none"
      />
    }
    projectLink="https://github.com/ikalasdev/ikalas-documentation-fr"
  />
);

const footer = (
  <Footer className="flex-col items-center md:items-start">
    <p className="mt-6 text-xs">
      © {new Date().getFullYear()} Ikalas. Tous droits réservés.
    </p>
  </Footer>
);

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/ikalasdev/ikalas-documentation-fr"
          editLink="Modifier cette page sur GitHub"
          feedback={{
            content: "Donnez votre avis →",
          }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
          toc={{
            title: "Sur cette page",
            extraContent: (
              <>
                <a href="https://ikalas.com" className="block mt-1 text-xs">
                  Lien du site
                </a>
                <a
                  href="https://docs.ikalas.com"
                  className="block mt-1 text-xs"
                >
                  Documentation en anglais
                </a>
              </>
            ),
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
