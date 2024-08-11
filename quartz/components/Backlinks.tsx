import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { resolveRelative, simplifySlug } from "../util/path"
import style from "./styles/backlinks.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Backlinks: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const slug = simplifySlug(fileData.slug!)
  const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug))

  return (
    backlinkFiles.length > 0
      ? (
        <div class={classNames(displayClass, "backlinks")}>
          <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
          <ul class="overflow">
            {backlinkFiles.map((f) => (
              <li key={f.slug!}>
                <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                  {f.frontmatter?.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
      : (<></>)
  )
}

Backlinks.css = style
export default (() => Backlinks) satisfies QuartzComponentConstructor
