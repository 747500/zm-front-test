
module.exports = {
  //parser: 'esprima',
  //parserOptions: {
    //ecmaVersion: 8,
    // project: 'tsconfig.json',
    //sourceType: 'module',
    //allowImportExportEverywhere: true,
  //},
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['only-warn'],
  //root: true,
  env: {
    node: true,
  },
  //ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'warn',
  },
};






