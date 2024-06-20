import bcd from '@mdn/browser-compat-data' assert { type: 'json' };

// https://github.com/web-platform-dx/web-features/blob/main/docs/baseline.md#core-browser-set
const browsers = [
  "chrome",
  "chrome_android",
  "edge",
  "firefox",
  "firefox_android",
  "safari",
  "safari_ios",
];

// Earliest release year for each of the Baseline browsers
const browsersFirstYear = {
  "chrome": 2008,
  "chrome_android": 2012,
  "edge": 2015,
  "firefox": 2004,
  "firefox_android": 2011,
  "safari": 2003,
  "safari_ios": 2007
}

export function getMinBaselineVersionByBrowserAndYear(browser, year) {

  let arrayOfVersions = new Array();

  Object.entries(
    Object.fromEntries(
      Object.entries(bcd.browsers[browser].releases).filter(
        ([version, data]) => {
          if (!['current', 'esr', 'retired'].includes(data.status)) {
            return false;
          }
          if (!data.release_date.startsWith(`${year}-`)) {
            return false;
          }
          return true;
        }
      )
    )
  ).forEach(data => {
    arrayOfVersions.push({ version: data[0], release_date: data[1].release_date });
  }, 0);

  if (arrayOfVersions.length != 0) {
    return arrayOfVersions.sort((a, b) => Date.parse(a.release_date) - Date.parse(b.release_date)).pop();
  } else if (year >= browsersFirstYear[browser]) {
    return getMinBaselineVersionByBrowserAndYear(browser, year - 1)
  } else {
    return null
  }
}

export function getMinBaselineVersionsByYear(year) {

  if (year < 2004) {
    throw ("There are no compatible Baseline browser versions before 2004!")
  }

  let versionsByYear = {}

  browsers.forEach(browser => {

    versionsByYear[browser] = {}

    let finalVersion = getMinBaselineVersionByBrowserAndYear(browser, year);

    versionsByYear[browser] =
      finalVersion != null
        ? finalVersion
        : getMinBaselineVersionByBrowserAndYear(browser, year - 1);
  });

  return versionsByYear;

}

export function getAllMinBaselineVersions(startingYear = 2016) {

  const currentYear = new Date().getFullYear();
  const finalVersionsPerYear = {};

  for (let year = startingYear; year <= currentYear; year++) {

    finalVersionsPerYear[year] = getMinBaselineVersionsByYear(year);

  }

  return finalVersionsPerYear;
};