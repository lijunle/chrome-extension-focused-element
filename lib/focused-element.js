(() => {
  const className = `focused-element-${Math.random().toString().substr(2)}`;
  const styleElement = document.createElement("style");
  styleElement.innerText = `.${className} { outline: 1px solid red; background: yellow }`;
  document.body.appendChild(styleElement);

  /** @type {Element | null} */
  let lastFocusedElement = null;

  const logId = setInterval(() => {
    const focusedElement = document.activeElement;
    if (focusedElement !== lastFocusedElement) {
      console.log(focusedElement);

      lastFocusedElement?.classList.remove(className);
      focusedElement?.classList.add(className);

      lastFocusedElement = focusedElement;
    }
  });

  console.log("Focused element is enabled");
  chrome.runtime.sendMessage({ action: "enabled" });

  chrome.runtime.onMessage.addListener(function disable(request) {
    if (request.action === "disable") {
      clearInterval(logId);

      console.log("Focused element is disabled");
      chrome.runtime.sendMessage({ action: "disabled" });
      chrome.runtime.onMessage.removeListener(disable);

      lastFocusedElement?.classList.remove(className);
      document.body.removeChild(styleElement);
    }
  });
})();
