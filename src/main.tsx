import "@logseq/libs";
import { logseq as PL } from "../package.json";
import { getLinkMDTitle } from "./utils";

const pluginId = PL.id;

async function readClipboard() {
  if (!navigator.clipboard) {
    // Clipboard API not available
    return;
  }

  try {
    const text = await navigator.clipboard.readText();
    console.log("当前粘贴内容：", text);
    const convert = await getLinkMDTitle(text);
    console.log("转换后格式", convert);
  } catch (err) {
    console.error("Failed to copy!", err);
  }
}

async function main() {
  console.info(`#${pluginId}: MAIN`);
  // const mainContentContainer = parent.document.getElementById(
  //   "main-content-container"
  // );
  // console.log(mainContentContainer);

  // const handlePaste = async (event: ClipboardEvent) => {
  //   if (event.clipboardData && event?.clipboardData?.files?.length > 0) {
  //     return;
  //   }

  //   if (event.clipboardData) {
  //     const text = event.clipboardData.getData("text/plain");
  //     if (text !== "") {
  //       event.preventDefault();
  //       event.stopPropagation();
  //       console.log("当前粘贴内容：", text);
  //       const convert = await getLinkMDTitle(text);
  //       console.log("转换后格式", convert);
  //       await logseq.Editor.insertAtEditingCursor(convert);
  //       return;
  //     }
  //   }

  logseq.Editor.registerSlashCommand("md-link", async () => {
    //insertAtEditingCursor 这个函数是向logseq当前光标处插入传参的内容
    await readClipboard();
    // await logseq.Editor.insertAtEditingCursor();
  });
}

logseq.ready(main).catch(console.error);
