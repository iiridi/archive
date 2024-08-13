export interface ColorScheme {
  light: string
  lightgray: string
  gray: string
  darkgray: string
  dark: string
  secondary: string
  tertiary: string
  highlight: string
  textHighlight: string
}

interface Colors {
  althane: ColorScheme
  astra: ColorScheme
  faerrin: ColorScheme
  syrin: ColorScheme
  ushas: ColorScheme
}

export interface Theme {
  typography: {
    header: string
    body: string
    code: string
  }
  cdnCaching: boolean
  colors: Colors
  fontOrigin: "googleFonts" | "local"
}

export type ThemeKey = keyof Colors

const DEFAULT_SANS_SERIF =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
const DEFAULT_MONO = "ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace"

export function googleFontHref(theme: Theme) {
  const { code, header, body } = theme.typography
  return `https://fonts.googleapis.com/css2?family=${code}&family=${header}:wght@400;700&family=${body}:ital,wght@0,400;0,600;1,400;1,600&display=swap`
}

export function joinStyles(theme: Theme, ...stylesheet: string[]) {
  const themes: String[] = [
    `
:root {
  --light: ${theme.colors.althane.light};
  --lightgray: ${theme.colors.althane.lightgray};
  --gray: ${theme.colors.althane.gray};
  --darkgray: ${theme.colors.althane.darkgray};
  --dark: ${theme.colors.althane.dark};
  --secondary: ${theme.colors.althane.secondary};
  --tertiary: ${theme.colors.althane.tertiary};
  --highlight: ${theme.colors.althane.highlight};
  --textHighlight: ${theme.colors.althane.textHighlight};

  --headerFont: "${theme.typography.header}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${theme.typography.body}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${theme.typography.code}", ${DEFAULT_MONO};
}
`,
  ]
  for (const [key, uncast] of Object.entries(theme.colors)) {
    if (key === "althane") {
      continue
    }

    const val = uncast as ColorScheme

    themes.push(`
:root[saved-theme=${key}] {
  --light: ${val.light};
  --lightgray: ${val.lightgray};
  --gray: ${val.gray};
  --darkgray: ${val.darkgray};
  --dark: ${val.dark};
  --secondary: ${val.secondary};
  --tertiary: ${val.tertiary};
  --highlight: ${val.highlight};
  --textHighlight: ${val.textHighlight};
}
`)
  }

  return `
${stylesheet.join("\n\n")}

${themes.join("\n\n")}
`
}
