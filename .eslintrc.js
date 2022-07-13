module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint",
    "jest"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:jest/recommended"
  ],
  "rules": {
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
    "@typescript-eslint/explicit-function-return-type": "off",
    "arrow-parens": ["error", "as-needed"],
    "max-len": ["error", {
        "code": 84,
        "ignorePattern": "^(import| *test\\( *it\\(| *describe\\()",
        "ignoreComments": true
    }],
    "no-underscore-dangle": "off",
    "no-nested-ternary": "off",
    "import/no-extraneous-dependencies": "off",
    "jest/expect-expect": [
      "error",
      {
        "assertFunctionNames": ["expect", "**.should"],
        "additionalTestBlockFunctions": []
      }
    ]
  }
}
