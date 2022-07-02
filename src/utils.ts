import { LSPluginUserEvents } from "@logseq/libs/dist/LSPlugin.user";
import axios from "axios";
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

export const getUrlMD = async (text: string) => {
  try {
    const response = await axios.get(
      `https://get-urls-md.vercel.app/api/title?site=${text}`
    );
    if (response.status === 200) {
      return response.data.link[0];
    }
    return text;
  } catch (error) {
    // 当出错或者 text 不是 url 时，则返回
    return text;
  }
};
