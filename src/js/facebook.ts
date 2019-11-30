// FIXME: This is overly broad and returns true on feeds and group pages as
//        well.
export const isFacebookPost = (url: string): boolean => {
  const u = new URL(url);
  return /facebook\.com/.test(u.hostname);
};
