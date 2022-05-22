import { RemoteOptions } from 'webdriverio';

export const config: RemoteOptions = {
  automationProtocol: 'devtools',
  capabilities: {
    browserName: 'chrome',
  },
  waitforTimeout: 15000,
  logLevel: 'silent',
};
