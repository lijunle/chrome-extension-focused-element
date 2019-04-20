chrome.runtime.onInstalled.addListener(() => {
  "use strict";

  chrome.browserAction.onClicked.addListener(tab => {
    chrome.browserAction.getTitle({ tabId: tab.id }, title => {
      if (!tab.id) {
        return;
      }

      if (title === "Enable") {
        console.log("Enable content script");
        chrome.tabs.executeScript({
          file: "lib/focused-element.js"
        });
      } else {
        console.log("Disable content script");
        chrome.tabs.sendMessage(tab.id, {
          action: "disable"
        });
      }
    });
  });

  chrome.runtime.onMessage.addListener((request, sender) => {
    if (sender.tab) {
      const tabId = sender.tab.id;
      if (request.action === "enabled") {
        console.log("Set active title and icon");
        chrome.browserAction.setTitle({
          tabId,
          title: "Disable"
        });
        chrome.browserAction.setIcon({
          tabId,
          path: {
            16: "icons/active-16.png",
            32: "icons/active-32.png",
            48: "icons/active-48.png",
            128: "icons/active-128.png"
          }
        });
      } else if (request.action === "disabled") {
        console.log("Set inactive title and icon");
        chrome.browserAction.setTitle({
          tabId,
          title: "Enable"
        });
        chrome.browserAction.setIcon({
          tabId,
          path: {
            16: "icons/inactive-16.png",
            32: "icons/inactive-32.png",
            48: "icons/inactive-48.png",
            128: "icons/inactive-128.png"
          }
        });
      }
    }
  });
});
