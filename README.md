# `calc-baseline-years`

## What is this module?

This module provides a few simple functions for obtaining minimum browser version numbers and release dates for each version of the Web Platform Baseline.

## Functions

There are three functions available in this module.

1. `getAllMinBaselineVersions(?year)`
2. `getMinBaselineVersionsByYear(year)`
3. `getMinBaseilneVersionByBrowserAndYear(browser, year)`

### `getAllMinBaselineVersions()`

Returns a Javascript `Object` with the following format representing Baseline minimum browser versions for the year in question:

``` json
{
  "2016": {
    "chrome": {
      "version": "47",
      "release_date": "2015-12-01"
    },
    "chrome_android": {
      "version": "47",
      "release_date": "2015-12-02"
    },
    "edge": {
      "version": "13",
      "release_date": "2015-11-12"
    },
    "firefox": {
      "version": "43",
      "release_date": "2015-12-15"
    },
    "firefox_android": {
      "version": "43",
      "release_date": "2015-12-15"
    },
    "safari": {
      "version": "9",
      "release_date": "2015-09-30"
    },
    "safari_ios": {
      "version": "9",
      "release_date": "2015-09-16"
    }
  },
  ...
}
```

This function takes a single argument, `year`, which is an int or string in the format `YYYY`.  If you pass a number lower than 2004, the script will throw an error, as none of the Baseline browser set existed before 2003.

### `getMinBaselineVersionsByYear(year)`

This function takes ones argument, `year`.

* `browser` should be a string from the following list:
  * `chrome`
  * `chrome_android`
  * `edge`
  * `firefox`
  * `firefox_android`
  * `safari`
  * `safari_ios`
* `year` should be a four digit representation of a year between 2016 and the current year.

The function will return the object corresponding to the selected year in the same format as `getAllBaselineVersions()`.

### `getMinBaseilneVersionByBrowserAndYear(browser, year)`

This function takes two arguments: `browser` and `year`.

This function returns an object containing the `version` and `release_date` objects for the requested browser and year.
