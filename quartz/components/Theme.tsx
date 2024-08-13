// @ts-ignore: this is safe, we don't want to actually make darkmode.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import themeScript from "./scripts/theming.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Theme: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return <></>
}

Theme.beforeDOMLoaded = themeScript

export default (() => Theme) satisfies QuartzComponentConstructor
