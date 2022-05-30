import { RemoteOptions } from 'webdriverio';
import * as path from 'path';

export const config: RemoteOptions = {
  // automationProtocol: 'webdriver', // default
  hostname: '127.0.0.1',
  port: 4723,
  path: '/wd/hub',
  capabilities: {
    platformName: 'iOS',
    platformVersion: '15.2',
    deviceName: 'iPhone 11',
    app: path.resolve('./walletmobile.app'),
    automationName: 'XCUITest',
  },
  waitforTimeout: 10000,
  connectionRetryCount: 3,
  logLevel: 'silent',
};
