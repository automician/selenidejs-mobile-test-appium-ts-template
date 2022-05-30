import { RemoteOptions } from 'webdriverio';
import * as path from 'path';

export const config: RemoteOptions = {
  // automationProtocol: 'webdriver', // default
  hostname: '127.0.0.1',
  port: 4723,
  path: '/wd/hub',
  capabilities: {
    platformName: 'Android',
    app: path.resolve('./app-release.apk'),
    automationName: 'UiAutomator2',
  },
  waitforTimeout: 10000,
  connectionRetryCount: 3,
  logLevel: 'silent',
};
