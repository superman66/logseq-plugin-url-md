import { LSPluginUserEvents } from "@logseq/libs/dist/LSPlugin.user";
import axios from "axios";
import { getLinkPreview } from "link-preview-js";
import React from "react";

let _visible = logseq.isMainUIVisible;

function subscribeLogseqEvent<T extends LSPluginUserEvents>(
  eventName: T,
  handler: (...args: any) => void
) {
  logseq.on(eventName, handler);
  return () => {
    logseq.off(eventName, handler);
  };
}

const subscribeToUIVisible = (onChange: () => void) =>
  subscribeLogseqEvent("ui:visible:changed", ({ visible }) => {
    _visible = visible;
    onChange();
  });

export const useAppVisible = () => {
  return React.useSyncExternalStore(subscribeToUIVisible, () => _visible);
};

export const getUrlMD = async (title: string, link: string) => {
  return `[${title}](${link})`;
};

export const getLinkMDTitle = async (url: string) => {
  try {
    const data = await getLinkPreview(url);
    // @ts-ignore
    return getUrlMD(data.title || url, url);
  } catch (error) {
    return url;
  }
};
