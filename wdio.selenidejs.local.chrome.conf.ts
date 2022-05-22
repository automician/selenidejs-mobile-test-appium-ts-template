import { RemoteOptions } from 'webdriverio';

export const config: RemoteOptions = {
  // automationProtocol: 'webdriver', // default
  hostname: '127.0.0.1',
  port: 4444,
  path: '/wd/hub',
  capabilities: {
    browserName: 'chrome',
  },
  waitforTimeout: 10000,
  connectionRetryCount: 3,
  logLevel: 'silent',
};
