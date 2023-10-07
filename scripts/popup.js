(async function addListener() {
  const settings = await getSettings();
  document.getElementById("from").value = settings.from;
  document.getElementById("travelMode").value = settings.travelMode;

  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      from: e.target.elements["from"].value,
      travelMode: e.target.elements["travelMode"].value,
    };
    storeSettings(data);
  });
})();

function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["settings"], (result) => {
      resolve(result.settings);
    });
  });
}

function storeSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ settings: settings }, () => {
      alert(
        "Instillinger oppdatert! Endringene vil tre i kraft når du laster inn siden på nytt"
      );
      resolve();
    });
  });
}
