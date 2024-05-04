const name = "bookmark=";

// set a cookie default is bookmark will exp after 14 days
export function setCookie(cValue, expDays) {
  const currentList = getCookie();

  if (checkExist(cValue)) {
    return false;
  }

  const value = currentList ? currentList + "," + cValue : cValue;

  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = ";expires=" + date.toUTCString();

  document.cookie = name + value + expires;
  return true;
}

export function getCookie() {
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split(";");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });

  return res;
}

export function checkExist(id) {
  const currentList = getCookie();

  // check if post already in list
  if (currentList) return currentList.split(",").includes(id.toString());
  else return false;
}

// noted: remove all `bookmark=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`

export function deleteCookie(id) {
  const values = getCookie().split(",");

  const indexToRemove = values.indexOf(id.toString());
  if (indexToRemove !== -1) {
    values.splice(indexToRemove, 1);
  }

  const updatedCookieString = values.join(",");
  // remove all then rightaway set old value
  document.cookie = `bookmark=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

  return setCookie(updatedCookieString, 14);
}

// resize map
export function resizeMap(mapRef, id) {
  const resizeObserver = new ResizeObserver(() =>
    mapRef.current?.invalidateSize(),
  );
  const container = document.getElementById(id);
  if (container) {
    resizeObserver.observe(container);
  }
}
