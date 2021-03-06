import { RemoteOptions } from 'webdriverio';

export const config: RemoteOptions = {
  automationProtocol: 'devtools',
  capabilities: {
    browserName: 'chrome',
  },
  waitforTimeout: 10000,
  connectionRetryCount: 3,
  logLevel: 'silent',
};
