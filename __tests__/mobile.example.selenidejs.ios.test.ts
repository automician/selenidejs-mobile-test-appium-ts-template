import * as wdio from 'webdriverio';
import * as selenide from 'selenidejs';
// import { be, have, perform, by } from 'selenidejs';
import { WebDriver, Session, By } from 'selenium-webdriver';
import { HttpClient, Executor } from 'selenium-webdriver/http';
import { config } from '../wdio.appium.ios.conf';

let wdioBrowser: wdio.Browser<'async'>;
let browser: selenide.Browser;

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
  console.log(await wdioBrowser.getPageSource());
  console.log('\n=================================\n');
  await wdioBrowser.pause(10000);
  console.log(await wdioBrowser.getPageSource());

  await browser.element(
    byId('testIDpasswordInputOnSignup'),
  ).type('123456');
  // await browser.element(
  //   byId('SignUp-password'),
  // ).element(byId('InputSecure-editText')).type('123456');

  // await browser.element(byText('Password')).type('123456');
  await browser.element(byText('Next')).click();
  await browser.element(byText('Create')).click();
  await browser.element(byText('Accept')).click();
});
