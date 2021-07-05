chrome.tabs.onCreated.addListener(function (tab) {
  const now = new Date();
  tab.url;
  chrome.storage.local.set({ data: d });

  // document.getElementById("text").innerText = new Date(
  //     performance.timing.navigationStart
  //   ).toString();
});
