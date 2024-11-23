const toHumanReadableDuration = time => {
  const sec_num = parseInt(time, 10); // don't forget the second param
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + " heure(s) et " + minutes + " minute(s)";
};

(() => {
  const fetchAndPrint = async () => {
    const currentDate = new Date();
    const key = [
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear()
    ].join("-");

    const time = await browser.storage.local.get("time");

    document.getElementById("timer").innerText = toHumanReadableDuration(
      time.time[key]
    );
  };
  fetchAndPrint();
  browser.storage.onChanged.addListener(fetchAndPrint);
})();
