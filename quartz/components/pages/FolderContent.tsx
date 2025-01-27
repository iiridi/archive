import path from "path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { simplifySlug, stripSlashes } from "../../util/path"
import { PageList, SortFn } from "../PageList"
import style from "../styles/listPage.scss"

interface FolderContentOptions {
  /**
   * Whether to display number of folders
   */
  showFolderCount: boolean
  sort?: SortFn
}

const defaultOptions: FolderContentOptions = {
  showFolderCount: true,
}

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  const FolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props
    const folderSlug = stripSlashes(simplifySlug(fileData.slug!))
    const allPagesInFolder = allFiles.filter((file) => {
      const fileSlug = stripSlashes(simplifySlug(file.slug!))
      const prefixed = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug
      const folderParts = folderSlug.split(path.posix.sep)
      const fileParts = fileSlug.split(path.posix.sep)
      const isDirectChild = fileParts.length === folderParts.length + 1
      return prefixed && isDirectChild
    })
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = ["popover-hint", ...cssClasses].join(" ")
    const listProps = {
      ...props,
      sort: options.sort,
      allFiles: allPagesInFolder,
    }

    const content =
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    
    return (
      <div class={classes}>
        <article>{content}</article>
        {
          folderSlug === ""
            ? (<></>)
            : (
              <div class="page-listing">
                <div>
                  <PageList {...listProps} />
                </div>
              </div>
            )
        }
      </div>
    )
  }

  FolderContent.css = style + PageList.css
  return FolderContent
}) satisfies QuartzComponentConstructor
