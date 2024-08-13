const currentCustomTheme = localStorage.getItem("theme") ?? "althane"
document.documentElement.setAttribute("saved-theme", currentCustomTheme)

const emitCustomThemeChangeEvent = (theme: string) => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener<"nav">("nav", ({ detail: { url: slug } }: CustomEventMap["nav"]) => {
  const themeKey = (() => {
    switch ((slug as string).split("/")[0].toLowerCase()) {
      case "astra":
        return "astra"
      case "faerrin":
        return "faerrin"
      case "syrin":
        return "syrin"
      case "ushas":
        return "ushas"
      default:
        return "althane"
    }
  })()

  const currentTheme = localStorage.getItem("theme")
  if (themeKey != currentTheme) {
    document.documentElement.setAttribute("saved-theme", themeKey)
    localStorage.setItem("theme", themeKey)
    emitCustomThemeChangeEvent(themeKey)
  }
})
