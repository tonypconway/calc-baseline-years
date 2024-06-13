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
const currentYear = new Date().getFullYear();
const finalReleasePerYear = {};

for (let year = 2016; year <= currentYear; year++) {

  finalReleasePerYear[year] = {};

  browsers.forEach(browser => {

    let arrayOfVersions = new Array();

    Object.entries(
      Object.fromEntries(
        Object.entries(bcd.browsers[browser].releases).filter(
          ([version, data]) => {
            console.log(browser,version);
            if (!['current', 'esr', 'retired',`beta`].includes(data.status)) {
              return false;
            }
            if (data.release_date) { 
              if (!data.release_date.startsWith(`${year}-`)) {
                return false;
              }
            }
            return true;
          }
        )
      )).forEach(data => {
        arrayOfVersions.push({ version: data[0], release_date: data[1].release_date });
      }, 0);

    let finalVersion = arrayOfVersions.sort((a, b) => Date.parse(a.release_date) - Date.parse(b.release_date)).pop();

    finalReleasePerYear[year][browser] =
      finalVersion != null
        ? finalVersion
        : finalReleasePerYear[year - 1][browser];
  });
}

console.log(JSON.stringify(finalReleasePerYear, null, '  '));
