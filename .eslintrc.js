module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  extends: 'airbnb',
  env: {
    browser: true,
    mocha: true,
    node: true,
  },
  rules: {
    'arrow-parens': ['off'],
    'comma-dangle': 'off',
    'global-require': 'off',
    'import/order': 'off',
    'no-console': 0,
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'import/no-dynamic-require': 'off',
    'quotes': ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true}],
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
  },
  plugins: [
    'import',
    'promise',
    'react',
  ],
  globals: {
    chrome: true,
    NETWORK: true,
    CONFIG: true,
  }
};
