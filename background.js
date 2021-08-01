console.log("hellO");
chrome.storage.local.clear();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!changeInfo.url) {
    return;
  }
  chrome.storage.local.get("dates", function (result) {
    const now = { url: tab.url, time: new Date() };
    if (!result.dates) {
      result.dates = [];
    }
    result.dates.push(now);
    result.dates.forEach(console.log);
    chrome.storage.local.set(result);
  });
  //console.log(tab);

  //d3 library
  //var gettingAll = browser.windows.getAll(
  //getInfo                // optional object
  //)
});
