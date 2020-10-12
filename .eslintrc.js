module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'plugin:package-json/recommended',
  ],
  globals: {
    $nuxt: true,
  },
  plugins: ['package-json', 'vue', 'prettier'],

  rules: {
    'no-param-reassign': [
      2,
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'acc', 'e', 'ctx', 'req', 'request', 'res', 'response', '$scope'],
      },
    ],
    'no-unused-vars': 1,
    'vue/html-self-closing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'comma-dangle': [2, 'only-multiline'],
    'no-underscore-dangle': 0,
    'no-console': 0,
    'prettier/prettier': [0, 'replace'],

    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
  },
};
