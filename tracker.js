Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() - h * 60 * 60 * 1000);
  return this;
};

const now = new Date();
const log = [
  { url: "chrome://newtab/", time: now.addHours(1) },
  { url: "https://www.chess.com/home", time: now },
];

function tracker(log, now) {
  const timeSpentPerWebsite = {};
  log.forEach((element, index) => {
    console.log(element);
    if (index == log.length - 1) {
      timeSpentPerWebsite[element.url] =
        (new Date().getTime() - log[index].time.getTime()) / 60000;
    } else {
      timeSpentPerWebsite[element.url] =
        (log[index + 1].time.getTime() - log[index].time.getTime()) / 60000;
    }
  });
  return timeSpentPerWebsite;
}
console.log(tracker(log));
console.assert(Object.keys(tracker([])).length === 0);
