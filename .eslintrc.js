module.exports = {
  parser: "babel-eslint",
  plugins: [],
  parserOptions: {
    ecmaFeatures: {
      generators: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: "airbnb",
  rules: {
    "linebreak-style": 0,
    "import/prefer-default-export": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.base.js',
      },
    },
  },
};
