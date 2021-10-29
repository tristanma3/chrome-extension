import "./chart.js";

chrome.runtime.sendMessage({}, function (response) {
  console.log("received response", response); // should have the 'dates' field
  //const timeSpentPerWebsite = {
  // "chrome://newtab1/": 1,
  // "chrome://newtab2/": 2,
  // "chrome://newtab3/": 3,
  //};
  const timeSpentPerWebsite = tracker(response.dates);
  showGraph(timeSpentPerWebsite);
});

function tracker(log) {
  const timeSpentPerWebsite = {};
  log.forEach((element, index) => {
    console.log(element);
    if (index == log.length - 1) {
      if (element.url in timeSpentPerWebsite) {
        timeSpentPerWebsite[element.url] +=
          (Date.now() - log[index].time) / 60000;
      } else {
        timeSpentPerWebsite[element.url] =
          (Date.now() - log[index].time) / 60000;
      }
    } else {
      if (element.url in timeSpentPerWebsite) {
        timeSpentPerWebsite[element.url] +=
          (log[index + 1].time - log[index].time) / 60000;
        // console.log(
        //   ((log[index + 1].time - log[index].time) / 60000).round(1)
        // );

        // console.log(element.url);
        // console.log(timeSpentPerWebsite);
      } else {
        timeSpentPerWebsite[element.url] =
          (log[index + 1].time - log[index].time) / 60000;
      }
    }
  });
  return timeSpentPerWebsite;
} //track only domain names and not individual URLS

function hashCode(s) {
  var hash = 0;
  for (var i = 0; i < s.length; i++) {
    var character = s.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function showGraph(timeSpentPerWebsite) {
  delete timeSpentPerWebsite["inactive"];
  const ctx = document.getElementById("piechart").getContext("2d");
  const colorLen = Object.keys(timeSpentPerWebsite).length;
  let colors = [];

  Object.keys(timeSpentPerWebsite).forEach((val) => {
    let a, b, c;
    a = hashCode(val) % 255;
    b = (hashCode(val) / 2 - 100) % 255;
    c = (hashCode(val) / 3 - 150) % 255;

    colors.push("rgba(" + a + ", " + b + ", " + c + ", 0.6)");
  });

  const myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(timeSpentPerWebsite),
      datasets: [
        {
          label: "minutes",
          data: Object.keys(timeSpentPerWebsite).map(
            (k) => timeSpentPerWebsite[k]
          ),

          backgroundColor: colors,
          //todo: randomly generate a color for each element
          borderColor: ["black"],
          borderWidth: 1,
        },
      ],
    },
  });
}
