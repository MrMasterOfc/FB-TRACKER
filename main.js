(async () => {
  // await browser.storage.local.clear();
  const saveOptions = async () => {
    const currentDate = new Date();
    const key = [
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear()
    ].join("-");

    const storage = await browser.storage.local.get("time");

    if (!storage.time) {
      storage.time = {};
    }

    if (!storage.time[key]) {
      storage.time[key] = 0;
      await browser.storage.local.set({
        time: storage.time
      });
    }

    if (document.visibilityState === "visible") {
      ++storage.time[key];
      await browser.storage.local.set({
        time: storage.time
      });
    }
  };

  setInterval(saveOptions, 1000);
})();
