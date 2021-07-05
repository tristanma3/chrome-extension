window.onload = function () {
  chrome.storage.local.get("data", function (items) {
    if (!chrome.runtime.error) {
      console.log(items);
      document.getElementById("text1").innerText = items.data;
    }
  });
};
var button = document.getElementById("clickme");
var count = 0;
var button1 = document.getElementById("clickbe");
var button2 = document.getElementById("set");
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;

  button.innerHTML = "Click me";
  button.onclick = function () {
    count += 1;
    button.innerHTML = count;
    button.classList.add("bigfont");
  };
  button1.classList.add("smallfont");
  button1.innerHTML = url;

  button2.onclick = function () {
    var d = document.getElementById("text").value;
    chrome.storage.local.set({ data: d });
    window.close();
  };
  document.getElementById("text").innerText = new Date(
    performance.timing.navigationStart
  ).toString();
});
