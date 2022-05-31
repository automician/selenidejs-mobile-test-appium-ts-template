import { By } from 'selenium-webdriver';

export const mobile = {
  selectorToBy(value: string): By {
    // BY XPATH
    if (['/', '(', '..', './', '*/'].some(it => value.startsWith(it))) {
      return new By('xpath', value);
    }

    // BY EXACT TEXT
    const matchedByExactText = value.match(
      /(?:^«(.*?)»$)|(?:^text='(.*?)')|(?:^text="(.*?)")/s,
    );
    if (matchedByExactText) {
      const text = (
        matchedByExactText[1] || matchedByExactText[2] || matchedByExactText[3]
      );
      return new By('-android uiautomator', `new UiSelector().text("${text}")`);
    }

    // BY CONTAINED TEXT
    const matchedByTextContains = value.match(
      /^text=(.*?)$/s,
    );
    if (matchedByTextContains) {
      const text = matchedByTextContains[1];
      return new By(
        '-android uiautomator',
        `new UiSelector().textContains("${text}")`,
      );
    }

    // BY CLASS NAME
    if (
      [
        'uia', 'xcuielementtype', 'cyi', 'android.widget', 'android.view',
      ].some(it => value.toLowerCase().startsWith(it))
    ) {
      return new By('class name', value);
    }

    // BY ACCESSIBILITY ID
    const matchedWordWithDashesUnderscoresOrNumbers = value.match(
      /^[a-zA-Z_\d-]+$/,
    );
    if (matchedWordWithDashesUnderscoresOrNumbers) {
      return new By('accessibility id', value);
    }

    throw new Error(`invalid selector: ${value}`);
  },
};
