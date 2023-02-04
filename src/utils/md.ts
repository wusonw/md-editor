import MarkdownIt from "markdown-it";
import Sub from "markdown-it-sub";
import Sup from "markdown-it-sup";
import Katex from "markdown-it-katex";

const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
});

md.use(Sub)
  .use(Sup)
  .use(Katex, { throwOnError: false, errorColor: " #cc0000" });

const renderMarkdown = (mdText: string) => md.render(mdText) || mdText;

export { renderMarkdown };
