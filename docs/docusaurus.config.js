const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Luma",
  tagline:
    "React Luma is a React renderer for building user interfaces with WebGL",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  url: "https://matvp91.github.io",
  baseUrl: "/react-luma",
  organizationName: "matvp91",
  projectName: "react-luma",
  trailingSlash: false,

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/matvp91/react-luma/tree/main/docs/docs/",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "React Luma",
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Documentation",
          },
          {
            href: "https://github.com/matvp91/react-luma",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/react-luma",
              },
              {
                label: "Support",
                href: "https://github.com/matvp91/react-luma/issues",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Matthias Van Parijs`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
