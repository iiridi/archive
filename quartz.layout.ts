import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    // Component.Ai(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    // Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Theme(),
    // Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({ title: "Stacks", folderClickBehavior: "link" })),
    Component.DesktopOnly(
      Component.RecentNotes({ title: "Recent data", limit: 5, showTags: false }),
    ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.MobileOnly(
      Component.RecentNotes({ title: "Recent data", limit: 5, showTags: false }),
    ),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Theme(),
    // Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({ title: "Stacks", folderClickBehavior: "link" })),
  ],
  right: [],
}
