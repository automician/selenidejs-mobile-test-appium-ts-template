import * as wdio from 'webdriverio';
import * as selenide from 'selenidejs';
import { have, perform } from 'selenidejs';
import { WebDriver, Session } from 'selenium-webdriver';
import { HttpClient, Executor } from 'selenium-webdriver/http';
import { config } from '../wdio.selenidejs.local.chrome.conf';

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

test('todomvc: add todo | wdio + selenidejs version |', async () => {
  await browser.open('https://todomvc.com/examples/emberjs/');

  await browser.element('#new-todo').type('a').then(perform.pressEnter);
  await browser.element('#new-todo').type('b').then(perform.pressEnter);
  await browser.element('#new-todo').type('c').then(perform.pressEnter);

  await browser.all('#todo-list>li').should(have.size(3));
});
