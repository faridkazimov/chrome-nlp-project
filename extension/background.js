chrome.contextMenus.create({
  id: "analyze-text",
  title: "Analyze with NLP",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "analyze-text" && info.selectionText) {
    chrome.storage.local.set({ selectedText: info.selectionText });
    chrome.action.openPopup();
  }
});
