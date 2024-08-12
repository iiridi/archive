import { classNames } from "../util/lang"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/qdrant.inline"
import style from "./styles/ai.scss"

interface AiOptions {
}

const defaultOptions: AiOptions = {
}

export default ((opts?: AiOptions) => {
    const Ai: QuartzComponent = ({ displayClass, fileData: {slug} }: QuartzComponentProps) => {
    const o = { ...defaultOptions, ...opts };
    
    if (slug !== "index") {
      return <></>;
    }

    return (
      <div class={classNames(displayClass, "ai")}>
        <h1>AKLSJHFLASKJDLASKJD</h1>
      </div>
    )
  }

  Ai.css = style
  Ai.afterDOMLoaded = script

  return Ai
}) satisfies QuartzComponentConstructor
