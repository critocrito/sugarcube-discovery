// These utility functions are copied from the Sugarcube source code:
// https://github.com/critocrito/sugarcube/blob/master/packages/plugin-twitter/lib/utils.js
// They have to be kept in sync.

export const isTwitterTweet = (url: string): boolean => {
  const u = new URL(url);
  if (/twitter\.com/.test(u.hostname) && /status/.test(u.pathname)) return true;
  return false;
};

export const isTwitterFeed = (url: string): boolean => {
  const u = new URL(url);
  if (
    /twitter\.com/.test(u.hostname) &&
    u.pathname.split("/").filter((x) => x !== "").length === 1 &&
    u.pathname.split("/").filter((x) => x !== "")[0] !== "search"
  )
    return true;
  return false;
};
