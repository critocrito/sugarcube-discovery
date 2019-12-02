import React from "react";
import {HelpCircle, Settings} from "react-feather";

import logo from "../logo.svg";

const Header = () => {
  const openSettings = async () => {
    const url = browser.runtime.getURL("/skin/options.html");

    // first get the active tab
    const tabs = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const activeTab = tabs[0];
    const tabProps = {
      url,
      windowId: activeTab.windowId,
      active: true,
      index: activeTab.index + 1,
      openerTabId: activeTab.id,
    };

    // create the new tab
    try {
      await browser.tabs.create(tabProps);
    } catch (e) {
      // TODO workaround for pre-57 Firefox
      delete tabProps.openerTabId;
      await browser.tabs.create(tabProps);
    }
  };

  return (
    <header className="inverted w-100 flex items-center pa2">
      <img alt="Suagrcube Discovery Logo" src={logo} />
      <div className="flex flex-column">
        <h1 className="ml3 mb0 pt2 ttu f3 lh-title">Sugarcube Discovery</h1>
        <div className="cf">
          <div className="fr">
            <div className="flex items-center">
              <button
                type="button"
                className="pointer lh-solid color-inverted outline-0 bg-transparent b--transparent"
                onClick={() => null}
              >
                <HelpCircle className="v-mid" size="12" />
              </button>
              <span className="ml1 mr1">|</span>
              <button
                type="button"
                className="pointer pr0 lh-solid color-inverted outline-0 bg-transparent b--transparent"
                onClick={openSettings}
              >
                <Settings className="v-mid" size="12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
