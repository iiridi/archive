import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { ColorScheme } from "./quartz/util/theme"

type RGB = [number, number, number]

const createTheme = ([sr, sg, sb]: RGB, [tr, tg, tb]: RGB): ColorScheme => ({
  light: "#faf8f8",
  lightgray: "#e5e5e5",
  gray: "#b8b8b8",
  darkgray: "#4e4e4e",
  dark: "#2b2b2b",
  secondary: `rgb(${sr}, ${sg}, ${sb})`,
  tertiary: `rgb(${tr}, ${tg}, ${tb})`,
  highlight: `rgba(${sr}, ${sg}, ${sb}, 0.15)`,
  textHighlight: `rgba(${tr}, ${tg}, ${tb}, 0.15)`,
})

// 12 87 204

const config: QuartzConfig = {
  configuration: {
    pageTitle: "the Archive",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "lib.iridi.cc",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Tauri",
        body: "Gelasio",
        code: "Roboto Condensed",
      },
      colors: {
        althane: createTheme([88, 24, 13], [166, 46, 25]),
        astra: createTheme([88, 136, 168], [132, 165, 157]),
        faerrin: createTheme([14, 112, 75], [163, 196, 188]),
        syrin: createTheme([12, 87, 204], [163, 196, 188]),
        ushas: createTheme([206, 106, 0], [110, 64, 18]),
        urth: createTheme([107, 4, 126], [121, 50, 135]),
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
