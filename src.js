var button = document.getElementById("clickme");
var count = 0;
var button1 = document.getElementById("clickbe");
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;

  button.innerHTML = "Click me";
  button.onclick = function () {
    count += 1;
    button.innerHTML = count;
    button.classList.add("bigfont");
  };

  button1.innerHTML = "Click me";
  button1.onclick = function () {
    count += 1;
    button1.innerHTML = url;
    button1.classList.add("smallfont");
  };
});
