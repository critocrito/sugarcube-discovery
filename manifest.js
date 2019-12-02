/* eslint @typescript-eslint/camelcase: off */

module.exports = {
  manifest_version: 2,
  icons: {
    "48": "icons/sd-48.png",
  },

  permissions: ["tabs", "activeTab", "storage"],

  options_ui: {
    page: "options.html",
  },

  browser_action: {
    browser_style: true,
    default_icon: "icons/sd-48.png",
    default_title: "Sugarcube Discovery",
    default_popup: "popup.html",
  },

  applications: {
    gecko: {
      id: "christo@cryptodrunks.net",
    },
  },
};
