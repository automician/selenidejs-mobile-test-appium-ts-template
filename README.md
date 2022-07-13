# SelenideJs Web + Mobile tests project template

## Summary

Mobile tests example using SelenideJS on top of Webdriverio.

You can find also a web tests examples in this project, not just mobile;)

## Prerequisites

Tests in this project use the Velas Mobile Wallet app. Building an app is out of scope of this project.
To run mobile tests, check the [mobile-wallet repo](https://github.com/velas/mobile-wallet) and built your app correspondingly.

## todos

- why selenidejs does not tell that reason of failure is second not first selector?

  ```text
    Timed out after 10000ms, while waiting for:
     browser.element(By(accessibility id, SignUp-password)).element(By(accessibility id, InputSecure-editText)).type: 123456
    Reason:
     An element could not be located on the page using the given search parameters.
  ```

  above InputSecure-Input is the correct selector... but reason does not tell this
- how to fix parser problem on .eslintrc.js without ignoring it at .eslintignore
