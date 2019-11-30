// These utility functions are copied from the Sugarcube source code:
// https://github.com/critocrito/sugarcube/blob/master/packages/plugin-youtube/lib/utils.js.
// They have to be kept in sync.

export const isYoutubeVideo = (url: string): boolean => {
  const u = new URL(url);
  // e.g. https://www.youtube.com/watch?v=tcCBtSjKEzI
  if (/youtube\.com/.test(u.hostname) && u.searchParams.get("v") != null)
    return true;
  // e.g. http://youtu.be/o0tjic523cg
  if (
    /youtu\.be/.test(u.hostname) &&
    u.pathname.split("/").filter((x) => x !== "").length === 1
  )
    return true;
  // e.g. https://www.youtube.com/embed/iq_XLq5ONtE?version
  if (
    /youtube\.com/.test(u.hostname) &&
    u.pathname.split("/").filter((x) => x !== "").length === 2 &&
    u.pathname.split("/").filter((x) => x !== "")[0] === "embed"
  )
    return true;
  return false;
};

export const isYoutubeChannel = (url: string): boolean => {
  const u = new URL(url);
  if (/youtube\.com/.test(u.hostname) && /channel/.test(u.pathname))
    return true;
  return false;
};
