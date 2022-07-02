import "@logseq/libs";
import { logseq as PL } from "../package.json";
import { getLinkMDTitle } from "./utils";

const pluginId = PL.id;

function main() {
  console.info(`#${pluginId}: MAIN`);
  const mainContentContainer = parent.document.getElementById(
    "main-content-container"
  );
  console.log(mainContentContainer);

  const handlePaste = async (event: ClipboardEvent) => {
    if (event.clipboardData) {
      event.preventDefault();
      event.stopPropagation();
      const text = event.clipboardData.getData("text/plain");
      console.log("当前粘贴内容：", text);
      const convert = await getLinkMDTitle(text);
      console.log("转换后格式", convert);
      await logseq.Editor.insertAtEditingCursor(convert);
      return;
    }
  };

  mainContentContainer &&
    mainContentContainer.addEventListener("paste", handlePaste);
}

logseq.ready(main).catch(console.error);
