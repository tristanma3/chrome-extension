Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() - h * 60 * 60 * 1000);
  return this;
};

const now = new Date();
const log = [
  { url: "chrome://newtab1/", time: now.addHours(3) },
  { url: "chrome://newtab2/", time: now.addHours(2) },
  { url: "chrome://newtab3/", time: now.addHours(1) },
  { url: "https://www.chess.com/home", time: now },
  { url: "chrome://newtab/", time: now.addHours(1) },
];

function tracker(log, now) {
  const timeSpentPerWebsite = {};
  log.forEach((element, index) => {
    console.log(element);
    if (index == log.length - 1) {
      timeSpentPerWebsite[element.url] = (Date.now() - log[index].time) / 60000;
    } else {
      timeSpentPerWebsite[element.url] =
        (log[index + 1].time - log[index].time) / 60000;
    }
  });
  return timeSpentPerWebsite;
}
console.log(tracker(log));
console.assert(Object.keys(tracker([])).length === 0);
