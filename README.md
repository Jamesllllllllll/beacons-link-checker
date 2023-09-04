# Beacons Page Link Checker

## Purpose

Check for broken links on your Beacons profile page

## To-Dos

- Error handling of serverless functions
- Authorization/Login
- Connect to DB to store user info
- Setup automated link checks
- Email users if there are link errors

---

## Local development setup

In order to test the front-end, you must define a local copy of Chromium to be executed when performing the page scrape

- Download a copy of [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/#dev)
- Create or edit the `.env.local` file in the root of this repository and add the following:
```
BROWSER_PATH='path/to/browser'
```

In development, the browser will execute in 'headless' mode. If you would like to see what the browser sees, change the following in `/api/checkBeacon/route.js':

```js
browser = await puppeteer.launch({
  ...
  headless: false,
  // false to see browser, chromium.headless for headless
  ...
})
```
