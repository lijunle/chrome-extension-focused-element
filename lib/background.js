chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) {
    return;
  }

  const title = await chrome.action.getTitle({ tabId: tab.id });

  if (title === "Enable") {
    console.log("Enable content script");
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["lib/focused-element.js"],
    });
  } else {
    console.log("Disable content script");
    chrome.tabs.sendMessage(tab.id, {
      action: "disable",
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (sender.tab) {
    const tabId = sender.tab.id;
    if (request.action === "enabled") {
      console.log("Set active title and icon");
      chrome.action.setTitle({
        tabId,
        title: "Disable",
      });
      chrome.action.setIcon({
        tabId,
        path: {
          16: "icons/active-16.png",
          32: "icons/active-32.png",
          48: "icons/active-48.png",
          128: "icons/active-128.png",
        },
      });
    } else if (request.action === "disabled") {
      console.log("Set inactive title and icon");
      chrome.action.setTitle({
        tabId,
        title: "Enable",
      });
      chrome.action.setIcon({
        tabId,
        path: {
          16: "icons/inactive-16.png",
          32: "icons/inactive-32.png",
          48: "icons/inactive-48.png",
          128: "icons/inactive-128.png",
        },
      });
    }
  }
});
