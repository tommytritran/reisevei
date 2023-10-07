const mapAnchorTag = document.querySelector("#mapArea > div > a");
const baseUrl = "https://www.google.com/maps/dir/?api=1&";

const createGoogleMapsLink = () => {};

const getSettings = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("settings", (result) => {
      debugger;
      const { from, travelMode } = result.settings || {};
      if (!from) {
        from = "Oslo";
      }
      if (!travelMode) {
        travelMode = "transit";
      }
      resolve({ from, travelMode });
    });
  });
};

const urlBuilder = (adress, from, travelmode) => {
  const params = {
    origin: adress,
    destination: from,
    travelmode: travelmode,
  };
  return baseUrl + new URLSearchParams(params);
};

const injectNewAnchorTag = async (adress, anchorTag) => {
  debugger;
  const { from, travelMode } = await getSettings();
  const url = urlBuilder(adress, from, travelMode);
  anchorTag.setAttribute("href", url);
  anchorTag.setAttribute("target", "_blank");
};

if (mapAnchorTag) {
  const adress = document.querySelector("#mapArea > div > a > span").innerText;
  injectNewAnchorTag(adress, mapAnchorTag);
}
