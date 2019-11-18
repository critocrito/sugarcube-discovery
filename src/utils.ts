export const currentUrl = async () => {
  const tabs = await browser.tabs.query({currentWindow: true, active: true});
  if (tabs.length === 0) {
    throw new Error("Couldn't query current tab.");
  }
  if (tabs[0].url == null) {
    throw new Error("Couldn't query current URL.");
  }
  // const url = new URL(tabs[0].url);
  // return url;
  return tabs[0].url;
};
