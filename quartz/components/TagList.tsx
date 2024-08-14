import { classNames } from "../util/lang"
import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  const baseDir = pathToRoot(fileData.slug!)
  if (tags && tags.length > 0) {
    return (
      <ul class={classNames(displayClass, "tags")}>
        {tags.map((tag) => {
          const tagName = tag.replaceAll(/-/g, " ")

          const linkDest = baseDir + `/tags/${slugTag(tag)}`
          return (
            <li>
              <a href={linkDest} class="internal tag-link capitalize">
                <span
                  className="font-bold"
                  style={{ fontVariant: "small-caps", fontFamily: "Roboto Condensed" }}
                >
                  {tagName}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return null
  }
}

TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
  justify-self: end;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 0px;
  color: var(--lightgray);
  background-color: var(--secondary);
  padding: 0.2rem 0.4rem;
  margin: 0 0rem;
  font-variant: small-caps;
  font-family: var(--codeFont);
  text-transform: capitalize;
  border-width: 2px;
  border-color: #d8c483;
  border-style: double;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
