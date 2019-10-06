module.exports = {
  parser: "babel-eslint",
  plugins: ["html"],
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
    "import/extensions": 0,
    "no-console": 0,
    "no-unused-vars": 1
  },
  settings: {
    "html/html-extensions": [".html", ".we"],
    'import/resolver': {
      node: {
        paths: ["src"]
      },
      webpack: {
        config: './build/webpack.app.js',
      }
    },
  },
};
