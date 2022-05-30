import * as wdio from 'webdriverio';
import * as selenide from 'selenidejs';
// import { be, have, perform, by } from 'selenidejs';
import { WebDriver, Session, By } from 'selenium-webdriver';
import { HttpClient, Executor } from 'selenium-webdriver/http';
import { config } from '../wdio.appium.android.conf';

let wdioBrowser: wdio.Browser<'async'>;
let browser: selenide.Browser;

// TODO: move to separate module
function mobileSelectorToBy(selector: string): By {
  let by: By;

  // BY XPATH
  if (['/', '(', '..', './', '*/'].some(it => selector.startsWith(it))) {
    by = new By('xpath', selector);
  }

  // BY EXACT TEXT
  const matchedByExactText = selector.match(
    /(?:^«(.*?)»$)|(?:^text='(.*?)')|(?:^text="(.*?)")/s,
  );
  if (matchedByExactText) {
    const value = (
      matchedByExactText[1] || matchedByExactText[2] || matchedByExactText[3]
    );
    by = new By('-android uiautomator', `new UiSelector().text("${value}")`);
  }

  // BY CONTAINED TEXT
  const matchedByTextContains = selector.match(
    /^text=(.*?)$/s,
  );
  if (matchedByTextContains) {
    const value = matchedByTextContains[1];
    by = new By(
      '-android uiautomator',
      `new UiSelector().textContains("${value}")`,
    );
  }

  // BY CLASS NAME
  if (
    [
      'uia', 'xcuielementtype', 'cyi', 'android.widget', 'android.view',
    ].some(it => selector.toLocaleUpperCase().startsWith(it))
  ) {
    by = new By('class name', selector);
  }

  // BY ACCESSIBILITY ID
  const matchedWordWithDashesUnderscoresOrNumbers = selector.match(
    /^[a-zA-Z_\d-]+$/,
  );
  if (matchedWordWithDashesUnderscoresOrNumbers) {
    by = new By('accessibility id', selector);
  } else {
    throw new Error(`invalid selector: ${selector}`);
  }

  return by;
}

beforeAll(async () => {
  wdioBrowser = await wdio.remote(config);

  const { hostname, port, path } = config;
  const client = new HttpClient(`http://${hostname}:${port}${path}`);
  const executor = new Executor(client);
  const webdriver = new WebDriver(
    new Session(wdioBrowser.sessionId, wdioBrowser.capabilities),
    executor,
  );

  browser = selenide.Browser
    .configuredWith()
    .driver(webdriver)
    // ._locationStrategy(mobileSelectorToBy)
    .timeout(2000)
    .build();
});

afterAll(async () => {
  await wdioBrowser.deleteSession();
});

function byText(value: string) {
  return new By('-android uiautomator', `new UiSelector().text("${value}")`);
}

function byId(value: string) {
  // return new By('id', value);
  return new By('accessibility id', value);
}

function byClassName(value: string) {
  return new By('class name', value);
}

// eslint-disable-next-line jest/expect-expect
test('velas wallet: onboarding | selenidejs version |', async () => {
  await browser.element(
    byId('SignUp-password'),
  ).element(byId('InputSecure-editText')).type('123456');
  /*
  await browser.element(
    'SignUp-password',
  ).element('InputSecure-editText').type('123456');
   */

  await browser.element(byText('Next')).click();
  await browser.element(byText('Create')).click();
  await browser.element(byText('Accept')).click();
  /*
  await browser.element('«Next»').click();
  await browser.element('«Create»').click();
  await browser.element('«Accept»').click();
   */
});
