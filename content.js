(function() {
  let lastFocusedElement = undefined;
  const logId = setInterval(() => {
    const focusedElement = document.activeElement;
    if (focusedElement !== lastFocusedElement) {
      console.log("Focused element", focusedElement);
    }

    lastFocusedElement = focusedElement;
  });

  console.log("Focused element is enabled");
  chrome.runtime.sendMessage({ action: "enabled" });

  chrome.runtime.onMessage.addListener(function disable(request) {
    if (request.action == "disable") {
      clearInterval(logId);
      console.log("Focused element is disabled");
      chrome.runtime.sendMessage({ action: "disabled" });
      chrome.runtime.onMessage.removeListener(disable);
    }
  });
})();
