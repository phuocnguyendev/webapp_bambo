export const serialize = (obj: any) => {
  const str = [];
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p) && obj[p] !== undefined) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
