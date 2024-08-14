import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  const subtitle = (() => {
    switch ((fileData.slug as string).split("/")[0].toLowerCase()) {
      case "astra":
        return "be universal."
      case "færrin":
        return "reign supreme."
      case "syrin":
        return "chase progress."
      case "ushas":
        return "build wonders."
      case "urth":
        return "endure reality."
      case "althane":
        return "realize desire."
      case "index":
        return "know all."
    }
  })()

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        {title}
        <h5 className="content-meta mb-[-1rem]">{subtitle}</h5>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
