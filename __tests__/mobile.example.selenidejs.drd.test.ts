import * as wdio from 'webdriverio';
import * as selenide from 'selenidejs';
// import { be, have, perform, by } from 'selenidejs';
import { WebDriver, Session } from 'selenium-webdriver';
import { HttpClient, Executor } from 'selenium-webdriver/http';
import { config } from '../wdio.appium.android.conf';
import { mobile } from '../common/selenidejs/mobile.extensions';

let driver: wdio.Browser<'async'>;
let browser: selenide.Browser;

// TODO: move to separate module

beforeAll(async () => {
  driver = await wdio.remote(config);

  const { hostname, port, path } = config;
  const client = new HttpClient(`http://${hostname}:${port}${path}`);
  const executor = new Executor(client);
  const webdriver = new WebDriver(
    new Session(driver.sessionId, driver.capabilities),
    executor,
  );

  browser = selenide.Browser
    .configuredWith()
    .driver(webdriver)
    ._locationStrategy(mobile.selectorToBy)
    .timeout(2000)
    .build();
});

afterAll(async () => {
  await driver.deleteSession();
});

// eslint-disable-next-line jest/expect-expect
test('velas wallet: onboarding | selenidejs version |', async () => {
  await browser.element(
    'SignUp-password',
  ).element('InputSecure-editText').type('123456');

  await browser.element('«Next»').click();
  await browser.element('«Create»').click();
  await browser.element('«Accept»').click();

  await driver.pause(10000);
});
