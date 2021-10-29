// console.log("hellO");
// chrome.storage.local.clear();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!changeInfo.url) {
    return;
  }
  chrome.storage.local.get("dates", function (result) {
    const now = {
      url: new URL(tab.url).hostname.replace("www.", ""),
      time: Date.now(),
    };
    if (!result.dates) {
      result.dates = [];
    }
    result.dates.push(now);
    console.log(result);
    chrome.storage.local.set(result);
  });
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    chrome.storage.local.get("dates", function (result) {
      const now = {
        url: new URL(tab.url).hostname.replace("www.", ""),
        time: Date.now(),
      };
      if (!result.dates) {
        result.dates = [];
      }
      result.dates.push(now);
      console.log(result);
      chrome.storage.local.set(result);
    });
  });
});

chrome.windows.onRemoved.addListener(function (windowid) {
  chrome.storage.local.get("dates", function (result) {
    const now = {
      url: "inactive",
      time: Date.now(),
    };
    if (!result.dates) {
      result.dates = [];
    }
    result.dates.push(now);
    console.log(result);
    chrome.storage.local.set(result);
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.local.get("dates", function (result) {
    console.log("sending response", result);
    sendResponse(result);
  });

  return true; // async response
});
//to do:test and fix bugs
//make sure to record new time when switching tabs
//log closing tabs//
